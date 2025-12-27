'use client';

interface CartBarProps {
  itemCount: number;
  total: number;
  onClick: () => void;
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

export const CartBar = ({ itemCount, total, onClick }: CartBarProps) => {
  if (itemCount === 0) return null;

  return (
    <div
      className={`fixed bottom-6 left-4 right-4 z-50 transition-transform duration-300 ${
        itemCount > 0 ? 'translate-y-0' : 'translate-y-24'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full bg-premium-black text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between active:scale-[0.98] active:bg-premium-black active:text-white transition-all"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{itemCount}</span>
            </div>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-wide opacity-60">
              {itemCount} item{itemCount > 1 ? 's' : ''}
            </p>
            <p className="text-sm font-bold">{formatPrice(total)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold uppercase tracking-wide">View Cart</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
