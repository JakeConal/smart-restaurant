'use client';

import { useState, useCallback } from 'react';
import { Toast } from './Toast';

export interface ToastMessage {
  id: string;
  message: string;
}

let addToastFn: ((message: string) => void) | null = null;

export const showToast = (message: string) => {
  if (addToastFn) {
    addToastFn(message);
  }
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string) => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Expose addToast to showToast function
  if (!addToastFn) {
    addToastFn = addToast;
  }

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
