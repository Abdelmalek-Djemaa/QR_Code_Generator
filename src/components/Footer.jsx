import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full z-10 bg-black/10 backdrop-blur-xl border-t border-white/10 flex-shrink-0">
      <div className="container mx-auto px-4 text-center h-14 flex items-center justify-center">
        <a
          href="https://abdelmalek-djemaa.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
        >
          Designed & Built by Abdelmalek djemaa
        </a>
      </div>
    </footer>
  );
};

export default Footer;