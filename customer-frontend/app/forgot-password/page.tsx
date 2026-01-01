"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Preserve query parameters
  const tableId = searchParams.get("table");
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement forgot password API call
      // For now, just show success message
      alert("Password reset functionality will be implemented soon");

      // Redirect to login with preserved params
      const params = new URLSearchParams();
      if (tableId) params.append("table", tableId);
      if (token) params.append("token", token);

      router.push(`/login?${params.toString()}`);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buildLoginLink = () => {
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    return `/login?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#f5cb58] flex flex-col">
      {/* Status Bar */}
      <div className="px-6 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[#391713] text-[13px] font-medium">16:04</span>
        </div>
      </div>

      {/* Top Section with Yellow Background */}
      <div className="px-6 pt-8 pb-8 relative">
        <Link
          href={buildLoginLink()}
          className="absolute left-8 top-12 text-[#e95322]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[#f8f8f8] font-bold text-[28px] text-center">
          Set Password
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 bg-[#f5f5f5] rounded-t-[30px] px-9 pt-12 pb-24">
        <p className="text-[#252525] text-[14px] font-light leading-[14px] mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Password Field */}
          <div>
            <label className="block text-[#252525] font-medium text-[20px] mb-4 capitalize">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                className="w-full bg-[#f3e9b5] border-0 rounded-[15px] px-4 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
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

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[#252525] font-medium text-[20px] mb-4 capitalize">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="*************"
                className="w-full bg-[#f3e9b5] border-0 rounded-[15px] px-4 py-3 text-[#391713] text-[20px] placeholder:text-[#391713] placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#e95322]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e95322]"
              >
                {showConfirmPassword ? (
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[198px] mx-auto block bg-[#e95322] hover:bg-[#d4441a] border border-[#e95322] text-white font-medium text-[17px] leading-[20px] px-3 py-2 rounded-[100px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Create New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
