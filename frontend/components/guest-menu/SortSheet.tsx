'use client';

import { BottomSheet } from './BottomSheet';

interface SortSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: 'popularity' | 'price_asc' | 'newest';
  onSortChange: (sort: 'popularity' | 'price_asc' | 'newest') => void;
}

export const SortSheet = ({
  isOpen,
  onClose,
  selectedSort,
  onSortChange,
}: SortSheetProps) => {
  const handleChange = (sort: 'popularity' | 'price_asc' | 'newest') => {
    onSortChange(sort);
    setTimeout(onClose, 300); // Close after selection
  };

  return (
    <BottomSheet 
      isOpen={isOpen} 
      onClose={onClose}
      title="Sort Dishes By"
    >
      <div className="p-6 pt-2 space-y-4">
          <label
            className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
              selectedSort === 'popularity'
                ? 'bg-gold-50/50 border-gold-500'
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Most Popular</span>
            <input
              type="radio"
              name="sort"
              value="popularity"
              checked={selectedSort === 'popularity'}
              onChange={() => handleChange('popularity')}
              className="w-5 h-5 accent-gold-500"
            />
          </label>

          <label
            className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
              selectedSort === 'price_asc'
                ? 'bg-gold-50/50 border-gold-500'
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Price: Low to High</span>
            <input
              type="radio"
              name="sort"
              value="price_asc"
              checked={selectedSort === 'price_asc'}
              onChange={() => handleChange('price_asc')}
              className="w-5 h-5 accent-gold-500"
            />
          </label>

          <label
            className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
              selectedSort === 'newest'
                ? 'bg-gold-50/50 border-gold-500'
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Newest First</span>
            <input
              type="radio"
              name="sort"
              value="newest"
              checked={selectedSort === 'newest'}
              onChange={() => handleChange('newest')}
              className="w-5 h-5 accent-gold-500"
            />
          </label>
        </div>
    </BottomSheet>
  );
};
