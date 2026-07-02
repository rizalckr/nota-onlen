import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import ReceiptView from '../components/Receiptview';

const ScreenshotPage = ({ people, extra, calculateFinalPerson, totalPayable, onBack }) => {
  const screenshotRef = useRef(null);
  const [status, setStatus] = useState('ready');
  const [customTitle, setCustomTitle] = useState('Nota Patungan'); // New customization state

  const downloadImage = async () => {
    if (!screenshotRef.current) return;
    try {
      setStatus('processing');
      await new Promise(r => setTimeout(r, 400));
      const dataUrl = await htmlToImage.toPng(screenshotRef.current, {
        quality: 1,
        backgroundColor: '#FFFFFF',
        pixelRatio: 3, 
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `Struk-${customTitle.replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setStatus('success');
      setTimeout(() => setStatus('ready'), 2000);
    } catch (err) {
      console.error('Gagal download:', err);
      setStatus('ready');
    }
  };

  const handlePrint = () => {
    window.print(); // Triggers the browser print dialog
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] flex flex-col items-center pt-28 pb-20 font-sans px-4 print:bg-white print:pt-0">
      
      {/* 1. TOP NAV - Hidden during print */}
      <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none print:hidden">
        <div className="pointer-events-auto bg-black text-white w-full max-w-md px-6 py-4 rounded-[2rem] shadow-xl flex items-center justify-between border border-white/10">
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-white">← Back</button>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="bg-stone-800 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">Print 🖨️</button>
            <button 
              onClick={downloadImage}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${status === 'success' ? 'bg-green-500' : 'bg-white text-black'}`}
            >
              {status === 'processing' ? '...' : status === 'success' ? 'Saved!' : 'Save 📸'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. CUSTOMIZATION PANEL - Hidden during print */}
      <div className="w-full max-w-md mb-8 space-y-4 print:hidden">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <label className="text-[10px] font-black uppercase text-stone-400 block mb-2">Edit Judul Nota</label>
          <input 
            type="text" 
            className="w-full bg-stone-50 border-none rounded-lg p-2 font-bold text-sm focus:ring-2 ring-black outline-none"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
        </div>
      </div>

      {/* 3. RECEIPT PREVIEW */}
      <div className="print:m-0 print:shadow-none">
        <ReceiptView 
          people={people}
          extra={extra}
          calculateFinalPerson={calculateFinalPerson}
          totalPayable={totalPayable}
          receiptRef={screenshotRef}
          title={customTitle} // Passing custom title
        />
      </div>
    </div>
  );
};

export default ScreenshotPage;