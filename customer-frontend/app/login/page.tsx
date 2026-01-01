"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { authApi } from "@/lib/api";
import { AuthResponse } from "@/lib/types";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token, setToken, login, loginAsGuest, isAuthenticated, customer } =
    useApp();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Get token from URL params (available during SSR)
  const urlToken = searchParams.get("token");

  // Handle token and auth from URL
  useEffect(() => {
    const authToken = searchParams.get("auth_token");
    const authUser = searchParams.get("auth_user");

    if (urlToken && !token) {
      setToken(urlToken);
    }

    // Handle Google OAuth callback
    if (authToken && authUser) {
      try {
        const user = JSON.parse(decodeURIComponent(authUser));
        login({ access_token: authToken, user });
        setShowWelcome(true);
      } catch (e) {
        console.error("Failed to parse auth user:", e);
      }
    }
  }, [searchParams, token, setToken, login, urlToken]);

  // Show welcome message and redirect after login
  useEffect(() => {
    if (showWelcome && isAuthenticated) {
      const timer = setTimeout(() => {
        const currentToken = token || searchParams.get("token");
        if (currentToken) {
          router.push(`/menu?token=${currentToken}`);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome, isAuthenticated, token, searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response: AuthResponse;

      if (activeTab === "login") {
        response = (await authApi.customerLogin(
          email,
          password,
        )) as AuthResponse;
      } else {
        response = (await authApi.customerSignup({
          email,
          password,
          firstName,
          lastName,
        })) as AuthResponse;
      }

      login(response);
      setShowWelcome(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const currentToken = token || searchParams.get("token");
    const authUrl = authApi.getGoogleAuthUrl({
      token: currentToken || undefined,
      redirect: "login",
    });
    window.location.href = authUrl;
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    const currentToken = token || searchParams.get("token");
    if (currentToken) {
      router.push(`/menu?token=${currentToken}`);
    }
  };

  // Show welcome message if authenticated
  if (showWelcome && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center fade-in">
          <div className="w-20 h-20 bg-[#fa4a0c] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Welcome{customer ? `, ${customer.firstName || customer.email}` : ""}
            !
          </h1>
          <p className="text-gray-600 mb-4">Redirecting to menu...</p>
          <div className="w-8 h-8 border-4 border-[#fa4a0c] border-t-transparent rounded-full spinner mx-auto"></div>
        </div>
      </div>
    );
  }

  // No token error
  if (!token && !searchParams.get("token") && !searchParams.get("auth_token")) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2">Invalid Access</h1>
          <p className="text-gray-600">
            Please scan a valid QR code at your table to access the menu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header with logo */}
      <div className="bg-white rounded-b-[30px] shadow-sm pt-12 pb-8 px-6">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#fa4a0c] to-[#ff7043] rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => setActiveTab("login")}
            className={`text-lg font-semibold pb-2 transition-colors ${
              activeTab === "login" ? "text-black" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`text-lg font-semibold pb-2 transition-colors ${
              activeTab === "signup" ? "text-black" : "text-gray-400"
            }`}
          >
            Sign-up
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <div
            className={`h-[3px] w-32 bg-[#fa4a0c] rounded-full transition-transform duration-300 ${
              activeTab === "signup" ? "translate-x-16" : "-translate-x-12"
            }`}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 pt-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {activeTab === "signup" && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-500 font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full py-2 border-b border-gray-200 bg-transparent focus:border-[#fa4a0c] transition-colors"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full py-2 border-b border-gray-200 bg-transparent focus:border-[#fa4a0c] transition-colors"
                placeholder="Doe"
                required
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm text-gray-500 font-semibold mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 border-b border-gray-200 bg-transparent focus:border-[#fa4a0c] transition-colors"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-500 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 border-b border-gray-200 bg-transparent focus:border-[#fa4a0c] transition-colors"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        {activeTab === "login" && (
          <Link
            href={`/forgot-password${urlToken ? `?token=${urlToken}` : ""}`}
            className="text-[#fa4a0c] text-sm font-semibold"
          >
            Forgot password?
          </Link>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-[#fa4a0c] text-white font-semibold rounded-full mt-8 btn-press hover:bg-[#e04009] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full spinner"></div>
              Loading...
            </span>
          ) : activeTab === "login" ? (
            "Login"
          ) : (
            "Sign up"
          )}
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#f2f2f2] text-gray-500">
              or continue with
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex-1 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors btn-press"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <span className="font-medium">Google</span>
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="flex-1 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors btn-press"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="font-medium">Guest</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#fa4a0c] border-t-transparent rounded-full spinner"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
