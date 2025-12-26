'use client';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}

export const QuantityStepper = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
}: QuantityStepperProps) => {
  return (
    <div className="flex items-center bg-gray-50 border border-black/5 rounded-full px-1 py-0.5 space-x-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-5 h-5 flex items-center justify-center text-premium-gray/40 hover:text-premium-black disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-all"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
        </svg>
      </button>

      <span className="text-[11px] font-bold min-w-[14px] text-center text-premium-black">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="w-5 h-5 flex items-center justify-center text-premium-gray/40 hover:text-premium-black active:scale-90 transition-all"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};
