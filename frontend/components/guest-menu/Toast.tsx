'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, onClose, duration = 2500 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="bg-premium-black text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl animate-slide-up flex items-center space-x-2 pointer-events-auto">
      <svg
        className="w-4 h-4 text-green-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};
