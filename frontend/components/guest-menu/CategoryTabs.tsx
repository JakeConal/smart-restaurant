'use client';

import type { MenuCategory } from '@/types/menu';

interface CategoryTabsProps {
  categories: MenuCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryTabs = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  const allCategories = [
    { id: 'all', name: 'All' },
    ...categories,
  ];

  return (
    <nav
      className="sticky top-[138px] z-30 bg-white/80 backdrop-blur-md py-3 px-4 flex space-x-2 overflow-x-auto border-b border-black/5"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
            selectedCategory === category.id
              ? 'bg-premium-black text-white shadow-lg border-premium-black active:bg-premium-black active:text-white'
              : 'border-transparent bg-white text-premium-gray hover:bg-gray-50 active:bg-gray-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
};
