import React from 'react';

const ContactPromo = () => {
  return (
    <div className="bg-white py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-[2rem] p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-gray-800">
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pru-maroon overflow-hidden shadow-xl bg-gray-800 flex-shrink-0">
              <img src="/foto.png" alt="Amalia PRU" className="w-full h-full object-cover scale-[1.02]" />
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Amalia PRU</h3>
              <p className="text-gray-400 text-base md:text-lg">Financial Advisor Prudential</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <a 
              href="https://wa.me/6282230655518" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-green-500 text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:bg-green-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"></path></svg>
              0822 3065 5518
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPromo;
