'use client';

interface MenuHeaderProps {
  restaurantName?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSortClick: () => void;
}

export const MenuHeader = ({
  restaurantName = 'Restaurant',
  searchQuery,
  onSearchChange,
  onSortClick,
}: MenuHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 px-4 pt-4 pb-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-premium-black">
            {restaurantName}
          </h1>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-premium-gray font-medium">Open Now</span>
          </div>
        </div>
        <button className="p-2.5 rounded-full bg-white border border-premium-border/30 shadow-sm hover:shadow-md transition-shadow">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes..."
            className="w-full pl-10 pr-4 py-3 bg-premium-beige/50 border border-premium-border/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-premium-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={onSortClick}
          className="px-3.5 py-3 bg-white border border-premium-border/40 rounded-2xl shadow-sm active:scale-95 transition-transform"
        >
          <svg
            className="w-5 h-5 text-premium-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
