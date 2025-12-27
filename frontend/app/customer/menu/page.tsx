'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useGuestMenu } from '@/hooks/useGuestMenu';
import { useCart } from '@/hooks/useCart';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import {
  Skeleton,
  ErrorState,
  MenuHeader,
  CategoryTabs,
  QuickFilters,
  MenuItemCard,
  EmptyState,
  ItemDetailSheet,
  CartSheet,
  SortSheet,
  CartBar,
  ToastContainer,
  showToast,
} from '@/components/guest-menu';
import type { MenuItem, SelectedModifierDetail } from '@/types/menu';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('tableId') || searchParams.get('table') || '';
  const token = searchParams.get('token') || '';

  // Hooks
  const {
    table,
    categories,
    items,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    quickFilters,
    toggleQuickFilter,
    resetFilters,
    refetch,
  } = useGuestMenu({ tableId, token });

  const {
    cart,
    isLoaded: cartLoaded,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTax,
    getTotal,
  } = useCart(tableId);

  const { openSheet, closeSheet, isSheetOpen } = useBottomSheet();

  // Local states
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Handlers
  const handleItemClick = (item: MenuItem) => {
    if (item.status !== 'available') return;
    
    // If item has modifier groups, open detail sheet
    if (item.modifierGroups && item.modifierGroups.length > 0) {
      setSelectedItem(item);
      openSheet('item-detail');
    } else {
      // Add directly to cart with no modifiers
      addToCart(item, [], 1);
      showToast(`Added ${item.name} to tray`);
    }
  };

  const handleViewDetails = (item: MenuItem) => {
    if (item.status !== 'available') return;
    setSelectedItem(item);
    openSheet('item-detail');
  };

  const handleAddToCart = (
    item: MenuItem,
    modifiers: SelectedModifierDetail[],
    quantity: number
  ) => {
    addToCart(item, modifiers, quantity);
    showToast(`Added ${item.name} to tray`);
  };

  const handleCheckout = () => {
    alert('This is a demo! Your order will be sent to the kitchen shortly.');
    clearCart();
    closeSheet('cart');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (loading && !cartLoaded) {
    return <Skeleton />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  // Missing params
  if (!tableId || !token) {
    return (
      <ErrorState
        error="Invalid QR code. Please scan again or ask staff for assistance."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-premium-beige">
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <MenuHeader
        restaurantName={table?.tableNumber ? `Table ${table.tableNumber}` : 'Restaurant'}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSortClick={() => openSheet('sort')}
      />

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Quick Filters */}
      <QuickFilters filters={quickFilters} onToggle={toggleQuickFilter} />

      {/* Menu Items */}
      <main className="px-4 pb-32">
        {items.length === 0 ? (
          <EmptyState onResetFilters={resetFilters} />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddClick={handleItemClick}
                onCardClick={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Bar */}
      <CartBar
        itemCount={getTotalItems()}
        total={getSubtotal()}
        onClick={() => openSheet('cart')}
      />

      {/* Bottom Sheets */}
      <ItemDetailSheet
        isOpen={isSheetOpen('item-detail')}
        onClose={() => closeSheet('item-detail')}
        item={selectedItem}
        allItems={items}
        onAddToCart={handleAddToCart}
        onRelatedItemClick={setSelectedItem}
      />

      <CartSheet
        isOpen={isSheetOpen('cart')}
        onClose={() => closeSheet('cart')}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        subtotal={getSubtotal()}
        tax={getTax()}
        total={getTotal()}
        onCheckout={handleCheckout}
      />

      <SortSheet
        isOpen={isSheetOpen('sort')}
        onClose={() => closeSheet('sort')}
        selectedSort={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
}
