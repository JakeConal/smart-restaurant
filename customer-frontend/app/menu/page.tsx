"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui";

function MenuPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);
  const [qrCodeText, setQrCodeText] = useState<string | null>(null);
  const [isValidQr, setIsValidQr] = useState<boolean>(false);
  const [showAuthChoice, setShowAuthChoice] = useState<boolean>(false);

  useEffect(() => {
    const table = searchParams.get("table");
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (table && token) {
      // Decode the JWT token to get restaurantId
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const restaurantIdFromToken = payload.restaurantId;

        if (restaurantIdFromToken && table) {
          setRestaurantId(restaurantIdFromToken);
          setTableId(table);
          setIsValidQr(true);

          // If user just logged in, redirect to restaurant menu
          if (user === "logged_in") {
            router.push(`/restaurant/${restaurantIdFromToken}?table=${table}`);
          } else {
            setShowAuthChoice(true);
          }
        } else {
          setIsValidQr(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsValidQr(false);
      }
    }
  }, [searchParams, router]);

  const handleLogin = () => {
    // Redirect to login page with table and token for return
    router.push(`/login?table=${tableId}&token=${searchParams.get("token")}`);
  };

  const handleGuest = () => {
    // Proceed to menu as guest
    router.push(
      `/restaurant/${restaurantId}?table=${tableId}&token=${searchParams.get("token")}&mode=guest`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Smart Restaurant
          </h1>

          {isValidQr && restaurantId && tableId ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold">
                  ✓ QR Code Scanned Successfully!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Restaurant: {restaurantId} | Table: {tableId}
                </p>
              </div>

              {showAuthChoice && (
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    How would you like to continue?
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Login to Your Account
                      </h3>
                      <p className="text-blue-700 text-sm mb-4">
                        Access your loyalty points, vouchers, and order history
                      </p>
                      <Button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Login
                      </Button>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Continue as Guest
                      </h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Browse menu and place orders without an account
                      </p>
                      <Button
                        onClick={handleGuest}
                        variant="secondary"
                        className="w-full"
                      >
                        Enter as Guest
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : qrCodeText ? (
            <div className="mb-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-semibold">✗ Invalid QR Code</p>
                <p className="text-red-600 text-sm mt-1">
                  The scanned QR code is not valid.
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-semibold">Scan a QR Code</p>
                <p className="text-blue-600 text-sm mt-1">
                  Use your camera to scan a table QR code to view the menu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuPageContent />
    </Suspense>
  );
}
