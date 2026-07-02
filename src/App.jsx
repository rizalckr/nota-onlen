import React, { useState, useRef } from 'react';
import PersonGroup from './components/PersonGroup';
import ReceiptView from './components/Receiptview';
import ScreenshotPage from './pages/ScreenshotPage';
import FAQ from './components/FAQ';

const App = () => {
  const [people, setPeople] = useState([{ id: Date.now(), name: '', items: [{ id: Date.now() + 1, name: '', price: '' }] }]);
  const [extra, setExtra] = useState({ ongkir: '', voucher: '', admin: '' });
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [isReceiptFocused, setIsReceiptFocused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const receiptRef = useRef(null);

  const addPerson = () => {
  const newId = Date.now();
  setPeople([...people, { id: newId, name: '', items: [{ id: Date.now() + 1, name: '', price: '' }] }]);
  
  setTimeout(() => {
    const newElement = document.getElementById(`person-card-${newId}`);
    if (newElement) {
      newElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 50);
};
  const removePerson = (id) => people.length > 1 && setPeople(people.filter(p => p.id !== id));
  const updatePersonName = (id, name) => setPeople(people.map(p => p.id === id ? { ...p, name } : p));
  const addSubItem = (pId) => setPeople(people.map(p => p.id === pId ? { ...p, items: [...p.items, { id: Date.now(), name: '', price: '' }] } : p));
  const updateSubItem = (pId, iId, field, val) => setPeople(people.map(p => p.id === pId ? { ...p, items: p.items.map(i => i.id === iId ? { ...i, [field]: val } : i) } : p));
  const removeSubItem = (pId, iId) => setPeople(people.map(p => p.id === pId ? { ...p, items: p.items.length > 1 ? p.items.filter(i => i.id !== iId) : p.items } : p));

  const calcRaw = (items) => items.reduce((s, i) => s + (Number(i.price) || 0), 0);
  const totalRaw = people.reduce((s, p) => s + calcRaw(p.items), 0);
  const netAdj = (Number(extra.ongkir) || 0) - (Number(extra.voucher) || 0);
  const adminEach = (Number(extra.admin) || 0) / people.length;

  const calculateFinalPerson = (items) => {
    const raw = calcRaw(items);
    if (totalRaw === 0) return 0;
    return Math.round((raw / totalRaw) * (totalRaw + netAdj) + adminEach);
  };

  const totalPayable = people.reduce((s, p) => s + calculateFinalPerson(p.items), 0);

  const handleGoToScreenshot = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowScreenshot(true);
      setIsExiting(false);
      window.scrollTo(0, 0);
    }, 400); 
  };

  const handleBackToEditor = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowScreenshot(false);
      setIsExiting(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  const scrollToAndHighlight = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Jika yang diklik adalah total-akhir, nyalakan force focus untuk struk
    if (elementId === 'target-total-akhir') {
      setIsReceiptFocused(true);
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('animate-smart-pulse');
    
    setTimeout(() => {
      element.classList.remove('animate-smart-pulse');
      setIsReceiptFocused(false); // Matikan force focus setelah 3 detik
    }, 3000);
  }
};

  return (
    <div className="min-h-screen bg-[#F2F0E9] font-sans">
      
      {/* 1. TOP STICKY HEADER (Di luar div animasi agar tetap Fixed) */}
      {!showScreenshot && (
        <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
          <div className="pointer-events-auto bg-black text-white w-full max-w-md px-6 py-4 rounded-[2rem] shadow-xl flex items-center justify-between border border-white/10">
            <div className="flex flex-col">
              <span className="text-[7px] font-black uppercase text-stone-500 mb-1 leading-none tracking-widest">Total Tagihan</span>
              <span className="text-sm font-bold italic tracking-tight">Rp {totalPayable.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-[1px] bg-white/20"></div>
              <button onClick={handleGoToScreenshot} className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 active:scale-95 transition-all">
                SIMPAN 📸
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. AREA KONTEN (Yang Beranimasi) */}
      <div className={isExiting ? "page-exit" : "page-enter"}>
  {showScreenshot ? (
    <ScreenshotPage 
      people={people}
      extra={extra}
      calculateFinalPerson={calculateFinalPerson}
      totalPayable={totalPayable}
      onBack={handleBackToEditor}
    />
  ) : (
    <div className="flex flex-col items-center pt-32 pb-48 px-4">
      <div className="max-w-md w-full space-y-6"> {/* Mengubah space-y agar jarak seimbang */}
        
        {/* List Input */}
        <div className="space-y-4">
  {people.map((p) => (
    <div key={p.id} id={`person-card-${p.id}`} className="scroll-mt-32"> 
      <PersonGroup 
        person={p} 
        onUpdatePerson={updatePersonName} 
        onAddSubItem={addSubItem} 
        onUpdateSubItem={updateSubItem} 
        onRemoveSubItem={removeSubItem} 
        onRemovePerson={removePerson} 
      />
    </div>
  ))}
</div>

<div id="target-total-kotor" className="scroll-mt-32 flex justify-between items-center bg-stone-200/60 px-6 py-3 rounded-xl border border-stone-300/40 mt-4 text-stone-700 transition-all duration-500">
  <span className="text-[10px] font-black uppercase tracking-wider">Total Kotor (Semua Orang)</span>
  <span className="font-mono font-bold text-sm text-stone-900">Rp {totalRaw.toLocaleString('id-ID')}</span>
</div>

        {/* 🚀 UX FIX: TOMBOL TAMBAH ORANG INLINE (Diletakkan persis di bawah list orang) */}
        <div className="pt-2">
          <button 
            onMouseDown={(e) => {
              e.preventDefault(); // Menjaga agar keyboard tidak dismiss/tutup saat diklik
              addPerson();
            }}
            className="w-full bg-stone-900 text-white py-4 rounded-2xl shadow-md flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:bg-stone-800 border border-white/5"
          >
            <span className="text-xl font-medium leading-none mb-0.5">+</span>
            <span className="text-xs font-black uppercase tracking-[0.15em]">Tambah Orang Baru</span>
          </button>
        </div>

        {/* Adjustment Area (Extra Charges) */}
        <div className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-8 border border-stone-200 mt-6">
          <h3 className="text-[9px] font-black text-stone-400 uppercase tracking-[0.4em] mb-6 text-center italic">Extra Charges</h3>
          <div className="grid grid-cols-3 gap-6">
  {['ongkir', 'voucher', 'admin'].map(f => (
    <div key={f} className="flex flex-col">
      <label className="text-[8px] font-black uppercase text-stone-400 mb-2 text-center tracking-tighter">{f}</label>
      {/* SUNTIK ID DINAMIS DI SINI */}
      <input 
        id={`target-${f}`}
        type="number" 
        className="w-full bg-transparent border-b-2 border-stone-200 py-1 text-center text-xs font-bold outline-none focus:border-black transition-all duration-500 rounded" 
        value={extra[f]} 
        onChange={(e) => setExtra({...extra, [f]: e.target.value})} 
        placeholder="0" 
      />
    </div>
  ))}
</div>
        </div>

        {/* Live Preview */}
        <div className="pt-10 flex flex-col items-center">
          <div className="flex items-center gap-3 w-full mb-6 opacity-40">
            <div className="h-[1px] flex-1 bg-stone-400"></div>
            <span className="text-[9px] font-black uppercase text-stone-500 tracking-widest">Live Preview</span>
            <div className="h-[1px] flex-1 bg-stone-400"></div>
          </div>
          <div className="w-full transition-all opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transform scale-90 hover:scale-[0.98] origin-top">
             <ReceiptView people={people} extra={extra} calculateFinalPerson={calculateFinalPerson} totalPayable={totalPayable} receiptRef={receiptRef} />
          </div>
          <FAQ 
  people={people} 
  extra={extra} 
  totalRaw={totalRaw} 
  totalPayable={totalPayable} 
  onJump={scrollToAndHighlight}
/>
        </div>

      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default App;