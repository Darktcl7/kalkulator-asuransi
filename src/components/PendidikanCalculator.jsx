import React, { useState, useEffect, useMemo } from 'react';
import { pendidikanScenarios } from '../data/copywriting';

const PendidikanCalculator = () => {
  const [kuliahCost, setKuliahCost] = useState('');
  const [childAge, setChildAge] = useState('');
  const [isAgent, setIsAgent] = useState('no');
  const [results, setResults] = useState(null);

  // Lead Gate States
  const [isRevealed, setIsRevealed] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', wa: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // Random Scenario
  const scenario = useMemo(() => {
    return pendidikanScenarios[Math.floor(Math.random() * pendidikanScenarios.length)];
  }, []);

  const EDU_INFLATION = 0.10;
  const KULIAH_START_AGE = 18;

  const formatRp = (num) => {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
  };

  const handleCostChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue === '') {
      setKuliahCost('');
      return;
    }
    setKuliahCost(Number(rawValue).toLocaleString('en-US'));
  };

  useEffect(() => {
    const rawCost = parseFloat(kuliahCost.replace(/,/g, ''));
    const age = parseInt(childAge);

    if (rawCost > 0 && !isNaN(age) && age >= 0 && age < KULIAH_START_AGE) {
      const yearsUntilStart = KULIAH_START_AGE - age;
      const totalFuture = rawCost * Math.pow(1 + EDU_INFLATION, yearsUntilStart);

      setResults({
        yearsUntilStart,
        totalToday: rawCost,
        totalFuture
      });
      // Reset reveal state if user changes inputs
      setIsRevealed(false);
      setConsent(false);
    } else {
      setResults(null);
      setIsRevealed(false);
    }
  }, [kuliahCost, childAge]);

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
    
    // Construct WhatsApp message
    const message = `Halo Amalia, perkenalkan saya ${formData.name} (${formData.email}). Saya baru saja menggunakan Kalkulator Dana Pendidikan di website Anda. Menurut perhitungan, saya membutuhkan estimasi dana kuliah anak sebesar ${formatRp(results.totalFuture)}. Saya ingin berdiskusi lebih lanjut mengenai persiapan ini.`;
    const waUrl = `https://wa.me/6282230655518?text=${encodeURIComponent(message)}`;
    
    // Open WA in new tab and reveal results
    window.open(waUrl, '_blank');
    setIsRevealed(true);
  };

  const renderCopywriting = () => {
    if (!results) return null;
    const { yearsUntilStart } = results;
    
    return (
      <div className="mb-6 animate-in fade-in duration-500">
        <p className="text-base font-bold text-gray-900 mb-3">{scenario.title.replace('{years}', yearsUntilStart)}</p>
        
        <div className="border-l-4 border-pru-maroon pl-4 mb-5">
          {scenario.body.map((text, idx) => (
            <p key={idx} className="text-sm text-gray-800 leading-relaxed mb-3">
              {text.replace('{years}', yearsUntilStart)}
            </p>
          ))}
        </div>
        
        <p className="text-sm text-gray-900 font-bold leading-relaxed mb-2">
          {scenario.closing.replace('{years}', yearsUntilStart)}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Kalkulator Dana Pendidikan</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Hitung estimasi dana yang dibutuhkan untuk membiayai kuliah anak Anda di masa depan tanpa hambatan inflasi.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2">
          
          <div className="p-8 md:p-10 bg-gray-50 border-r border-gray-100">
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Apakah Anda agen asuransi?</label>
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input 
                      type="radio" name="edu-is-agent" value="no" 
                      className="peer hidden" checked={isAgent === 'no'} 
                      onChange={() => setIsAgent('no')} 
                    />
                    <div className="text-center py-3 rounded-xl border-2 border-gray-200 text-sm font-bold transition-all peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white text-gray-600 hover:border-gray-300">
                      Bukan
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input 
                      type="radio" name="edu-is-agent" value="yes" 
                      className="peer hidden" checked={isAgent === 'yes'} 
                      onChange={() => setIsAgent('yes')} 
                    />
                    <div className="text-center py-3 rounded-xl border-2 border-gray-200 text-sm font-bold transition-all peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white text-gray-600 hover:border-gray-300">
                      Ya, Saya Agen
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Estimasi Biaya Kuliah Hari Ini (Total 4 Tahun)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={kuliahCost}
                    onChange={handleCostChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-pru-maroon focus:ring-0 outline-none transition-colors font-medium text-lg"
                    placeholder="Contoh: 250,000,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Usia Anak Sekarang
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    min="0"
                    max="17"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-pru-maroon focus:ring-0 outline-none transition-colors font-medium text-lg"
                    placeholder="Contoh: 5"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">Tahun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-start bg-white">
            {!results ? (
              <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full opacity-50">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                <p className="font-medium">Hasil simulasi akan muncul di sini</p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500 w-full">
                
                {/* Hero Number (Always visible) */}
                <div className="bg-amber-50 rounded-2xl p-6 mb-6 text-center border border-amber-100 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Dana Kuliah yang Anda Butuhkan</p>
                  <h2 className="text-3xl md:text-4xl font-black text-amber-600 tracking-tight">
                    {formatRp(results.totalFuture)}
                  </h2>
                  <p className="text-xs text-gray-400 mt-2 font-medium">untuk membiayai anak masuk kuliah {results.yearsUntilStart} tahun lagi</p>
                </div>

                {isAgent === 'yes' || isRevealed ? (
                  // Full Breakdown (Revealed)
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-0 text-sm mb-6 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <div className="flex justify-between py-3 px-4 bg-gray-50 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Biaya kuliah 4 tahun hari ini</span>
                        <span className="font-bold text-gray-900">{formatRp(results.totalToday)}</span>
                      </div>
                      <div className="flex justify-between py-3 px-4 bg-white border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Biaya saat masuk usia 18 tahun</span>
                        <span className="font-bold text-amber-600">{formatRp(results.totalFuture)}</span>
                      </div>
                      <div className="flex justify-between py-3 px-4 bg-gray-50">
                        <span className="text-gray-600 font-medium">Waktu persiapan yang tersisa</span>
                        <span className="font-bold text-gray-900">{results.yearsUntilStart} tahun</span>
                      </div>
                    </div>

                    {isRevealed && isAgent === 'no' && (
                      <div className="text-center py-6 bg-green-50 rounded-xl border border-green-100 mb-6">
                        <p className="text-base font-bold text-green-800 mb-2">Terima kasih!</p>
                        <p className="text-sm text-green-700 leading-relaxed px-4">
                          Amalia PRU akan segera menghubungi kamu via WhatsApp dalam waktu 1x24 jam untuk membantu merencanakan dana pendidikan anakmu.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 text-center">
                        *Simulasi berdasarkan asumsi inflasi pendidikan rata-rata 10% per tahun. Hasil aktual dapat berbeda sesuai universitas pilihan.
                      </p>
                    </div>
                  </div>
                ) : (
                  // Lead Gate (Locked)
                  <div id="lead-gate" className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                    {renderCopywriting()}

                    <label className="flex items-start gap-3 cursor-pointer mb-5 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-5 h-5 accent-gray-900 flex-shrink-0 cursor-pointer" 
                      />
                      <span className="text-sm text-gray-700 leading-relaxed font-medium">
                        Saya setuju Amalia menghubungi saya via WhatsApp untuk <strong>mengunci dana pendidikan anak saya</strong> — sebelum jendela waktunya menyempit lebih jauh.
                      </span>
                    </label>

                    <div className={`space-y-3 transition-opacity duration-300 ${consent ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                      <input 
                        type="text" placeholder="Nama Anda"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none text-sm font-medium"
                      />
                      <input 
                        type="email" placeholder="Email Anda"
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none text-sm font-medium"
                      />
                      <input 
                        type="tel" placeholder="Nomor WhatsApp Aktif"
                        value={formData.wa} onChange={(e) => setFormData({...formData, wa: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none text-sm font-medium"
                      />
                      <button 
                        onClick={handleReveal}
                        className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-black transition-colors mt-2"
                      >
                        Jadwalkan Konsultasi & Buka Detail
                      </button>
                    </div>
                    {errorMsg && <p className="text-pru-maroon text-xs mt-3 text-center font-bold">{errorMsg}</p>}
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PendidikanCalculator;
