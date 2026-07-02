import React from 'react';

const PersonGroup = ({
  person,
  onUpdatePerson,
  onAddSubItem,
  onUpdateSubItem,
  onRemoveSubItem,
  onRemovePerson
}) => {

  const totalHargaAsliOrangIni = person.items.reduce((sum, item) => {
    const quantity = item.qty === '' ? 1 : (Number(item.qty) || 1);
    const singlePrice = Number(item.price) || 0;
    return sum + (quantity * singlePrice);
  }, 0);

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 mb-4 font-sans">

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

      <div className="space-y-3">
        {person.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-2 group py-1 border-b border-stone-50">
            
            <div className="flex items-center gap-2 flex-1">
              <input
                className="w-full bg-transparent outline-none text-sm font-medium text-stone-700 placeholder-stone-300 italic"
                value={item.name}
                onChange={(e) => onUpdateSubItem(person.id, item.id, 'name', e.target.value)}
                placeholder="Nama makanan / minuman"
              />
            </div>

            <div className="flex items-center bg-stone-100 px-2 py-1 rounded-lg border border-stone-200 w-16">
              <input
                type="number"
                inputMode="numeric"
                className="w-full bg-transparent outline-none font-bold text-xs text-center text-stone-800 placeholder-stone-400"
                value={item.qty}
                onChange={(e) => onUpdateSubItem(person.id, item.id, 'qty', e.target.value)}
                placeholder="1"
                min="1"
              />
              <span className="text-[9px] font-bold text-stone-400 ml-0.5">x</span>
            </div>

            <div className="flex items-center bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100 focus-within:border-stone-300 transition-all w-28">
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
      </div>

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

        <div className="text-right flex flex-col items-end">
          <span className="text-[8px] font-black text-stone-400 uppercase tracking-wider leading-none mb-1">
            Total Kotor
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
  );
};

export default PersonGroup;