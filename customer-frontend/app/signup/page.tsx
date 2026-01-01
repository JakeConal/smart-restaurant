"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/components/auth/AuthContext";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
  });
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

        // Redirect to restaurant page with preserved params
        const restaurantId = "1";
        const params = new URLSearchParams();
        if (tableId) params.append("table", tableId);
        if (token) params.append("token", token);

        router.push(`/restaurant/${restaurantId}?${params.toString()}`);
      } catch (err) {
        setError("Failed to complete authentication");
      }
    }
  }, [authToken, authUser, tableId, token, router]);

  useEffect(() => {
    // If already logged in, redirect
    if (user && !authToken) {
      const restaurantId = "1";
      const params = new URLSearchParams();
      if (tableId) params.append("table", tableId);
      if (token) params.append("token", token);

      router.push(`/restaurant/${restaurantId}?${params.toString()}`);
    }
  }, [user, tableId, token, router, authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      await signup({
        email: formData.email,
        password: formData.password,
        firstName,
        lastName,
      });

      // Redirect to restaurant page with preserved params
      const restaurantId = "1";
      const params = new URLSearchParams();
      if (tableId) params.append("table", tableId);
      if (token) params.append("token", token);

      router.push(`/restaurant/${restaurantId}?${params.toString()}`);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Build OAuth URL with state to preserve query params
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    params.append("redirect", "menu");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    window.location.href = `${apiUrl}/auth/customer/google?${params.toString()}`;
  };

  const buildLoginLink = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    return `/login?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#f5cb58] flex flex-col">
      {/* Top Section with Yellow Background */}
      <div className="px-6 pt-8 pb-8">
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
        <h1 className="text-[#f8f8f8] font-bold text-[28px] text-center">
          New Account
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 bg-[#f5f5f5] rounded-t-[30px] px-9 pt-8 pb-24 overflow-y-auto">
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-2">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-[#f3e9b5] border border-[#e9f6fe] rounded-[15px] px-3 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*************"
                className="w-full bg-[#f3e9b5] border border-[#e9f6fe] rounded-[15px] px-3 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
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

          {/* Email Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="w-full bg-[#f3e9b5] border border-[#e9f6fe] rounded-[15px] px-3 py-3 text-[#391713] text-[20px] lowercase placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="+ 123 456 789"
              className="w-full bg-[#f3e9b5] border border-[#e9f6fe] rounded-[15px] px-3 py-3 text-[#391713] text-[20px] lowercase placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label className="block text-[#391713] font-medium text-[20px] mb-2">
              Date of birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-[#f3e9b5] border border-[#e9f6fe] rounded-[15px] px-3 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Terms and Privacy */}
          <p className="text-[#391713] text-[12px] text-center font-light leading-normal">
            By continuing, you agree to{" "}
            <span className="text-[#e95322] font-medium">Terms of Use</span> and{" "}
            <span className="text-[#e95322] font-medium">Privacy Policy.</span>
          </p>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e95322] hover:bg-[#d4441a] text-white font-medium text-[24px] py-3 rounded-[30px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4">
          <span className="text-[#391713] text-[12px] font-light">
            or sign up with
          </span>
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignup}
          className="mx-auto block w-[34px] h-[34px] bg-[#ffdecf] rounded-[10px] flex items-center justify-center hover:bg-[#ffcdb8] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
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

        {/* Log In Link */}
        <p className="text-center mt-6 text-[12px]">
          <span className="text-[#391713] font-light">
            Already have an account?{" "}
          </span>
          <Link href={buildLoginLink()} className="text-[#e95322] font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
