"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Home, ShoppingBag, Heart, FileText, Headphones } from "lucide-react";

export default function AppBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Don't show bottom nav on login/signup pages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password"
  ) {
    return null;
  }

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname === "/") return "home";
    if (pathname.includes("/restaurant")) return "menu";
    if (pathname.includes("/favorites")) return "favorites";
    if (pathname.includes("/orders")) return "orders";
    if (pathname.includes("/support")) return "support";
    return "home";
  };

  const activeTab = getActiveTab();

  // Preserve query parameters when navigating
  const buildUrl = (path: string) => {
    const params = new URLSearchParams();
    const table = searchParams.get("table");
    const token = searchParams.get("token");

    if (table) params.append("table", table);
    if (token) params.append("token", token);

    return params.toString() ? `${path}?${params.toString()}` : path;
  };

  const handleTabClick = (
    tab: "home" | "menu" | "favorites" | "orders" | "support",
  ) => {
    // Allow navigation without login (guest mode)
    switch (tab) {
      case "home":
        router.push(buildUrl("/"));
        break;
      case "menu":
        // Get restaurantId from current path or use default
        const restaurantId = "1"; // This will be extracted from token/user context
        router.push(buildUrl(`/restaurant/${restaurantId}`));
        break;
      case "favorites":
        router.push(buildUrl("/favorites"));
        break;
      case "orders":
        router.push(buildUrl("/orders"));
        break;
      case "support":
        router.push(buildUrl("/support"));
        break;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#e95322] rounded-t-[30px] h-[61px] flex items-center justify-around px-10 z-50">
      {/* Home */}
      <button
        onClick={() => handleTabClick("home")}
        className={`flex items-center justify-center transition-colors ${
          activeTab === "home" ? "text-white" : "text-[#ffdecf]"
        }`}
        aria-label="Home"
      >
        <Home className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Menu/Orders */}
      <button
        onClick={() => handleTabClick("menu")}
        className={`flex items-center justify-center transition-colors ${
          activeTab === "menu" ? "text-white" : "text-[#ffdecf]"
        }`}
        aria-label="Menu"
      >
        <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Favorites */}
      <button
        onClick={() => handleTabClick("favorites")}
        className={`flex items-center justify-center transition-colors ${
          activeTab === "favorites" ? "text-white" : "text-[#ffdecf]"
        }`}
        aria-label="Favorites"
      >
        <Heart
          className="w-6 h-6"
          strokeWidth={2.5}
          fill={activeTab === "favorites" ? "currentColor" : "none"}
        />
      </button>

      {/* Orders */}
      <button
        onClick={() => handleTabClick("orders")}
        className={`flex items-center justify-center transition-colors ${
          activeTab === "orders" ? "text-white" : "text-[#ffdecf]"
        }`}
        aria-label="Orders"
      >
        <FileText className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Support */}
      <button
        onClick={() => handleTabClick("support")}
        className={`flex items-center justify-center transition-colors ${
          activeTab === "support" ? "text-white" : "text-[#ffdecf]"
        }`}
        aria-label="Support"
      >
        <Headphones className="w-6 h-6" strokeWidth={2.5} />
      </button>
    </nav>
  );
}
