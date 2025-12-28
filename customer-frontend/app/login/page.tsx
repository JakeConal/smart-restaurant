"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, useToast } from "@/shared/components/ui";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

function CustomerLoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const qrCodeText = searchParams.get("qr");
  const table = searchParams.get("table");
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // TODO: Implement customer login
        console.log("Customer login:", { email, password });

        // For now, simulate successful login
        toast.success("Login successful!");

        // Redirect back to menu with user context
        if (qrCodeText) {
          // Decode QR to get restaurant info and redirect to restaurant menu
          try {
            const decoded = atob(qrCodeText);
            const [restId, tblId] = decoded.split(":");
            router.push(`/restaurant/${restId}?table=${tblId}`);
          } catch (error) {
            router.push(`/menu?qr=${qrCodeText}&user=logged_in`);
          }
        } else if (table && token) {
          // Decode token to get restaurant info
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const restaurantIdFromToken = payload.restaurantId;
            router.push(
              `/restaurant/${restaurantIdFromToken}?table=${table}&token=${token}`,
            );
          } catch (error) {
            router.push(`/menu?table=${table}&token=${token}&user=logged_in`);
          }
        } else {
          router.push("/menu");
        }
      } else {
        // TODO: Implement customer signup
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        console.log("Customer signup:", { email, password, restaurantName });

        // For now, simulate successful signup
        toast.success("Account created successfully!");

        // Redirect back to menu with user context
        if (qrCodeText) {
          // Decode QR to get restaurant info and redirect to restaurant menu
          try {
            const decoded = atob(qrCodeText);
            const [restId, tblId] = decoded.split(":");
            router.push(`/restaurant/${restId}?table=${tblId}`);
          } catch (error) {
            router.push(`/menu?qr=${qrCodeText}&user=logged_in`);
          }
        } else if (table && token) {
          // Decode token to get restaurant info
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const restaurantIdFromToken = payload.restaurantId;
            router.push(
              `/restaurant/${restaurantIdFromToken}?table=${table}&token=${token}`,
            );
          } catch (error) {
            router.push(`/menu?table=${table}&token=${token}&user=logged_in`);
          }
        } else {
          router.push("/menu");
        }
      }
    } catch (error) {
      toast.error(isLogin ? "Login failed" : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (qrCodeText) {
      router.push(`/menu?qr=${qrCodeText}`);
    } else {
      router.push("/menu");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name (Optional)
                  </label>
                  <Input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="Enter restaurant name for personalized experience"
                    className="w-full"
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? isLogin
                  ? "Signing In..."
                  : "Creating Account..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Why login?</strong> Earn loyalty points, redeem
                vouchers, and track your order history across restaurants.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerLoginPageContent />
    </Suspense>
  );
}
