import React, { useState } from 'react';

const Navbar = ({ setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (tab) => {
    setCurrentTab(tab);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <span className="text-2xl font-black text-pru-maroon tracking-tight">PRU</span>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">Mapan</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => handleNav('home')}
              className="text-sm font-medium text-gray-600 hover:text-pru-maroon transition-colors"
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNav('pensiun')}
              className="text-sm font-medium text-gray-600 hover:text-pru-maroon transition-colors"
            >
              Dana Pensiun
            </button>
            <button 
              onClick={() => handleNav('pendidikan')}
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <a 
              href="https://wa.me/6282230655518" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pru-maroon text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md"
            >
              Hubungi
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <button 
              onClick={() => handleNav('home')}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50 hover:text-pru-maroon"
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNav('pensiun')}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50 hover:text-pru-maroon"
            >
              Kalkulator Pensiun
            </button>
            <button 
              onClick={() => handleNav('pendidikan')}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50 hover:text-pru-maroon"
            >
              Kalkulator Pendidikan
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
