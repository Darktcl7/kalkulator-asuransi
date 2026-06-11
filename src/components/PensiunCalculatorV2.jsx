import React, { useState, useEffect, useMemo } from 'react';
import { pensiunScenarios } from '../data/copywriting';

const PensiunCalculatorV2 = () => {
  const [monthlyCost, setMonthlyCost] = useState('');
  const [currentAge, setCurrentAge] = useState('');
  const [isAgent, setIsAgent] = useState('no');
  const [results, setResults] = useState(null);
  
  // Lead Gate States
  const [isRevealed, setIsRevealed] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', wa: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // Random Scenario per component mount
  const scenario = useMemo(() => {
    return pensiunScenarios[Math.floor(Math.random() * pensiunScenarios.length)];
  }, []);

  const INFLATION_RATE = 0.05;
  const LIFE_EXPECTANCY = 75;
  const RETIREMENT_AGE = 55;

  const formatRp = (num) => {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
  };

  const handleCostChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue === '') {
      setMonthlyCost('');
      return;
    }
    setMonthlyCost(Number(rawValue).toLocaleString('en-US'));
  };

  useEffect(() => {
    const rawCost = parseFloat(monthlyCost.replace(/,/g, ''));
    const age = parseInt(currentAge);

    if (rawCost > 0 && age > 0 && age < RETIREMENT_AGE) {
      const yearsUntilRetirement = RETIREMENT_AGE - age;
      const monthlyCostAtRetirement = rawCost * Math.pow(1 + INFLATION_RATE, yearsUntilRetirement);
      const annualCostAtRetirement = monthlyCostAtRetirement * 12;
      const totalNeeded = annualCostAtRetirement * (LIFE_EXPECTANCY - RETIREMENT_AGE);

      setResults({
        yearsUntilRetirement,
        monthlyCostAtRetirement,
        annualCostAtRetirement,
        totalNeeded
      });
      setIsRevealed(false);
      setConsent(false);
    } else {
      setResults(null);
      setIsRevealed(false);
    }
  }, [monthlyCost, currentAge]);

  const handleReveal = () => {
    if (!consent) {
      setErrorMsg('Mohon centang persetujuan terlebih dahulu.');
      return;
    }
    if (!formData.name || !formData.email || !formData.wa) {
      setErrorMsg('Mohon lengkapi Nama, Email, dan Nomor WhatsApp Anda.');
      return;
    }
    setErrorMsg('');
    
    const message = `Halo Amalia, perkenalkan saya ${formData.name} (${formData.email}). Saya baru saja menggunakan Kalkulator Dana Pensiun di website Anda. Menurut perhitungan, saya membutuhkan total dana sebesar ${formatRp(results.totalNeeded)}. Saya ingin berdiskusi lebih lanjut mengenai persiapan ini.`;
    const waUrl = `https://wa.me/6282230655518?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
    setIsRevealed(true);
  };

  const renderCopywriting = () => {
    if (!results) return null;
    const { yearsUntilRetirement } = results;
    
    return (
      <div className="bg-black text-white p-6 md:p-8 rounded-2xl mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pru-maroon rounded-full mix-blend-screen filter blur-3xl opacity-50 translate-x-10 -translate-y-10"></div>
        <p className="text-xl md:text-2xl font-black mb-4 relative z-10 leading-tight">{scenario.title.replace('{years}', yearsUntilRetirement)}</p>
        
        <div className="space-y-3 relative z-10">
          {scenario.body.map((text, idx) => (
            <p key={idx} className="text-sm md:text-base text-gray-300 leading-relaxed">
              {text.replace('{years}', yearsUntilRetirement)}
            </p>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800 relative z-10">
          <p className="text-base text-white font-bold italic leading-relaxed">
            "{scenario.closing.replace('{years}', yearsUntilRetirement)}"
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Centered Minimalist Header */}
      <div className="text-center mb-12">
        <span className="text-pru-maroon font-bold tracking-widest uppercase text-xs mb-2 block">Kalkulator</span>
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">Dana Pensiun</h1>
        <div className="w-16 h-1 bg-pru-maroon mx-auto mb-6"></div>
        <p className="text-gray-600 mb-8">Hitung angka kemerdekaan finansialmu di masa tua.</p>
      </div>

      <div className="space-y-8">
        
        {/* Input Card - Vertical Stack */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-10 border border-gray-100">
          


          <div className="space-y-8">
            <div className="group">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-pru-maroon transition-colors">
                Biaya Hidup Bulanan Saat Ini
              </label>
              <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-pru-maroon transition-colors pb-2">
                <span className="text-2xl font-bold text-gray-400 mr-3">Rp</span>
                <input
                  type="text" inputMode="numeric" value={monthlyCost} onChange={handleCostChange}
                  className="w-full text-3xl md:text-4xl font-black text-black outline-none bg-transparent placeholder-gray-200"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-pru-maroon transition-colors">
                Usia Anda Saat Ini
              </label>
              <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-pru-maroon transition-colors pb-2">
                <input
                  type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} min="1" max="54"
                  className="w-full text-3xl md:text-4xl font-black text-black outline-none bg-transparent placeholder-gray-200"
                  placeholder="0"
                />
                <span className="text-xl font-bold text-gray-400 ml-3">Tahun</span>
              </div>
              {currentAge && parseInt(currentAge) >= RETIREMENT_AGE && (
                <p className="text-pru-maroon text-xs mt-2 font-bold">Pensiun diasumsikan pada usia 55 tahun.</p>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
            
            {/* The Massive Hero Number */}
            <div className="bg-pru-maroon text-white rounded-[2rem] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                <p className="text-sm font-bold uppercase tracking-widest text-red-200 mb-4">Total Dana yang Dibutuhkan</p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4">
                  {formatRp(results.totalNeeded)}
                </h2>
                <div className="inline-block bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                  <p className="text-xs md:text-sm font-medium">Persiapan: {results.yearsUntilRetirement} Tahun | Ekspektasi Hidup: Usia 55-75</p>
                </div>
              </div>
            </div>

            {/* Locked vs Revealed State */}
            {isAgent === 'yes' || isRevealed ? (
              // REVEALED
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-10 border border-gray-100 animate-in fade-in duration-500">
                <h3 className="text-xl font-black text-black mb-6">Rincian Proyeksi Pensiun Anda</h3>
                
                <div className="grid gap-4 md:grid-cols-2 mb-8">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Est. Biaya / Bulan (Usia 55)</p>
                    <p className="text-2xl font-black text-pru-maroon">{formatRp(results.monthlyCostAtRetirement)}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Est. Biaya / Tahun (Usia 55)</p>
                    <p className="text-2xl font-black text-black">{formatRp(results.annualCostAtRetirement)}</p>
                  </div>
                </div>

                {isRevealed && isAgent === 'no' && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl mb-6">
                    <p className="text-lg font-black text-green-800 mb-1">Jendela WhatsApp Terbuka!</p>
                    <p className="text-sm text-green-700">Amalia PRU siap membantu Anda menyusun strategi untuk mencapai angka di atas. Silakan lanjutkan obrolan di WhatsApp Anda.</p>
                  </div>
                )}
                <p className="text-xs text-gray-400 text-center mt-4">
                  *Asumsi inflasi tahunan rata-rata 5%. Angka ini adalah proyeksi matematis.
                </p>
              </div>
            ) : (
              // LOCKED (LEAD GATE)
              <div className="space-y-8 animate-in fade-in duration-500">

                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-10 border border-gray-100">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-black mb-2">Buka Rincian Detail</h3>
                    <p className="text-gray-500 text-sm">Amankan masa depan Anda hari ini. Lengkapi data di bawah untuk melihat rincian biaya tahunan dan bulanan Anda.</p>
                  </div>

                  <label className="flex items-start gap-4 cursor-pointer mb-8 p-5 bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all">
                    <div className="relative flex items-center justify-center mt-1">
                      <input 
                        type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                        className="peer appearance-none w-6 h-6 border-2 border-gray-400 rounded-md checked:bg-pru-maroon checked:border-pru-maroon transition-all cursor-pointer" 
                      />
                      <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed font-medium">
                      Saya setuju terhubung dengan Amalia PRU via WhatsApp untuk mendapatkan konsultasi gratis demi mengamankan dana pensiun saya.
                    </span>
                  </label>

                  <div className={`space-y-4 transition-all duration-500 ${consent ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </span>
                        <input 
                          type="text" placeholder="Nama Lengkap" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:bg-white focus:border-black focus:ring-0 outline-none text-sm font-bold text-black transition-all"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </span>
                        <input 
                          type="email" placeholder="Alamat Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:bg-white focus:border-black focus:ring-0 outline-none text-sm font-bold text-black transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"></path></svg>
                      </span>
                      <input 
                        type="tel" placeholder="Nomor WhatsApp" value={formData.wa} onChange={(e) => setFormData({...formData, wa: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:bg-white focus:border-black focus:ring-0 outline-none text-sm font-bold text-black transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleReveal}
                      className="w-full bg-black text-white py-4 rounded-xl text-base font-black shadow-xl hover:bg-pru-maroon hover:-translate-y-1 transition-all mt-4 flex items-center justify-center gap-2"
                    >
                      Konsultasi dan Lihat Detail
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                    {errorMsg && <p className="text-pru-maroon text-sm mt-3 text-center font-bold animate-pulse">{errorMsg}</p>}
                  </div>
                </div>

                {renderCopywriting()}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 max-w-2xl mx-auto bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-700 shadow-2xl text-left">
        <div className="text-center mb-6">
          <span className="inline-block py-1 px-3 rounded-full bg-pru-maroon/20 text-red-400 text-xs font-bold tracking-widest uppercase mb-3 border border-pru-maroon/30">Program Unggulan</span>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Asuransi <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Tabungan Dana Pensiun</span>
          </h3>
        </div>
        <ul className="space-y-4">
          {[
            "Premi terjangkau mulai 200 ribu",
            "Usia masuk 19-45 tahun",
            "Dana cair berkala di usia 55-75 tahun",
            "Return tinggi hingga 5,8x dari premi",
            "Tambahan Manfaat Meninggal Dunia",
            "Pilihan pembayaran berkala / lumpsum"
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span className="text-gray-300 text-sm md:text-base leading-snug">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PensiunCalculatorV2;
