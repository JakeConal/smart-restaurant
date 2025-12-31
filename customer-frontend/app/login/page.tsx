"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, useToast } from "@/shared/components/ui";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/shared/components/auth/AuthContext";

function CustomerLoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const { login, signup, googleLogin, isLoading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const qrCodeText = searchParams.get("qr");
  const table = searchParams.get("table");
  const token = searchParams.get("auth_token");
  const userParam = searchParams.get("auth_user");

  useEffect(() => {
    // Handle Google auth redirect
    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        toast.success("Login successful!");

        // Redirect back to menu
        if (qrCodeText) {
          try {
            const decoded = atob(qrCodeText);
            const [restId, tblId] = decoded.split(":");
            router.push(`/restaurant/${restId}?table=${tblId}`);
          } catch (error) {
            router.push(`/menu?qr=${qrCodeText}&user=logged_in`);
          }
        } else if (table) {
          router.push(`/menu?table=${table}&token=${token}&user=logged_in`);
        } else {
          router.push("/menu");
        }
      } catch (error) {
        toast.error("Failed to process login");
      }
    }
  }, [token, userParam, qrCodeText, table, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login({ email, password });

        // Redirect back to menu with user context
        const qrCodeText = searchParams.get("qr");
        const table = searchParams.get("table");
        const token = searchParams.get("token");

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
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await signup({ email, password, firstName, lastName });

        // Redirect back to menu with user context
        const qrCodeText = searchParams.get("qr");
        const table = searchParams.get("table");
        const token = searchParams.get("token");

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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="First name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="Last name"
                      className="w-full"
                    />
                  </div>
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

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={googleLogin}
                variant="secondary"
                className="w-full"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>

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
