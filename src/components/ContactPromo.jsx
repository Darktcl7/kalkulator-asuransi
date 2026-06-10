import React from 'react';

const ContactPromo = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Promo Section */}
          <div className="p-8 md:p-12 md:w-2/3">
            <span className="text-pru-maroon font-black uppercase tracking-wider text-sm mb-2 block">Asuransi Jiwa PRUMapan</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              Tabungan Dana Pensiun & Pendidikan Terjamin
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Asuransi Pensiun */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-inner">
                <h3 className="text-lg font-bold text-red-400 mb-4 uppercase tracking-wider text-sm">Asuransi Pensiun</h3>
                <ul className="space-y-3">
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
                      <span className="text-gray-300 text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dana Pendidikan */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-inner">
                <h3 className="text-lg font-bold text-red-400 mb-4 uppercase tracking-wider text-sm">Dana Pendidikan</h3>
                <ul className="space-y-3">
                  {[
                    "Premi terjangkau mulai 200 ribu",
                    "Dana cair berkala di tahun mulai tahun ke-4 hingga tahun ke-18",
                    "Bisa dipakai untuk perencanaan pendidikan TK, SD, SMP, SMA Kuliah",
                    "200% Santunan Asuransi Cacat Total & Tetap atau Meninggal Dunia",
                    "Tambahan 200% Santunan Asuransi Meninggal Dunia akibat Kecelakaan",
                    "Manfaat Bebas Kontribusi jika terkena resiko Meninggal dunia; Cacat Total & Tetap; Kondisi Kritis Tahap Akhir"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-0.5">✓</span>
                      <span className="text-gray-300 text-sm leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pru-maroon to-pru-maroon-dark rounded-2xl p-6 border border-red-500/30">
              <p className="text-white font-bold text-lg mb-2">🔥 PROMO BULAN INI!!</p>
              <p className="text-red-100 text-sm mb-4">
                FREE 1 bulan jika bayar premi tahunan + Cashback Premi!
              </p>
              <a 
                href="https://wa.me/6282230655518?text=Halo%20Amalia,%20saya%20tertarik%20dengan%20promo%20PRUMapan%20terbaru." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-pru-maroon px-6 py-3 rounded-full text-sm font-black shadow-lg hover:bg-gray-100 transition-colors"
              >
                Klaim Promo via WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-800 p-8 md:p-12 md:w-1/3 flex flex-col justify-center items-center text-center border-t md:border-t-0 md:border-l border-gray-700">
            <div className="w-32 h-32 rounded-full mb-6 overflow-hidden bg-gray-800 flex items-center justify-center">
              <img src="/foto.png" alt="Amalia PRU" className="w-full h-full object-cover scale-[1.02]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-1">Amalia PRU</h3>
            <p className="text-gray-400 text-sm mb-6">Financial Advisor Prudential</p>
            
            <a 
              href="https://wa.me/6282230655518" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"></path></svg>
              0822 3065 5518
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPromo;
