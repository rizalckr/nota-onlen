import React from 'react';

const ReceiptView = ({ people, extra, calculateFinalPerson, totalPayable, receiptRef, title = "Nota Patungan" }) => {
  return (
    <div 
      ref={receiptRef} 
      className="max-w-md w-full bg-white shadow-2xl border-t-[15px] border-gray-900 flex flex-col relative mx-auto print:shadow-none print:border-t-0"
    >
      {/* Header Nota */}
      <div className="p-8 text-center border-b-2 border-dashed border-gray-200">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">{title}</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-sans">Pertemanan Sehat, Bayar Tepat</p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* List Rincian per Orang */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] font-sans border-b border-gray-800 pb-1">Rincian Pesanan</h3>
          
          {people.map((p) => (
            <div key={p.id} className="space-y-2">
              {/* Opsi Ultra Clean: Nama & Total Harga Utama */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                <span className="font-black text-xl uppercase tracking-tighter text-gray-900">{p.name || 'ANONIM'}</span>
                <span className="font-black text-xl tracking-tight text-gray-950">
                  Rp {calculateFinalPerson(p.items).toLocaleString('id-ID')}
                </span>
              </div>
              
              {/* List Barang Milik Orang Ini (Sudah Di-tweak agar lebih kontras & estetik) */}
              <div className="pl-4 space-y-1 border-l-2 border-gray-100 mb-4">
                {p.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs font-medium text-gray-500 font-sans tracking-wide">
                    <span>{item.name || 'Barang'}</span>
                    <span>Rp {(Number(item.price) || 0).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Biaya Tambahan (Ongkir, Voucher, Admin) */}
        <div className="space-y-2 py-4 border-y border-dashed border-gray-200 font-sans text-[11px] uppercase font-bold text-gray-500 italic">
          <div className="flex justify-between">
            <span>Biaya Ongkir (+)</span>
            <span>Rp {(Number(extra.ongkir) || 0).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Voucher Diskon (-)</span>
            <span>Rp {(Number(extra.voucher) || 0).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-blue-600">
            <span>Biaya Admin (+)</span>
            <span>Rp {(Number(extra.admin) || 0).toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="pt-4 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] block mb-2 text-gray-400 font-sans">Total Akhir</span>
          <span id="target-total-akhir" className="text-5xl font-black tracking-tighter text-gray-900 mb-8 italic transition-all duration-500 rounded px-2">
  Rp {totalPayable.toLocaleString('id-ID')}
</span>
          
          <div className="flex justify-center">
            <div className="border-[3px] border-gray-900 px-8 py-2 text-sm font-black uppercase transform -rotate-2 tracking-widest">
              APPROVED
            </div>
          </div>
        </div>
      </div>

      {/* Barcode Dekoratif */}
      <div className="mt-4 mb-10 px-12 opacity-20">
        <div className="h-12 w-full bg-[repeating-linear-gradient(90deg,#000,#000_1px,transparent_1px,transparent_4px,#000_4px,#000_5px,transparent_5px,transparent_8px)]"></div>
        <div className="text-center text-[9px] font-sans tracking-[0.6em] mt-2 font-bold uppercase">Design by Amiroel</div>
      </div>
    </div>
  );
};

export default ReceiptView;