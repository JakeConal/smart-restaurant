'use client';

import type { MenuItem } from '@/types/menu';
import Image from 'next/image';

interface MenuItemCardProps {
  item: MenuItem;
  onAddClick: (item: MenuItem) => void;
  onCardClick?: (item: MenuItem) => void;
}

const formatPrice = (price: number): string => {
  const safePrice = Number(price) || 0;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(safePrice)
    .replace('₫', 'đ');
};

export const MenuItemCard = ({ item, onAddClick, onCardClick }: MenuItemCardProps) => {
  const isSoldOut = item.status === 'sold_out';
  const isUnavailable = item.status === 'unavailable';
  const isDisabled = isSoldOut || isUnavailable;

  return (
    <div
      onClick={() => !isDisabled && onCardClick?.(item)}
      className={`bg-white border border-black/5 rounded-2xl p-4 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        isDisabled ? 'opacity-60' : ''
      }`}
    >
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        {item.primaryPhoto?.url ? (
          <Image
            src={item.primaryPhoto.url}
            alt={item.name}
            fill
            className={`object-cover ${isDisabled ? 'grayscale' : ''}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Chef's Pick Badge */}
        {item.isChefRecommended && !isDisabled && (
          <div className="absolute top-1 right-1">
            <svg
              className="w-5 h-5 text-gold-500 drop-shadow-md"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
        )}

        {/* Status Badges */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              SOLD OUT
            </span>
          </div>
        )}
        {isUnavailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              UNAVAILABLE
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm text-premium-black line-clamp-1">
          {item.name}
        </h3>
        <p className="text-xs text-premium-gray mt-1 line-clamp-2">
          {item.description || 'No description available'}
        </p>
        <div className="flex items-center space-x-3 mt-2">
          <span className="text-sm font-bold text-gold-600">
            {formatPrice(item.price)}
          </span>
          <span className="text-[10px] text-premium-gray font-medium uppercase tracking-wide">
            {item.prepTimeMinutes}min
          </span>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) onAddClick(item);
        }}
        disabled={isDisabled}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isDisabled
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-gold-500 text-white shadow-md hover:shadow-lg active:scale-95'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};
