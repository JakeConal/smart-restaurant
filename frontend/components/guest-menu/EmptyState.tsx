interface EmptyStateProps {
  onResetFilters: () => void;
}

export const EmptyState = ({ onResetFilters }: EmptyStateProps) => {
  return (
    <div className="py-20 text-center space-y-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="font-bold text-gray-600">No dishes found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters or search</p>
      </div>
      <button
        onClick={onResetFilters}
        className="text-gold-500 font-semibold text-sm underline hover:text-gold-600 transition-colors"
      >
        Reset all filters
      </button>
    </div>
  );
};
