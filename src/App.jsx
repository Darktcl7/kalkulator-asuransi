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
                  Financial Protection <span className="text-pru-maroon">with Heart</span>
                </h1>
                <div className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed space-y-4">
                  <p className="font-bold text-gray-900">Halo, saya Amalia.</p>
                  <p className="font-medium">Setiap <span className="text-pru-maroon font-black">impian</span> membutuhkan persiapan.</p>
                  <p>Saya membantu Anda membangun perlindungan dan rencana finansial yang sesuai dengan kebutuhan — mulai dari <span className="font-bold text-gray-800">proteksi jiwa</span>, <span className="font-bold text-gray-800">dana pendidikan</span>, hingga <span className="font-bold text-gray-800">persiapan masa depan</span>.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <button 
                    onClick={() => setCurrentTab('pensiun')}
                    className="bg-pru-maroon text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-pru-maroon-dark transition-all hover:-translate-y-1"
                  >
                    Kalkulator Dana Pensiun
                  </button>
                  <button 
                    onClick={() => setCurrentTab('pendidikan')}
                    className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold shadow-sm hover:border-gray-900 transition-all hover:-translate-y-1"
                  >
                    Kalkulator Dana Pendidikan
                  </button>
                </div>
                <div className="mt-6 max-w-lg mx-auto bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-gray-200/60 rounded-2xl p-4 shadow-sm animate-in slide-in-from-bottom-4 duration-700">
                  <p className="text-gray-700 italic text-sm md:text-base font-semibold flex items-center justify-center gap-2">
                    <span className="text-pru-maroon">✨</span>
                    "Mari wujudkan rencana hari ini untuk kehidupan yang lebih tenang esok hari."
                  </p>
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
