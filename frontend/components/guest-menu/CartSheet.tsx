'use client';

import { BottomSheet } from './BottomSheet';
import { QuantityStepper } from './QuantityStepper';
import type { CartItem } from '@/types/menu';
import Image from 'next/image';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (uid: string, delta: number) => void;
  onRemove: (uid: string) => void;
  subtotal: number;
  tax: number;
  total: number;
  onCheckout: () => void;
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

export const CartSheet = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  subtotal,
  tax,
  total,
  onCheckout,
}: CartSheetProps) => {
  if (cart.length === 0) {
    return (
      <BottomSheet 
        isOpen={isOpen} 
        onClose={onClose} 
        title="Your Tray"
        maxHeight="max-h-[85vh]"
      >
        <div className="py-20 text-center px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="font-bold text-gray-600">Your tray is empty</p>
          <p className="text-sm text-gray-400 mt-1">Add some dishes to get started</p>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Your Tray"
      maxHeight="max-h-[85vh]"
      footer={
        <div className="p-6 bg-white border-t border-black/5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-premium-gray">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-premium-gray">
              <span>Tax (10%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-dashed border-gray-200 pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-gold-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-gold-500/20 active:scale-95 transition-all"
          >
            Place Order
          </button>
        </div>
      }
    >
      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cart.map((cartItem) => (
          <div
            key={cartItem.uid}
            className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-start space-x-3">
              {/* Image */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                {cartItem.menuItem.primaryPhoto?.url ? (
                  <Image
                    src={cartItem.menuItem.primaryPhoto.url}
                    alt={cartItem.menuItem.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-premium-black line-clamp-1">
                      {cartItem.menuItem.name}
                    </h4>
                    <p className="text-xs font-semibold text-gold-600 mt-1">
                      {formatPrice(cartItem.totalPrice)}
                    </p>
                  </div>

                  <QuantityStepper
                    quantity={cartItem.quantity}
                    onIncrease={() => onUpdateQuantity(cartItem.uid, 1)}
                    onDecrease={() => onUpdateQuantity(cartItem.uid, -1)}
                  />
                </div>

                {/* Modifiers */}
                {cartItem.selectedModifiers.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {cartItem.selectedModifiers.map((mod, idx) => (
                      <p key={idx} className="text-[11px] text-premium-gray">
                        + {mod.optionName}
                        {mod.priceAdjustment > 0 && (
                          <span className="ml-1">({formatPrice(mod.priceAdjustment)})</span>
                        )}
                      </p>
                    ))}
                  </div>
                )}

                {/* Remove Button */}
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => onRemove(cartItem.uid)}
                    className="text-[10px] font-bold text-red-500 uppercase tracking-wider active:opacity-50 transition-opacity"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};
