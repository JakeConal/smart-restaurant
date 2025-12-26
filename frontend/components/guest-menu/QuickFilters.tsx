'use client';

interface QuickFiltersProps {
  filters: {
    chef: boolean;
    available: boolean;
    under50: boolean;
    fast: boolean;
  };
  onToggle: (key: 'chef' | 'available' | 'under50' | 'fast') => void;
}

export const QuickFilters = ({ filters, onToggle }: QuickFiltersProps) => {
  return (
    <div
      className="px-4 py-4 flex space-x-2 overflow-x-auto"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <button
        onClick={() => onToggle('chef')}
        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm flex items-center space-x-1 transition-all ${
          filters.chef
            ? 'bg-gold-500 text-white border-gold-500'
            : 'border-premium-border/40 bg-white text-premium-black hover:bg-gray-50'
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 ${filters.chef ? 'text-white' : 'text-gold-500'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
        <span>Chef&apos;s Pick</span>
      </button>

      <button
        onClick={() => onToggle('available')}
        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-all ${
          filters.available
            ? 'bg-gold-500 text-white border-gold-500'
            : 'border-premium-border/40 bg-white text-premium-black hover:bg-gray-50'
        }`}
      >
        Available
      </button>

      <button
        onClick={() => onToggle('under50')}
        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-all ${
          filters.under50
            ? 'bg-gold-500 text-white border-gold-500'
            : 'border-premium-border/40 bg-white text-premium-black hover:bg-gray-50'
        }`}
      >
        Under 50k
      </button>

      <button
        onClick={() => onToggle('fast')}
        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-all ${
          filters.fast
            ? 'bg-gold-500 text-white border-gold-500'
            : 'border-premium-border/40 bg-white text-premium-black hover:bg-gray-50'
        }`}
      >
        Fast (≤15m)
      </button>
    </div>
  );
};
