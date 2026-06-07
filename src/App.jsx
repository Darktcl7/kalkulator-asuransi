import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PensiunCalculatorV2 from './components/PensiunCalculatorV2';
import PendidikanCalculatorV2 from './components/PendidikanCalculatorV2';
import ContactPromo from './components/ContactPromo';

function App() {
  const getTabFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'pensiun', 'pendidikan'].includes(hash) ? hash : 'home';
  };

  const [currentTab, setCurrentTabState] = useState(getTabFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentTabState(getTabFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setCurrentTab = (tab) => {
    window.location.hash = tab;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      
      <Navbar setCurrentTab={setCurrentTab} />

      <main className="flex-grow">
        {currentTab === 'home' && (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="bg-gray-50 py-20 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                  Rencanakan Masa Depan Anda Bersama <span className="text-pru-maroon">PRUMapan</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Gunakan alat perhitungan gratis kami untuk mengetahui seberapa siap Anda menghadapi masa pensiun dan biaya pendidikan anak.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => setCurrentTab('pensiun')}
                    className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-gray-800 transition-all hover:-translate-y-1"
                  >
                    Kalkulator Pensiun
                  </button>
                  <button 
                    onClick={() => setCurrentTab('pendidikan')}
                    className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold shadow-sm hover:border-gray-900 transition-all hover:-translate-y-1"
                  >
                    Kalkulator Pendidikan
                  </button>
                </div>
              </div>
            </section>
            
            <ContactPromo />
          </div>
        )}

        {currentTab === 'pensiun' && (
          <div className="animate-in fade-in duration-500">
            <PensiunCalculatorV2 />
            <ContactPromo />
          </div>
        )}

        {currentTab === 'pendidikan' && (
          <div className="animate-in fade-in duration-500">
            <PendidikanCalculatorV2 />
            <ContactPromo />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 PRUMapan - Amalia PRU. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Perhitungan di website ini bersifat simulasi dan estimasi. Hubungi agen untuk proposal resmi.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
