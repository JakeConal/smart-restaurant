"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/components/auth/AuthContext";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [greeting, setGreeting] = useState("");

  const tableId = searchParams.get("table");
  const token = searchParams.get("token");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleLogin = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    router.push(`/login?${params.toString()}`);
  };

  const handleSignup = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    router.push(`/signup?${params.toString()}`);
  };

  const handleBrowseMenu = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    const restaurantId = "1"; // This will be extracted from token/user context
    router.push(`/restaurant/${restaurantId}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5cb58] flex items-center justify-center pb-24">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5cb58] flex flex-col items-center justify-center px-9 pb-24">
      {user ? (
        // Welcome Message for Logged-in Users
        <div className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-5xl">👋</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{greeting}!</h1>
            <p className="text-2xl text-white font-medium">
              Welcome back,{" "}
              {user.firstName || user.lastName
                ? `${user.firstName || ""} ${user.lastName || ""}`
                : user.email}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mt-8">
            <p className="text-white text-lg mb-4">
              Ready to explore our menu?
            </p>
            <button
              onClick={handleBrowseMenu}
              className="bg-[#e95322] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d4441a] transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </div>
      ) : (
        // Login/Signup Prompt for Guests
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-7xl">🍽️</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Welcome!</h1>
            <p className="text-xl text-white/90">
              Discover delicious food at your fingertips
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={handleLogin}
              className="w-full bg-white text-[#e95322] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="w-full bg-[#e95322] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#d4441a] transition-colors"
            >
              Sign Up
            </button>
          </div>

          <div className="pt-4 border-t border-white/30">
            <button
              onClick={handleBrowseMenu}
              className="text-white text-lg hover:underline"
            >
              Continue as Guest →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5cb58]" />}>
      <HomeContent />
    </Suspense>
  );
}
