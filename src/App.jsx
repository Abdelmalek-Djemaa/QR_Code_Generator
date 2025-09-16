import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeGenerator from './components/QRCodeGenerator';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className="fixed flex flex-col justify-between h-full w-full overflow-auto">
        <Header />
        <QRCodeGenerator />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;