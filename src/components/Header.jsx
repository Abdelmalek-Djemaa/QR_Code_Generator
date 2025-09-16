import React from 'react';
import { FaQrcode } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full z-10 bg-black/10 backdrop-blur-xl border-b border-white/10 flex-shrink-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3 md:space-x-4 h-16">
          <FaQrcode className="text-xl md:text-2xl text-white/80" />
          <h1 className="text-lg md:text-xl font-semibold text-white/90 tracking-wider">
            QR Code Studio
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;