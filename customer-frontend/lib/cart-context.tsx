'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, MenuItem, CartItemModifier } from './types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity: number, modifiers: CartItemModifier[], specialInstructions?: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'smart_restaurant_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initialization to avoid useEffect setState issue
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Save cart to storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const calculateItemPrice = (menuItem: MenuItem, quantity: number, modifiers: CartItemModifier[]): number => {
    const basePrice = menuItem.price;
    const modifiersTotal = modifiers.reduce((sum, mod) => sum + mod.priceAdjustment, 0);
    return (basePrice + modifiersTotal) * quantity;
  };

  const addItem = useCallback((menuItem: MenuItem, quantity: number, modifiers: CartItemModifier[], specialInstructions?: string) => {
    const itemId = `${menuItem.id}-${modifiers.map(m => m.optionId).sort().join('-')}-${Date.now()}`;
    const totalPrice = calculateItemPrice(menuItem, quantity, modifiers);

    const newItem: CartItem = {
      id: itemId,
      menuItem,
      quantity,
      modifiers,
      specialInstructions,
      totalPrice,
    };

    setItems(prev => [...prev, newItem]);
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }

    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const totalPrice = calculateItemPrice(item.menuItem, quantity, item.modifiers);
        return { ...item, quantity, totalPrice };
      }
      return item;
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
