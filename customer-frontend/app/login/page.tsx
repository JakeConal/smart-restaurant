"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/components/auth/AuthContext";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Preserve query parameters
  const tableId = searchParams.get("table");
  const token = searchParams.get("token");
  const authToken = searchParams.get("auth_token");
  const authUser = searchParams.get("auth_user");

  useEffect(() => {
    // Handle OAuth callback
    if (authToken && authUser) {
      try {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("authUser", authUser);

        // Force AuthContext to update by triggering a re-mount
        window.location.href =
          window.location.pathname + window.location.search;
      } catch (err) {
        setError("Failed to complete authentication");
      }
    }
  }, [authToken, authUser]);

  useEffect(() => {
    // If already logged in, redirect
    if (user && !authToken) {
      const restaurantId = "1"; // You'll need to extract this from the token
      const params = new URLSearchParams();
      if (tableId) params.append("table", tableId);
      if (token) params.append("token", token);

      router.push(`/restaurant/${restaurantId}?${params.toString()}`);
    }
  }, [user, tableId, token, router, authToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });

      // Redirect to restaurant page with preserved params
      const restaurantId = "1"; // You'll need to extract this from the token
      const params = new URLSearchParams();
      if (tableId) params.append("table", tableId);
      if (token) params.append("token", token);

      router.push(`/restaurant/${restaurantId}?${params.toString()}`);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Build OAuth URL with state to preserve query params
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    params.append("redirect", "login");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    window.location.href = `${apiUrl}/auth/customer/google?${params.toString()}`;
  };

  const buildSignupLink = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    return `/signup?${params.toString()}`;
  };

  const buildForgotPasswordLink = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    return `/forgot-password?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#f5cb58] flex flex-col">
      {/* Top Section with Yellow Background */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => {
              const restaurantId = "1";
              const params = new URLSearchParams();
              if (tableId) params.append("table", tableId);
              if (token) params.append("token", token);
              router.push(`/restaurant/${restaurantId}?${params.toString()}`);
            }}
            className="text-[#f8f8f8] hover:text-[#e95322] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-[#f8f8f8] font-bold text-[28px] text-center mb-2">
          Hello!
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 bg-[#f5f5f5] rounded-t-[30px] px-9 pt-12 pb-24">
        <h2 className="text-[#391713] font-semibold text-[24px] mb-12">
          Welcome
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-3">
              Email or Mobile Number
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="w-full bg-[#f3e9b5] border-0 rounded-[13px] px-4 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                className="w-full bg-[#f3e9b5] border-0 rounded-[13px] px-4 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e95322]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href={buildForgotPasswordLink()}
              className="text-[#e95322] font-medium text-[14px] capitalize"
            >
              forget password
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e95322] hover:bg-[#d4441a] text-white font-medium text-[24px] py-3 rounded-[30px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-6">
          <span className="text-[#391713] text-[14px] font-light">or</span>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          className="mx-auto block w-[47px] h-[47px] bg-[#ffdecf] rounded-[10px] flex items-center justify-center hover:bg-[#ffcdb8] transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-8 text-[14px]">
          <span className="text-[#391713] font-light">
            Don't have an account?{" "}
          </span>
          <Link href={buildSignupLink()} className="text-[#e95322] font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
