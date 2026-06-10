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
            <section className="bg-white overflow-hidden border-b border-gray-100 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] relative">
                  {/* Left Column: Content */}
                  <div className="flex flex-col justify-center pt-6 pb-16 lg:py-24 lg:pr-12 animate-in slide-in-from-left duration-700">
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1] text-center lg:text-left">
                      Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-pru-maroon to-red-600">Protection</span><br/>
                      with Heart.
                    </h1>
                    
                    <div className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed space-y-4 border-l-4 border-pru-maroon pl-6">
                      <p className="font-bold text-gray-900 text-2xl">Halo, saya Amalia.</p>
                      <p className="font-medium">Setiap <span className="text-pru-maroon font-black">impian</span> membutuhkan persiapan.</p>
                      <p>Saya membantu Anda membangun perlindungan finansial yang solid — dari <span className="font-bold text-gray-800">proteksi jiwa</span>, <span className="font-bold text-gray-800">dana pendidikan</span>, hingga <span className="font-bold text-gray-800">pensiun</span>.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                      <button 
                        onClick={() => setCurrentTab('pensiun')}
                        className="bg-pru-maroon text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-red-900/20 hover:bg-pru-maroon-dark transition-all hover:-translate-y-1 text-center"
                      >
                        Kalkulator Dana Pensiun
                      </button>
                      <button 
                        onClick={() => setCurrentTab('pendidikan')}
                        className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold shadow-sm hover:border-gray-900 transition-all hover:-translate-y-1 text-center"
                      >
                        Kalkulator Dana Pendidikan
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 shadow-sm inline-block">
                      <p className="text-gray-700 italic text-sm md:text-base font-semibold flex items-center gap-3">
                        <span className="text-pru-maroon text-xl">✨</span>
                        "Mari wujudkan rencana hari ini untuk<br className="hidden sm:block"/> kehidupan yang lebih tenang esok hari."
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Abstract & Images */}
                  <div className="hidden lg:block relative min-h-0 bg-gray-50/50 overflow-visible z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-gray-100/50"></div>
                    
                    {/* Abstract Shapes */}
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pru-maroon/20 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gray-300/40 to-transparent blur-3xl"></div>
                    
                    {/* Photo 1: Family / Pension */}
                    <div className="absolute top-[15%] left-[10%] w-64 h-80 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform -rotate-6 animate-in fade-in zoom-in duration-1000 delay-300 z-0">
                      <img src="/pensiun.png" alt="Masa Depan Tenang" className="w-full h-full object-cover" />
                    </div>

                    {/* Photo 2: Education */}
                    <div className="absolute top-[35%] right-[5%] w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-3 animate-in fade-in zoom-in duration-1000 delay-500 z-10">
                      <img src="/pendidikan.png" alt="Pendidikan Anak" className="w-full h-full object-cover" />
                    </div>
                  </div>
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
