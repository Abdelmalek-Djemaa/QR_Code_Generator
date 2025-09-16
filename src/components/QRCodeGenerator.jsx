import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { QRCode } from 'react-qrcode-logo';
import { toPng } from 'html-to-image';
import { ChromePicker } from 'react-color';

// Expanded React Icons Imports
import { 
  FaLink, FaImage, FaDownload, FaPalette, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaWifi, FaTimes, 
  FaMapMarkerAlt, FaWhatsapp, FaGithub, FaBriefcase 
} from 'react-icons/fa';

const QRCodeGenerator = () => {
  // State for icon styling
  const [iconColor, setIconColor] = useState('#000000');
  const [iconBgColor, setIconBgColor] = useState('#ffffff');
  const [displayIconColorPicker, setDisplayIconColorPicker] = useState(false);
  const [displayIconBgColorPicker, setDisplayIconBgColorPicker] = useState(false);

  // General state
  const [qrValue, setQrValue] = useState('https://github.com');
  const [logoImage, setLogoImage] = useState('');
  const [bgType, setBgType] = useState('color');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const qrCodeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('icon');
  const [selectedIconComponent, setSelectedIconComponent] = useState(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (selectedIconComponent && iconRef.current) {
      toPng(iconRef.current, { canvasWidth: 256, canvasHeight: 256, pixelRatio: 4 })
        .then((dataUrl) => {
          setLogoImage(dataUrl);
          setIsModalOpen(false);
          setSelectedIconComponent(null);
        })
        .catch((err) => {
          console.error('Failed to convert icon to image', err);
          setSelectedIconComponent(null);
        });
    }
  }, [selectedIconComponent]);

  const handleFileUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImage(reader.result); };
      reader.readAsDataURL(file);
      setIsModalOpen(false);
    }
  };
  
  const removeCenterImage = () => {
    setLogoImage('');
    setIsModalOpen(false);
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      toPng(qrCodeRef.current, { cacheBust: true, pixelRatio: 3 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'qr-code.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error('Failed to generate image', err));
    }
  };

  const popover = { position: 'absolute', zIndex: '2', top: '0px', right: '0px' };
  const cover = { position: 'fixed', top: '0', right: '0', bottom: '0', left: '0' };

  const iconLibrary = [
    { name: 'User', component: <FaUser /> }, { name: 'Link', component: <FaLink /> },
    { name: 'Email', component: <FaEnvelope /> }, { name: 'Phone', component: <FaPhone /> },
    { name: 'Location', component: <FaMapMarkerAlt /> }, { name: 'WhatsApp', component: <FaWhatsapp /> },
    { name: 'GitHub', component: <FaGithub /> }, { name: 'Work', component: <FaBriefcase /> },
  ];

  return (
    <>
      <Helmet>
        <title>Modern QR Code Generator - Free & Customizable with Logo</title>
        <meta name="description" content="Create beautiful, custom QR codes for free. Add a high-visibility icon or logo, choose colors, use background images, and download high-quality PNGs." />
        <meta name="keywords" content="qr code generator, free qr code, custom qr code, qr code with logo, qr code maker, qr code creator, online qr code tool, react qr code" />
      </Helmet>

      {/* Hidden div for generating icon with circular plaque */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        {selectedIconComponent && (
          <div 
            ref={iconRef} 
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '256px', height: '256px', borderRadius: '50%',
              backgroundColor: iconBgColor,
            }}
          >
            <div style={{ fontSize: '160px', color: iconColor }}>
              {selectedIconComponent}
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto p-4 md:p-8 flex items-center justify-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl">
          {/* Customization Panel */}
          <div className="bg-black/10 backdrop-blur-2xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white/90">QR Code Studio</h2>
            <div className="relative mb-6">
              <FaLink className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/30" />
              <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} className="w-full py-3 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 text-white/90 transition" placeholder="Enter your URL or text" />
            </div>
            <div className="mb-6 md:mb-8 p-4 bg-white/5 border border-white/10 rounded-xl">
              <label className="text-white/70 text-md font-bold mb-3 block">Style Options</label>
              <div className="flex items-center justify-around">
                <button onClick={() => setIsModalOpen(true)} className="relative flex flex-col items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition group">
                  <FaImage className="text-3xl text-white/50 group-hover:text-white/80 transition" />
                  <span className="text-xs mt-1 text-white/50">Center</span>
                  {logoImage && <FaCheckCircle className="absolute -top-1 -right-1 text-green-400 bg-gray-800 rounded-full" />}
                </button>
                <button onClick={() => setBgType(bgType === 'color' ? 'image' : 'color')} className="flex flex-col items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition group">
                  <div className="text-3xl text-white/50 group-hover:text-white/80 transition">{bgType === 'color' ? <FaPalette /> : <FaImage />}</div>
                  <span className="text-xs mt-1 text-white/50 capitalize">{bgType}</span>
                </button>
                {bgType === 'image' ? (
                  <label htmlFor="background" className="relative flex flex-col items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition group">
                    <FaImage className="text-3xl text-white/50 group-hover:text-white/80 transition" />
                    <span className="text-xs mt-1 text-white/50">BG Image</span>
                    <input id="background" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setBackgroundImage)} />
                    {backgroundImage && <FaCheckCircle className="absolute -top-1 -right-1 text-green-400 bg-gray-800 rounded-full" />}
                  </label>
                ) : (
                  <div>
                    <div onClick={() => setDisplayColorPicker(true)} className="flex flex-col items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition group">
                      <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: bgColor }} />
                      <span className="text-xs mt-1 text-white/50">BG Color</span>
                    </div>
                    {displayColorPicker && (<div style={popover}><div style={cover} onClick={() => setDisplayColorPicker(false)} /><ChromePicker color={bgColor} onChange={(color) => setBgColor(color.hex)} disableAlpha={true} /></div>)}
                  </div>
                )}
              </div>
            </div>
            <button onClick={downloadQRCode} className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <FaDownload className="mr-3" /> Generate & Download
            </button>
          </div>
          {/* QR Code Preview Panel */}
          <div className="bg-black/10 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl flex items-center justify-center border border-white/10 min-h-[350px] md:min-h-[400px]">
            <div ref={qrCodeRef} className="p-4 rounded-2xl transition-all duration-300" style={{ backgroundColor: bgType === 'color' ? bgColor : 'transparent', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <QRCode value={qrValue} logoImage={logoImage} logoWidth={80} logoHeight={80} logoOpacity={1} size={280} qrStyle="squares" eyeRadius={12} fgColor="#000000" bgColor="transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Simplified and Responsive Modal with Icon Color Pickers */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl w-full max-w-md p-6">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition"><FaTimes size={20} /></button>
            <h3 className="text-2xl font-bold text-white/90 mb-4">Center Style</h3>
            <div className="flex space-x-2 border-b border-white/10 mb-4">
              {['icon', 'upload'].map(tab => (
                <button key={tab} onClick={() => setModalTab(tab)} className={`px-4 py-2 text-sm font-semibold capitalize transition ${modalTab === tab ? 'text-white border-b-2 border-blue-500' : 'text-white/50 hover:text-white'}`}>{tab}</button>
              ))}
            </div>
            
            {modalTab === 'icon' && (
              <div>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-4 p-3 bg-white/5 rounded-lg">
                  <div className="relative text-center">
                    <span className="text-xs text-white/60 mb-1 block">Icon Color</span>
                    <div className="w-12 h-6 rounded-md border border-white/20 cursor-pointer" style={{ backgroundColor: iconColor }} onClick={() => setDisplayIconColorPicker(true)} />
                    {displayIconColorPicker && (<div style={popover}><div style={cover} onClick={() => setDisplayIconColorPicker(false)} /><ChromePicker color={iconColor} onChange={(color) => setIconColor(color.hex)} disableAlpha={true} /></div>)}
                  </div>
                  <div className="relative text-center">
                    <span className="text-xs text-white/60 mb-1 block">Circle Color</span>
                    <div className="w-12 h-6 rounded-md border border-white/20 cursor-pointer" style={{ backgroundColor: iconBgColor }} onClick={() => setDisplayIconBgColorPicker(true)} />
                    {displayIconBgColorPicker && (<div style={popover}><div style={cover} onClick={() => setDisplayIconBgColorPicker(false)} /><ChromePicker color={iconBgColor} onChange={(color) => setIconBgColor(color.hex)} disableAlpha={true} /></div>)}
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {iconLibrary.map(icon => (
                    <button key={icon.name} onClick={() => setSelectedIconComponent(icon.component)} className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                      <span className="text-3xl md:text-4xl text-white/70 group-hover:text-white">{icon.component}</span>
                      <span className="text-xs mt-2 text-white/50">{icon.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {modalTab === 'upload' && (
              <div>
                <label htmlFor="logo-upload" className="w-full flex flex-col items-center justify-center p-8 bg-white/5 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-white/40 transition">
                  <FaImage size={40} className="text-white/50 mb-2" />
                  <span className="text-white/70">Upload Custom Logo</span>
                  <span className="text-xs text-white/40 mt-1">PNG, JPG, SVG</span>
                  <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setLogoImage)} />
                </label>
              </div>
            )}
            
            <div className="mt-6 border-t border-white/10 pt-4">
              <button onClick={removeCenterImage} className="w-full text-center py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition">Remove Center Image</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeGenerator;