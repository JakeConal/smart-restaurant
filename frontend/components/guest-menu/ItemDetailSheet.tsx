'use client';

import { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { QuantityStepper } from './QuantityStepper';
import type { MenuItem, ModifierGroup, SelectedModifierDetail } from '@/types/menu';
import Image from 'next/image';

interface ItemDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  allItems?: MenuItem[];
  onAddToCart: (item: MenuItem, modifiers: SelectedModifierDetail[], quantity: number) => void;
  onRelatedItemClick?: (item: MenuItem) => void;
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

export const ItemDetailSheet = ({
  isOpen,
  onClose,
  item,
  allItems = [],
  onAddToCart,
  onRelatedItemClick,
}: ItemDetailSheetProps) => {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, number[]>>({});
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Get related items (same category, excluding current)
  const relatedItems = allItems
    .filter((i) => i.categoryId === item?.categoryId && i.id !== item?.id)
    .slice(0, 4);

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      const initial: Record<string, number[]> = {};
      item.modifierGroups?.forEach((group) => {
        initial[group.id] = [];
      });
      setSelectedModifiers(initial);
      setQuantity(1);
      setSpecialInstructions('');
    }
  }, [item]);

  if (!item) return null;

  const handleModifierToggle = (groupId: string, optionIdx: number, group: ModifierGroup) => {
    setSelectedModifiers((prev) => {
      const current = prev[groupId] || [];

      if (group.selectionType === 'single') {
        // Single select: replace with new selection
        return { ...prev, [groupId]: [optionIdx] };
      } else {
        // Multiple select
        const isSelected = current.includes(optionIdx);

        if (isSelected) {
          // Deselect
          return { ...prev, [groupId]: current.filter((idx) => idx !== optionIdx) };
        } else {
          // Select (check max)
          if (group.maxSelections && current.length >= group.maxSelections) {
            return prev; // Max reached
          }
          return { ...prev, [groupId]: [...current, optionIdx] };
        }
      }
    });
  };

  // Calculate total price
  const calculateTotal = (): number => {
    let total = Number(item.price || 0);

    item.modifierGroups?.forEach((group) => {
      const selections = selectedModifiers[group.id] || [];
      selections.forEach((idx) => {
        const option = group.options[idx];
        if (option) {
          total += Number(option.priceAdjustment || 0);
        }
      });
    });

    return total * quantity;
  };

  // Check if all required modifiers are selected
  const canAddToCart = (): boolean => {
    return item.modifierGroups?.every((group) => {
      if (!group.isRequired) return true;
      const selections = selectedModifiers[group.id] || [];
      return selections.length >= group.minSelections;
    }) ?? true;
  };

  const handleAddToCart = () => {
    const modifiersDetail: SelectedModifierDetail[] = [];

    item.modifierGroups?.forEach((group) => {
      const selections = selectedModifiers[group.id] || [];
      selections.forEach((idx) => {
        const option = group.options[idx];
        if (option) {
          modifiersDetail.push({
            groupId: group.id,
            optionId: option.id,
            groupName: group.name,
            optionName: option.name,
            priceAdjustment: option.priceAdjustment,
          });
        }
      });
    });

    onAddToCart(item, modifiersDetail, quantity);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Dish Details"
      maxHeight="max-h-[85vh]"
      footer={
        <div className="bg-white border-t border-black/5 p-4 flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-[10px] text-premium-gray font-bold uppercase opacity-60">
              Total Price
            </p>
            <p className="text-lg font-bold text-gold-600">{formatPrice(calculateTotal())}</p>
          </div>

          {/* Quantity Stepper */}
          <QuantityStepper
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />

          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart()}
            className="flex-[2] bg-premium-black text-white py-4 rounded-2xl font-bold active:scale-95 active:bg-premium-black active:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            Add to Cart
          </button>
        </div>
      }
    >
      <div className="px-4 pt-2">
        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4">
          {item.primaryPhoto?.url ? (
            <Image
              src={item.primaryPhoto.url}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
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
        </div>

        {/* Item Info */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-premium-black">{item.name}</h2>
            <span className="text-lg font-bold text-gold-600">{formatPrice(item.price)}</span>
          </div>
          <p className="text-sm text-premium-gray">{item.description}</p>
          <div className="flex items-center space-x-4 pt-1">
            <div className="flex items-center space-x-1 text-premium-gray">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-medium">{item.prepTimeMinutes} min</span>
            </div>
            {item.isChefRecommended && (
              <div className="flex items-center space-x-1 text-gold-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span className="text-xs font-bold">Chef&apos;s Pick</span>
              </div>
            )}
          </div>
        </div>

        {/* Modifier Groups */}
        {item.modifierGroups && item.modifierGroups.length > 0 && (
          <div className="space-y-4 mb-6">
            {item.modifierGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-premium-black">{group.name}</h3>
                  {group.isRequired ? (
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                      Required
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-premium-gray uppercase tracking-wide">
                      Optional
                      {group.maxSelections > 0 && ` (Max ${group.maxSelections})`}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {group.options.map((option, idx) => {
                    const isSelected = selectedModifiers[group.id]?.includes(idx) || false;
                    const isRadio = group.selectionType === 'single';

                    return (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-gold-50/50 border-gold-500'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <input
                            type={isRadio ? 'radio' : 'checkbox'}
                            name={group.id}
                            checked={isSelected}
                            onChange={() => handleModifierToggle(group.id, idx, group)}
                            className="w-4 h-4 accent-gold-500"
                          />
                          <span className="font-medium text-sm">{option.name}</span>
                        </div>
                        {option.priceAdjustment !== 0 && (
                          <span className="text-sm font-semibold text-gold-600">
                            +{formatPrice(option.priceAdjustment)}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Information */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-sm text-premium-black uppercase tracking-wider">
              Product Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-premium-gray font-bold uppercase opacity-60">
                  Calories
                </p>
                <p className="text-sm font-bold text-premium-black">{item.calories || '---'} kcal</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-premium-gray font-bold uppercase opacity-60">
                  Prep Time
                </p>
                <p className="text-sm font-bold text-premium-black">{item.prepTimeMinutes} mins</p>
              </div>
            </div>

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] text-premium-gray font-bold uppercase opacity-60">
                  Ingredients
                </p>
                <p className="text-xs text-premium-gray leading-relaxed">
                  {item.ingredients.join(', ')}
                </p>
              </div>
            )}

            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-premium-gray uppercase opacity-60">
                  Allergens:
                </span>
                <div className="flex space-x-1">
                  {item.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="text-[9px] font-bold bg-white border border-black/5 px-2 py-0.5 rounded-full text-premium-gray"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-premium-black">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="E.g. No onions, extra spicy, etc."
              className="w-full h-24 p-4 bg-gray-50 border border-black/5 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Chef's Note (if recommended) */}
        {item.isChefRecommended && (
          <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05l-3.293 3.293a1 1 0 01-1.414 0l-3.293-3.293a1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gold-700">Chef&apos;s Note</h3>
            </div>
            <p className="text-xs text-gold-800 italic leading-relaxed">
              &quot;{item.chefNote || "This is one of my personal favorites. We use a special blend of spices that brings out the natural flavors of the ingredients. Highly recommended for those who enjoy a balanced yet bold taste."}&quot;
            </p>
          </div>
        )}

        {/* Reviews Section */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-premium-black uppercase tracking-wider">
              Reviews (24)
            </h3>
            <div className="flex items-center space-x-1">
              <div className="flex text-gold-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-premium-black">4.8</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Alex M.', rating: 5, comment: 'Absolutely delicious! The flavors were spot on.' },
              { name: 'Sarah J.', rating: 4, comment: 'Great portion size and very fresh.' },
            ].map((review, idx) => (
              <div key={idx} className="border-b border-black/5 pb-4 last:border-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-premium-black">{review.name}</span>
                  <div className="flex text-gold-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-premium-gray">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="font-bold text-sm text-premium-black uppercase tracking-wider">
              You Might Also Like
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {relatedItems.map((related) => (
                <div
                  key={related.id}
                  onClick={() => onRelatedItemClick?.(related)}
                  className="flex-shrink-0 w-32 space-y-2 cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    {related.primaryPhoto?.url ? (
                      <Image
                        src={related.primaryPhoto.url}
                        alt={related.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-premium-black line-clamp-1">
                      {related.name}
                    </h4>
                    <p className="text-[10px] font-bold text-gold-600">
                      {formatPrice(related.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </BottomSheet>
  );
};
