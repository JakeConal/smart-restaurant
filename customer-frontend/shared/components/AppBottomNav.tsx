"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, ClipboardList, User } from "lucide-react";

export default function AppBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active tab based on pathname
  const activeTab = (pathname === "/profile" ? "profile" : "home") as
    | "home"
    | "search"
    | "orders"
    | "profile";

  const handleTabClick = (tab: "home" | "search" | "orders" | "profile") => {
    if (tab === "home") {
      if (pathname.includes("/restaurant")) {
        // Stay on restaurant, but since it's layout, perhaps do nothing or scroll to top
        window.scrollTo(0, 0);
      } else {
        router.back();
      }
    } else if (tab === "profile") {
      router.push("/profile");
    } else {
      // search and orders go to menu for now
      router.push("/menu");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-2">
      <div className="flex justify-around items-center">
        <button
          onClick={() => handleTabClick("home")}
          className={`flex flex-col items-center ${
            activeTab === "home" ? "text-orange-500" : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => handleTabClick("search")}
          className={`flex flex-col items-center relative ${
            activeTab === "search" ? "text-orange-500" : "text-gray-400"
          }`}
        >
          <Search className="w-6 h-6 mb-1" />
          <span className="text-xs">Search</span>
        </button>
        <button
          onClick={() => handleTabClick("orders")}
          className={`flex flex-col items-center ${
            activeTab === "orders" ? "text-orange-500" : "text-gray-400"
          }`}
        >
          <ClipboardList className="w-6 h-6 mb-1" />
          <span className="text-xs">Orders</span>
        </button>
        <button
          onClick={() => handleTabClick("profile")}
          className={`flex flex-col items-center ${
            activeTab === "profile" ? "text-orange-500" : "text-gray-400"
          }`}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
    </nav>
  );
}
