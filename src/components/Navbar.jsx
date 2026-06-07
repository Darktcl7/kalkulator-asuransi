import React from 'react';

const Navbar = ({ setCurrentTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentTab('home')}>
            <span className="text-2xl font-black text-pru-maroon tracking-tight">PRU</span>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">Mapan</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => setCurrentTab('home')}
              className="text-sm font-medium text-gray-600 hover:text-pru-maroon transition-colors"
            >
              Beranda
            </button>
            <button 
              onClick={() => setCurrentTab('pensiun')}
              className="text-sm font-medium text-gray-600 hover:text-pru-maroon transition-colors"
            >
              Dana Pensiun
            </button>
            <button 
              onClick={() => setCurrentTab('pendidikan')}
              className="text-sm font-medium text-gray-600 hover:text-pru-maroon transition-colors"
            >
              Dana Pendidikan
            </button>
            <a 
              href="https://wa.me/6282230655518" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pru-maroon text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:bg-pru-maroon-dark hover:shadow-lg transition-all"
            >
              Hubungi Agen
            </a>
          </div>
          
          {/* Mobile Menu Button (simplified for now) */}
          <div className="md:hidden flex items-center">
             <a 
              href="https://wa.me/6282230655518" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pru-maroon text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md"
            >
              Hubungi
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
