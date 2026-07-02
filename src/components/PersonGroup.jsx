import React from 'react';

const PersonGroup = ({
  person,
  onUpdatePerson,
  onAddSubItem,
  onUpdateSubItem,
  onRemoveSubItem,
  onRemovePerson
}) => {

  // HITUNG TOTAL HARGA BARANG ASLI (Tanpa potongan/tambahan apa pun)
  const totalHargaAsliOrangIni = person.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 mb-4 font-sans">

      {/* HEADER: Nama Orang */}
      <div className="flex justify-between items-center border-b border-stone-900 pb-2">
        <input
          className="w-full bg-transparent outline-none font-black text-lg uppercase tracking-tight placeholder-stone-300 text-stone-900"
          value={person.name}
          onChange={(e) => onUpdatePerson(person.id, e.target.value)}
          placeholder="NAMA ORANG..."
        />
        <button
          onClick={() => onRemovePerson(person.id)}
          className="text-stone-300 hover:text-red-500 transition-colors pl-2"
        >
          ✕
        </button>
      </div>

      {/* LIST BARANG */}
      <div className="space-y-3">
        {person.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 group py-1 border-b border-stone-50">

            {/* Sisi Kiri: Nama Makanan */}
            <div className="flex items-center gap-2 flex-1">
              <input
                className="w-full bg-transparent outline-none text-sm font-medium text-stone-700 placeholder-stone-300 italic"
                value={item.name}
                onChange={(e) => onUpdateSubItem(person.id, item.id, 'name', e.target.value)}
                placeholder="Nama makanan / minuman"
              />
            </div>

            {/* Sisi Kanan: Input Harga */}
            <div className="flex items-center bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100 focus-within:border-stone-300 transition-all w-32">
              <span className="text-[10px] font-black text-stone-400 mr-1">RP</span>
              <input
                type="number"
                inputMode="numeric"
                className="w-full bg-transparent outline-none font-bold text-sm text-right text-stone-900 placeholder-stone-300"
                value={item.price}
                onChange={(e) => onUpdateSubItem(person.id, item.id, 'price', e.target.value)}
                placeholder="0"
              />
            </div>

            {/* Tombol Hapus */}
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                onRemoveSubItem(person.id, item.id);
              }}
              className="text-stone-300 hover:text-red-500 text-xs transition-colors pr-1"
              title="Hapus item"
            >
              ✕
            </button>

          </div>
        ))}

        {/* FOOTER DI DALAM CARD: Live Total Asli & Tombol Tambah */}
        <div className="pt-3 flex items-center justify-between border-t border-dashed border-stone-100 mt-2">

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onAddSubItem(person.id);
            }}
            className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 tracking-wider flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
          >
            <span>+</span> <span>Tambah Barang</span>
          </button>

          {/* TOTAL HARGA ASLI SEBELUM POTONGAN */}
          <div className="text-right flex flex-col items-end">
  <span className="text-[8px] font-black text-stone-400 uppercase tracking-wider leading-none mb-1">
    Total Item
  </span>
  <span 
    id={`target-porsi-${person.id}`} 
    className="text-sm font-black text-stone-900 font-mono transition-all duration-500 rounded px-1 block origin-right"
  >
    Rp {totalHargaAsliOrangIni.toLocaleString('id-ID')}
  </span>
</div>

        </div>
      </div>
    </div>
  );
};

export default PersonGroup;