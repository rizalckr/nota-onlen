import React, { useState } from 'react';

const FAQ = ({ people, extra, totalRaw, totalPayable, onJump }) => {
  const [showPeoplePopup, setShowPeoplePopup] = useState(false);
  const firstPerson = people[0];
  
  const calcRaw = (items) => items.reduce((s, i) => {
    const q = i.qty === '' ? 1 : (Number(i.qty) || 1);
    const p = Number(i.price) || 0;
    return s + (q * p);
  }, 0);
  const firstPersonRaw = firstPerson ? calcRaw(firstPerson.items) : 0;
  
  const ongkirTotal = Number(extra.ongkir) || 0;
  const voucherTotal = Number(extra.voucher) || 0;
  const adminTotal = Number(extra.admin) || 0;
  const totalKotor = totalRaw;
  const jumlahOrang = people.length;

  const namaOrangList = people.map((p, index) => `${index + 1}. ${p.name || 'Anonim'}`).join('\n');
  const namaOrangHtmlList = people.map((p, index) => p.name || 'Anonim');

  const handleElementClick = (type) => {
    if (!onJump) return;
    if (type === 'porsi') onJump(`target-porsi-${firstPerson?.id}`);
    if (type === 'kotor') onJump('target-total-kotor');
    if (type === 'admin') onJump('target-admin');
    if (type === 'ongkir') onJump('target-ongkir');
    if (type === 'voucher') onJump('target-voucher');
  };

  return (
    <div className="w-full max-w-md bg-stone-100/80 border border-stone-200/60 rounded-2xl p-4 mt-4 font-sans text-stone-600 text-xs">
      <div className="flex gap-2 items-start">
        <span className="text-sm shrink-0 mt-0.5">ℹ️</span>
        <div className="space-y-3 w-full">
          <div>
            <span className="font-bold text-stone-900 block uppercase tracking-wide mb-1">Cara Cek Manual di Kalkulator:</span>
            <p><span className="font-bold text-stone-900">Harga Akhir per Orang:</span></p>
            <div className="font-mono bg-stone-200/50 p-2 rounded-lg text-stone-800 text-[10.5px] block tracking-tighter mb-3 leading-relaxed">
              (Harga Total Item Lo ÷ Total Kotor) × (Total Kotor + Ongkir - Voucher) + (Admin ÷ Jumlah Orang)
            </div>

            <div className="space-y-1">
              <p><span className="font-bold text-stone-900">Proporsi Ongkir & Voucher:</span></p>
              <div className="font-mono bg-stone-200/40 p-2 rounded-lg text-stone-700 text-[10px] leading-relaxed block tracking-tighter">
                <div>Ongkir Lo = (Harga Total Item Lo ÷ Total Kotor) × Total Ongkir</div>
                <div>Voucher Lo = (Harga Total Item Lo ÷ Total Kotor) × Total Voucher</div>
              </div>
              <p className="text-[10px] text-stone-500 italic mt-0.5">
                *Makin mahal makanan lo, makin besar nanggung ongkir & makin besar dapet potongan diskonnya.
              </p>
            </div>
            
            {firstPerson && totalKotor > 0 && (
              <div className="mt-5 pt-4 border-t border-stone-200/80 space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Contoh Simulasi ({firstPerson.name || 'Orang Ke-1'}):
                </span>
                
                <div className="font-mono bg-stone-900 text-stone-400 p-3 rounded-xl text-[11px] flex flex-wrap gap-y-1.5 items-center shadow-md leading-none tracking-tight">
                  <span>(</span>
                  <button onClick={() => handleElementClick('porsi')} className="text-emerald-400 hover:text-emerald-300 font-semibold px-0.5 transition-colors underline decoration-emerald-500/30 underline-offset-2" title="Harga Total Item Lo">
                    {firstPersonRaw.toLocaleString('id-ID')}
                  </button>
                  <span className="mx-1 text-stone-600">÷</span>
                  <button onClick={() => handleElementClick('kotor')} className="text-emerald-400 hover:text-emerald-300 font-semibold px-0.5 transition-colors underline decoration-emerald-500/30 underline-offset-2" title="Total Kotor">
                    {totalKotor.toLocaleString('id-ID')}
                  </button>
                  <span>) × (</span>
                  <button onClick={() => handleElementClick('kotor')} className="text-emerald-400 hover:text-emerald-300 font-semibold px-0.5 transition-colors underline decoration-emerald-500/30 underline-offset-2" title="Total Kotor">
                    {totalKotor.toLocaleString('id-ID')}
                  </button>
                  <span className="mx-1 text-stone-600">+</span>
                  <button onClick={() => handleElementClick('ongkir')} className="text-emerald-400 hover:text-emerald-300 font-semibold px-0.5 transition-colors underline decoration-emerald-500/30 underline-offset-2" title="Ongkir">
                    {ongkirTotal.toLocaleString('id-ID')}
                  </button>
                  <span className="mx-1 text-stone-600">-</span>
                  <button onClick={() => handleElementClick('voucher')} className="text-emerald-400 hover:text-emerald-300 font-semibold px-0.5 transition-colors underline decoration-emerald-500/30 underline-offset-2" title="Voucher">
                    {voucherTotal.toLocaleString('id-ID')}
                  </button>
                  <span>) + (</span>
                  <button onClick={() => handleElementClick('admin')} className="text-emerald-400 hover:text-emerald-300 font-semibold px-0.5 transition-colors underline decoration-emerald-500/30 underline-offset-2" title="Admin">
                    {adminTotal.toLocaleString('id-ID')}
                  </button>
                  <span className="mx-1 text-stone-600">÷</span>
                  
                  <div className="relative inline-block">
                    <button 
                      onClick={() => setShowPeoplePopup(!showPeoplePopup)}
                      onBlur={() => setTimeout(() => setShowPeoplePopup(false), 200)}
                      className="text-amber-400 hover:text-amber-300 font-bold px-1.5 py-0.5 bg-white/5 hover:bg-white/10 rounded transition-all focus:outline-none cursor-help"
                      title={namaOrangList}
                    >
                      {jumlahOrang}
                    </button>

                    {showPeoplePopup && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-stone-950 text-white p-3 rounded-xl border border-white/10 shadow-2xl z-50 min-w-[140px] text-left">
                        <div className="text-[9px] font-bold uppercase text-stone-400 mb-1.5 border-b border-white/10 pb-1 tracking-wider">
                          Daftar Orang ({jumlahOrang}):
                        </div>
                        <ul className="space-y-1 text-[10px] font-sans font-medium text-stone-300 max-h-36 overflow-y-auto pr-1">
                          {namaOrangHtmlList.map((name, i) => (
                            <li key={i} className="truncate max-w-[140px]">
                              <span className="text-stone-500 font-mono mr-1">{i + 1}.</span> {name}
                            </li>
                          ))}
                        </ul>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-stone-950"></div>
                      </div>
                    )}
                  </div>

                  <span>)</span>
                </div>

                <div className="text-[10.5px] text-stone-500 space-y-1 pt-1">
                  <p className="flex items-center gap-1.5">
                    <span className="inline-block w-1 h-1 bg-emerald-500 rounded-full"></span>
                    Ketuk angka <span className="text-emerald-600 font-semibold">hijau</span> untuk menuju input acuan rumus.
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="inline-block w-1 h-1 bg-amber-500 rounded-full"></span>
                    Ketuk angka <span className="text-amber-600 font-semibold">kuning</span> untuk melihat daftar nama patungan.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;