import { useState, useRef, useEffect } from 'react';

export default function CurrencySelector({ currencies, selected, onSelect, label }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filtered = currencies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const cryptos = filtered.filter(c => c.type === 'crypto');
  const fiats = filtered.filter(c => c.type === 'fiat');

  return (
    <div className="relative" ref={ref}>
      <label className="block text-xs text-text-secondary mb-1.5 uppercase tracking-wider font-medium">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-bg-input/50 border border-border-custom rounded-xl
                   hover:border-accent/50 transition-all duration-200 cursor-pointer text-left"
      >
        <span className="text-xl w-8 text-center flex-shrink-0">{selected.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-text-primary text-sm">{selected.symbol}</div>
          <div className="text-xs text-text-secondary truncate">{selected.name}</div>
        </div>
        <svg
          className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-bg-card border border-border-custom rounded-xl shadow-2xl
                        max-h-80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-border-custom">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search currencies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-bg-input/50 border border-border-custom rounded-lg text-sm
                         text-text-primary placeholder-text-secondary outline-none focus:border-accent/50"
            />
          </div>
          <div className="overflow-y-auto max-h-64">
            {cryptos.length > 0 && (
              <>
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-text-secondary font-semibold bg-bg-secondary/50">
                  Cryptocurrencies
                </div>
                {cryptos.map(c => (
                  <CurrencyOption
                    key={c.id}
                    currency={c}
                    isSelected={selected.id === c.id}
                    onSelect={() => { onSelect(c); setOpen(false); setSearch(''); }}
                  />
                ))}
              </>
            )}
            {fiats.length > 0 && (
              <>
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-text-secondary font-semibold bg-bg-secondary/50">
                  Fiat Currencies
                </div>
                {fiats.map(c => (
                  <CurrencyOption
                    key={c.id}
                    currency={c}
                    isSelected={selected.id === c.id}
                    onSelect={() => { onSelect(c); setOpen(false); setSearch(''); }}
                  />
                ))}
              </>
            )}
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-center text-text-secondary text-sm">No currencies found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CurrencyOption({ currency, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 cursor-pointer
        ${isSelected
          ? 'bg-accent/15 text-accent'
          : 'hover:bg-bg-input/30 text-text-primary'
        }`}
    >
      <span className="text-lg w-7 text-center flex-shrink-0">{currency.icon}</span>
      <span className="font-medium text-sm">{currency.symbol}</span>
      <span className="text-xs text-text-secondary truncate">{currency.name}</span>
    </button>
  );
}
