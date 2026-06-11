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
            <section className="bg-gray-900 lg:bg-white overflow-hidden border-b border-gray-100 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] relative">
                  {/* Left Column: Content */}
                  <div className="flex flex-col justify-center pt-10 pb-16 lg:py-24 lg:pr-12 animate-in slide-in-from-left duration-700 relative z-20">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white lg:text-gray-900 mb-8 tracking-tight leading-[1.1] text-center lg:text-left drop-shadow-md lg:drop-shadow-none">
                      Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 lg:from-pru-maroon to-red-500 lg:to-red-600">Protection</span><br/>
                      with Heart.
                    </h1>
                    
                    <div className="text-lg md:text-xl text-gray-200 lg:text-gray-600 mb-10 max-w-lg leading-relaxed space-y-4 border-l-4 border-red-500 lg:border-pru-maroon pl-6 drop-shadow-md lg:drop-shadow-none mx-4 lg:mx-0">
                      <p className="font-bold text-white lg:text-gray-900 text-2xl">Halo, saya Amalia.</p>
                      <p className="font-medium">Setiap <span className="text-red-400 lg:text-pru-maroon font-black">impian</span> membutuhkan persiapan.</p>
                      <p>Saya membantu Anda membangun perlindungan finansial yang solid — dari <span className="font-bold text-white lg:text-gray-800">proteksi jiwa</span>, <span className="font-bold text-white lg:text-gray-800">dana pendidikan</span>, hingga <span className="font-bold text-white lg:text-gray-800">pensiun</span>.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10 px-4 lg:px-0">
                      <button 
                        onClick={() => setCurrentTab('pensiun')}
                        className="bg-pru-maroon text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-black/50 lg:shadow-red-900/20 hover:bg-pru-maroon-dark transition-all hover:-translate-y-1 text-center border border-red-500/30 lg:border-none"
                      >
                        Kalkulator Dana Pensiun
                      </button>
                      <button 
                        onClick={() => setCurrentTab('pendidikan')}
                        className="bg-white/10 lg:bg-white text-white lg:text-gray-900 border-2 border-white/30 lg:border-gray-200 px-8 py-4 rounded-full font-bold shadow-sm hover:bg-white/20 lg:hover:border-gray-900 transition-all hover:-translate-y-1 text-center backdrop-blur-sm lg:backdrop-blur-none"
                      >
                        Kalkulator Dana Pendidikan
                      </button>
                    </div>
                    
                    <div className="bg-black/40 lg:bg-gray-50 border border-white/20 lg:border-gray-200/60 rounded-2xl p-5 shadow-xl lg:shadow-sm inline-block backdrop-blur-md lg:backdrop-blur-none mx-4 lg:mx-0">
                      <p className="text-gray-200 lg:text-gray-700 italic text-sm md:text-base font-semibold flex items-center gap-3">
                        <span className="text-red-400 lg:text-pru-maroon text-xl drop-shadow-md">✨</span>
                        "Mari wujudkan rencana hari ini untuk<br className="hidden sm:block"/> kehidupan yang lebih tenang esok hari."
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Abstract & Images */}
                  <div className="absolute inset-[-50px] lg:inset-auto lg:relative min-h-[100vh] lg:min-h-0 overflow-hidden lg:overflow-visible z-0 pointer-events-none lg:pointer-events-auto">
                    {/* Dark Overlay for Mobile so it's not too bright */}
                    <div className="absolute inset-0 bg-gray-900/80 lg:hidden z-20 backdrop-blur-[2px]"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-gray-100/50 hidden lg:block"></div>
                    
                    {/* Abstract Shapes */}
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pru-maroon/20 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gray-300/40 to-transparent blur-3xl"></div>
                    
                    {/* Photo 1: Family / Pension */}
                    <div className="absolute top-[5%] left-[2%] lg:top-[15%] lg:left-[10%] w-48 h-64 lg:w-64 h-80 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20 lg:border-white transform -rotate-6 animate-in fade-in zoom-in duration-1000 delay-300 z-10 lg:z-0">
                      <img src="/pensiun.png" alt="Masa Depan Tenang" className="w-full h-full object-cover" />
                    </div>

                    {/* Photo 2: Education */}
                    <div className="absolute bottom-[20%] right-[2%] lg:top-[35%] lg:right-[5%] w-56 h-72 lg:w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20 lg:border-white transform rotate-3 animate-in fade-in zoom-in duration-1000 delay-500 z-10">
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
          </div>
        )}

        {currentTab === 'pendidikan' && (
          <div className="animate-in fade-in duration-500">
            <PendidikanCalculatorV2 />
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
