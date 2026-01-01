"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Heart, Star, ChefHat } from "lucide-react";
import type { MenuItemPhoto } from "@/shared/types/menu";
import { useAuth } from "@/shared/components/auth/AuthContext";
import { useMenu } from "@/shared/components/menu/MenuContext";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: "available" | "unavailable" | "sold_out";
  isChefRecommended?: boolean;
  categoryId?: string;
  categoryName?: string;
  primaryPhotoId?: string;
  modifierGroups?: ModifierGroup[];
  canOrder?: boolean;
  rating?: number;
  reviewCount?: number;
  popularityScore?: number;
}

interface ModifierGroup {
  id: string;
  name: string;
  description?: string;
  type: "single" | "multiple";
  minSelections?: number;
  maxSelections?: number;
  required: boolean;
  options: ModifierOption[];
}

interface ModifierOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  isDefault?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
}

interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
  pagination: any;
}

// Category icons mapping
const categoryIcons: Record<string, string> = {
  snacks: "🍟",
  meal: "🍽️",
  vegan: "🥗",
  dessert: "🧁",
  drinks: "🥤",
};

function RestaurantMenuPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const {
    menuData,
    allMenuItems,
    bestSellers,
    recommended,
    tableInfo,
    loading: contextLoading,
    error: contextError,
    photoUrls,
    isCacheValid,
    setMenuCache,
  } = useMenu();

  const restaurantId = params.restaurantId as string;
  const tableId = searchParams.get("table");
  const token = searchParams.get("token");

  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(!isCacheValid());
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch menu data with caching
  useEffect(() => {
    const fetchMenu = async () => {
      // Use cache if valid
      if (isCacheValid() && menuData && allMenuItems.length > 0) {
        setLoading(false);
        setFilteredItems(allMenuItems);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/menu?table=${tableId}&token=${token}`,
        );
        const data = await response.json();

        if (data.success) {
          // Fetch photo URLs
          const urls: Record<string, string> = {};
          const items = data.menu.items || [];

          for (const item of items) {
            if (item.primaryPhotoId) {
              try {
                const photoResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/menu/items/${item.id}/photos/${item.primaryPhotoId}`,
                );
                const blob = await photoResponse.blob();
                urls[item.id] = URL.createObjectURL(blob);
              } catch (error) {
                console.error(
                  `Failed to load photo for item ${item.id}:`,
                  error,
                );
              }
            }
          }

          // Store in cache
          setMenuCache({
            menuData: data.menu,
            tableInfo: data.table,
            photoUrls: urls,
          });

          setFilteredItems(items);
          setError(null);
        } else {
          setError(data.message || "Failed to load menu");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (tableId && token) {
      fetchMenu();
    }
  }, [
    tableId,
    token,
    isCacheValid,
    menuData,
    allMenuItems.length,
    setMenuCache,
  ]);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = [...allMenuItems];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.categoryId === selectedCategory,
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, allMenuItems]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const getPhotoUrl = (item: MenuItem) => {
    return photoUrls[item.id] || "https://via.placeholder.com/150";
  };

  const handleBack = () => {
    window.history.back();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5cb58] flex items-center justify-center p-4 pb-24">
        <div className="text-center">
          <div className="text-white mb-4">
            <ChefHat className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-medium">Unable to load menu</p>
          </div>
          <p className="text-white/90 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-[#e95322] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5cb58] flex items-center justify-center pb-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5cb58] pb-24">
      {/* Header Section */}
      <div className="px-9 pt-16 pb-6">
        {/* Search Bar and Action Buttons */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search Bar */}
          <div className="flex-1 bg-white rounded-[30px] px-4 py-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#676767] text-[15px] font-light outline-none placeholder:text-[#676767]"
            />
            <Search className="w-5 h-5 text-[#676767]" />
          </div>

          {/* Shopping Cart Button */}
          <button className="bg-[#f5f5f5] rounded-[10px] w-8 h-8 flex items-center justify-center relative">
            <ShoppingCart className="w-5 h-5 text-[#e95322]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e95322] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            className="bg-[#f5f5f5] rounded-[10px] w-8 h-8 flex items-center justify-center"
          >
            <User className="w-5 h-5 text-[#391713]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#f5f5f5] rounded-t-[30px] min-h-screen pt-8 px-9">
        {/* Categories Row */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {menuData?.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex-shrink-0 ${
                selectedCategory === category.id ? "opacity-100" : "opacity-70"
              }`}
            >
              <div
                className={`${
                  selectedCategory === category.id
                    ? "bg-[#f5cb58]"
                    : "bg-[#f3e9b5]"
                } rounded-[30px] w-12 h-16 flex flex-col items-center justify-center transition-colors`}
              >
                <span className="text-2xl mb-1">
                  {categoryIcons[category.name.toLowerCase()] || "🍴"}
                </span>
              </div>
              <p className="text-[#391713] text-[12px] text-center mt-2 capitalize">
                {category.name}
              </p>
            </button>
          ))}
        </div>

        {/* Separator Line */}
        <div className="h-px bg-gray-300 mb-6" />

        {/* Best Seller Section */}
        {bestSellers.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#391713] font-medium text-[20px]">
                Best Seller
              </h2>
              <button className="text-[#e95322] text-[12px] font-semibold">
                View All
              </button>
            </div>

            {/* Best Seller Items Grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {bestSellers.map((item) => (
                <div key={item.id} className="relative">
                  <div className="relative rounded-[20px] overflow-hidden h-28 bg-gray-200">
                    <img
                      src={getPhotoUrl(item)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Price Tag */}
                    <div className="absolute bottom-0 left-0 bg-[#e95322] rounded-tl-[30px] rounded-br-[20px] px-2 py-1">
                      <span className="text-white text-[12px] font-normal">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-28 left-2 bg-white rounded-[30px] px-2 py-0.5 flex items-center gap-1">
                    <span className="text-[#391713] text-[12px] font-normal">
                      5.0
                    </span>
                    <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                  </div>
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-1 right-1"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favorites.has(item.id)
                          ? "fill-[#e95322] text-[#e95322]"
                          : "fill-transparent text-[#e95322]"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Banner/Promo Section */}
        <div className="relative bg-gradient-to-r from-[#e95322] to-[#d4441a] rounded-[20px] h-32 mb-8 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-start px-6">
            <div className="text-white">
              <p className="text-[16px] font-normal mb-2">
                Experience our delicious new dish
              </p>
              <p className="text-[32px] font-bold">30% OFF</p>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -bottom-6 -left-4 w-14 h-14 bg-yellow-300 rounded-full opacity-30" />
          <div className="absolute -top-8 left-28 w-14 h-14 bg-yellow-300 rounded-full opacity-20" />
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-5 h-1 bg-[#e95322] rounded-full" />
          <div className="w-5 h-1 bg-[#f3e9b5] rounded-full" />
          <div className="w-5 h-1 bg-[#f3e9b5] rounded-full" />
          <div className="w-5 h-1 bg-[#f3e9b5] rounded-full" />
          <div className="w-5 h-1 bg-[#f3e9b5] rounded-full" />
        </div>

        {/* Recommend Section */}
        {recommended.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[#391713] font-medium text-[20px] mb-4">
              Recommend
            </h2>

            {/* Recommended Items */}
            <div className="grid grid-cols-2 gap-4">
              {recommended.map((item) => (
                <div key={item.id} className="relative">
                  <div className="relative rounded-[20px] overflow-hidden h-36 bg-gray-200">
                    <img
                      src={getPhotoUrl(item)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 flex items-center gap-1">
                      <span className="text-[#391713] text-[12px] font-normal">
                        5.0
                      </span>
                      <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    </div>
                    {/* Price Tag */}
                    <div className="absolute bottom-0 left-0 bg-[#e95322] rounded-tl-[30px] rounded-br-[20px] px-3 py-1.5">
                      <span className="text-white text-[12px] font-normal">
                        ${item.price.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-1 right-1"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favorites.has(item.id)
                          ? "fill-[#e95322] text-[#e95322]"
                          : "fill-transparent text-[#e95322]"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Items Section */}
        {filteredItems.length > 0 && (
          <div className="pb-8">
            <h2 className="text-[#391713] font-medium text-[20px] mb-4">
              {selectedCategory ? "Filtered Items" : "All Items"}
            </h2>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.slice(0, 10).map((item) => (
                <div key={item.id} className="relative">
                  <div className="relative rounded-[20px] overflow-hidden h-36 bg-gray-200">
                    <img
                      src={getPhotoUrl(item)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Price Tag */}
                    <div className="absolute bottom-0 left-0 bg-[#e95322] rounded-tl-[30px] rounded-br-[20px] px-3 py-1.5">
                      <span className="text-white text-[12px] font-normal">
                        ${item.price.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {/* Item Name */}
                  <p className="text-[#391713] text-[14px] mt-2 truncate">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-[#676767] text-lg">No items found</p>
          </div>
        )}
      </div>

      {/* Add custom styles for scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default function RestaurantMenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5cb58] flex items-center justify-center pb-24">
          Loading...
        </div>
      }
    >
      <RestaurantMenuPageContent />
    </Suspense>
  );
}
