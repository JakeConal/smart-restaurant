"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, ArrowLeft } from "lucide-react";
import { useAuth } from "@/shared/components/auth/AuthContext";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  isGoogleLogin: boolean;
  googleProfilePicUrl?: string;
  hasProfilePicture: boolean;
}

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logout: authLogout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [profileBlob, setProfileBlob] = useState<Blob | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Preserve query parameters
  const tableId = searchParams.get("table");
  const token = searchParams.get("token");
  const qrCode = searchParams.get("qr");

  // Generate composite avatar from user initials
  const generateCompositeAvatar = (firstName: string, lastName: string) => {
    const initials =
      `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Generate a color based on initials
    const hash = initials
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#e95322", "#f5cb58", "#FF6B6B", "#4ECDC4", "#45B7D1"];
    const bgColor = colors[hash % colors.length];

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, 128, 128);

    return canvas.toDataURL();
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          },
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Profile fetch error:", response.status, errorData);
          throw new Error(
            `Failed to fetch profile: ${response.status} ${errorData}`,
          );
        }

        const data = await response.json();
        setProfile(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          phoneNumber: data.phoneNumber,
        });

        // Set avatar
        if (data.hasProfilePicture) {
          // Fetch blob from server
          const picResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/picture`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            },
          );
          if (picResponse.ok) {
            const blob = await picResponse.blob();
            setProfileBlob(blob);
            setAvatarUrl(URL.createObjectURL(blob));
          }
        } else if (data.isGoogleLogin && data.googleProfilePicUrl) {
          // Use Google profile picture
          setAvatarUrl(data.googleProfilePicUrl);
        } else {
          // Generate composite avatar
          setAvatarUrl(generateCompositeAvatar(data.firstName, data.lastName));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (avatarUrl && avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formDataObj = new FormData();
      formDataObj.append("file", file);

      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/picture`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${authToken}` },
          body: formDataObj,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload picture");
      }

      // Create blob URL for local preview
      const blob = new Blob([file], { type: file.type });
      setProfileBlob(blob);

      // Revoke old blob URL if exists
      if (avatarUrl && avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }

      setAvatarUrl(URL.createObjectURL(blob));

      // Update profile state
      if (profile) {
        setProfile({ ...profile, hasProfilePicture: true });
      }

      setSuccessMessage("Profile picture updated!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error uploading avatar:", err);
      setError("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUploading(true);
      setError("");

      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      setProfile({
        ...profile,
        ...updatedData,
      } as UserProfile);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // If name changed and no custom picture, regenerate avatar
      if (
        !profile?.hasProfilePicture &&
        !profile?.googleProfilePicUrl &&
        (formData.firstName !== profile?.firstName ||
          formData.lastName !== profile?.lastName)
      ) {
        const newAvatar = generateCompositeAvatar(
          formData.firstName || "",
          formData.lastName || "",
        );
        if (avatarUrl && avatarUrl.startsWith("blob:")) {
          URL.revokeObjectURL(avatarUrl);
        }
        setAvatarUrl(newAvatar);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    // Clean up blob URLs
    if (avatarUrl && avatarUrl.startsWith("blob:")) {
      URL.revokeObjectURL(avatarUrl);
    }

    // Use AuthContext logout (clears token and user)
    authLogout();

    // Preserve query parameters for redirect back to table
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    if (qrCode) params.append("qr", qrCode);

    const redirectUrl = `/login${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(redirectUrl);
  };

  const handleBack = () => {
    // Navigate back to restaurant page with preserved params
    const restaurantId = "1"; // You might want to get this from the token
    const params = new URLSearchParams();
    if (tableId) params.append("table", tableId);
    if (token) params.append("token", token);
    if (qrCode) params.append("qr", qrCode);

    router.push(`/restaurant/${restaurantId}?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5cb58] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e95322] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#391713]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f5cb58] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#391713]">{error || "Failed to load profile"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5cb58] pb-24">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="text-[#f8f8f8] hover:text-[#e95322] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-center text-[28px] font-bold text-[#f8f8f8]">
          My profile
        </h1>
      </div>

      {/* Avatar Section */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="w-[127px] h-[127px] rounded-[20px] overflow-hidden bg-white border-4 border-[#f8f8f8] shadow-lg">
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Camera Button */}
          <label
            className={`absolute bottom-0 right-0 bg-[#e95322] rounded-[10px] w-[26px] h-[26px] flex items-center justify-center cursor-pointer hover:bg-[#d84316] transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form Section */}
      <div className="px-[35px] space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-[20px] font-medium text-[#391713] mb-2">
            Full Name
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName || ""}
              onChange={(e) =>
                handleInputChange(
                  "firstName" as keyof UserProfile,
                  e.target.value,
                )
              }
              disabled={!isEditing}
              className="flex-1 h-[45px] bg-[#f3e9b5] rounded-[15px] px-6 text-[20px] text-[#391713] font-normal placeholder-[#391713] focus:outline-none focus:ring-2 focus:ring-[#e95322] disabled:opacity-70"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName || ""}
              onChange={(e) =>
                handleInputChange(
                  "lastName" as keyof UserProfile,
                  e.target.value,
                )
              }
              disabled={!isEditing}
              className="flex-1 h-[45px] bg-[#f3e9b5] rounded-[15px] px-6 text-[20px] text-[#391713] font-normal placeholder-[#391713] focus:outline-none focus:ring-2 focus:ring-[#e95322] disabled:opacity-70"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[20px] font-medium text-[#391713] mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) =>
              handleInputChange(
                "dateOfBirth" as keyof UserProfile,
                e.target.value,
              )
            }
            disabled={!isEditing}
            className="w-full h-[45px] bg-[#f3e9b5] rounded-[15px] px-6 text-[20px] text-[#391713] font-normal placeholder-[#391713] focus:outline-none focus:ring-2 focus:ring-[#e95322] disabled:opacity-70"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[20px] font-medium text-[#391713] mb-2">
            Email
          </label>
          <input
            type="email"
            value={profile.email}
            disabled={true}
            className="w-full h-[45px] bg-[#f3e9b5] rounded-[15px] px-6 text-[20px] text-[#391713] font-normal placeholder-[#391713] focus:outline-none focus:ring-2 focus:ring-[#e95322] opacity-70 cursor-not-allowed"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[20px] font-medium text-[#391713] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phoneNumber || ""}
            onChange={(e) =>
              handleInputChange(
                "phoneNumber" as keyof UserProfile,
                e.target.value,
              )
            }
            placeholder="+1 (555) 123-4567"
            disabled={!isEditing}
            className="w-full h-[45px] bg-[#f3e9b5] rounded-[15px] px-6 text-[20px] text-[#391713] font-normal placeholder-[#391713] focus:outline-none focus:ring-2 focus:ring-[#e95322] disabled:opacity-70"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[15px]">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-[15px]">
            {successMessage}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="fixed bottom-20 left-0 right-0 flex gap-4 px-[35px]">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-[#e95322] text-white font-semibold text-[17px] h-[44px] rounded-full hover:bg-[#d84316] transition-colors disabled:opacity-50"
              disabled={uploading}
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-[#ffdecf] text-[#e95322] font-semibold text-[17px] h-[44px] rounded-full hover:bg-[#ffccb3] transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleUpdateProfile}
              disabled={uploading}
              className="flex-1 bg-[#e95322] text-white font-semibold text-[17px] h-[44px] rounded-full hover:bg-[#d84316] transition-colors disabled:opacity-50"
            >
              {uploading ? "Saving..." : "Update"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  dateOfBirth: profile.dateOfBirth,
                  phoneNumber: profile.phoneNumber,
                });
              }}
              className="flex-1 bg-[#ffdecf] text-[#e95322] font-semibold text-[17px] h-[44px] rounded-full hover:bg-[#ffccb3] transition-colors"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
