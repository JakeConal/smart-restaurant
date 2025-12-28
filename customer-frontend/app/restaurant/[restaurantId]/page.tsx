"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui";
import { ArrowLeft, ShoppingCart, User, ChefHat } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: "available" | "unavailable" | "sold_out";
  isChefRecommended?: boolean;
  categoryId?: string;
  categoryName?: string;
  primaryPhoto?: string;
  modifierGroups?: any[];
  canOrder?: boolean;
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

function RestaurantMenuPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const restaurantId = params.restaurantId as string;
  const tableId = searchParams.get("table");
  const token = searchParams.get("token");
  const mode = searchParams.get("mode"); // "guest" or undefined for logged in

  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!tableId || !token) {
        setError("Missing table or token information");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/menu?table=${tableId}&token=${token}`,
        );
        const data = await response.json();

        if (data.success) {
          setTableInfo(data.table);
          setMenuData(data.menu);
          setMenuItems(data.menu.items || []);
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

    fetchMenu();
  }, [tableId, token]);

  const handleBack = () => {
    window.history.back();
  };

  const handleAddToCart = (item: MenuItem) => {
    // TODO: Add to cart logic
    setCartCount((prev) => prev + 1);
    console.log("Added to cart:", item);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <ChefHat className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-medium">Unable to load menu</p>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Restaurant Menu
                </h1>
                <p className="text-sm text-gray-600">
                  {tableInfo
                    ? `Table ${tableInfo.tableNumber}`
                    : `Table ${tableId}`}{" "}
                  • {mode === "guest" ? "Guest Mode" : "Logged In"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {mode !== "guest" && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Welcome back!</span>
                </div>
              )}

              <Button variant="secondary" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {menuData?.categories.map((category) => {
          const categoryItems = menuItems.filter(
            (item) => item.categoryId === category.id,
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-gray-600 mb-4">{category.description}</p>
              )}

              <div className="grid gap-4">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          {item.isChefRecommended && (
                            <div className="flex items-center space-x-1 text-orange-600">
                              <ChefHat className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Chef's Choice
                              </span>
                            </div>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-gray-600 text-sm mb-2">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-4">
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              item.status === "available"
                                ? "bg-green-100 text-green-800"
                                : item.status === "sold_out"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status === "available"
                              ? "Available"
                              : item.status === "sold_out"
                                ? "Sold Out"
                                : "Unavailable"}
                          </span>
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <div className="text-lg font-bold text-gray-900 mb-3">
                          ${item.price.toFixed(2)}
                        </div>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.canOrder}
                          className="w-24"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {(!menuData?.categories || menuData.categories.length === 0) && (
          <div className="text-center py-12">
            <ChefHat className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No menu items available</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function RestaurantMenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RestaurantMenuPageContent />
    </Suspense>
  );
}
