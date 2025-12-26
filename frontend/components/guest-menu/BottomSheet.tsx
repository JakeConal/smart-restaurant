'use client';

import { useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  maxHeight?: string;
}

export const BottomSheet = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  footer,
  maxHeight = 'max-h-[92vh]'
}: BottomSheetProps) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[32px] ${maxHeight} flex flex-col shadow-2xl transition-transform duration-300 overflow-hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Header */}
        {title && (
          <div className="flex-shrink-0 bg-white border-b border-black/5 flex items-center justify-between p-4 z-30">
            <h3 className="font-bold text-lg text-premium-black">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-premium-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 relative">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 pb-safe">
            {footer}
          </div>
        )}
      </div>

      <style jsx>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </>
  );
};
