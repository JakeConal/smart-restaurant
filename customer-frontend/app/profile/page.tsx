"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui";
import {
  User,
  Lock,
  CreditCard,
  MapPin,
  Facebook,
  Share,
  Star,
  FileText,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Status Bar Placeholder */}
      <div className="h-11 bg-gray-100 flex items-center justify-center text-sm text-gray-600">
        9:41
      </div>

      {/* Header */}
      <div className="px-5 py-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          Account Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Update your settings like notifications, payments, profile edit etc.
        </p>
      </div>

      {/* Personal Info */}
      <div className="px-5">
        <div className="space-y-0">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <User className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Profile Information</p>
                <p className="text-sm text-gray-500">
                  Change your account information
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Lock className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Change your password</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Payment Methods</p>
                <p className="text-sm text-gray-500">
                  Add your credit & debit cards
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Locations</p>
                <p className="text-sm text-gray-500">
                  Add or remove your delivery locations
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Facebook className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Add Social Account</p>
                <p className="text-sm text-gray-500">
                  Add Facebook, Twitter etc
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Share className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Refer to Friends</p>
                <p className="text-sm text-gray-500">
                  Get $10 for referring friends
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="px-5 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide mb-4">
          Notifications
        </h2>
        <div className="space-y-0">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  For daily update you will get it
                </p>
              </div>
            </div>
            <div className="w-12 h-6 bg-orange-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">
                  For daily update you will get it
                </p>
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">
                  Promotional Notifications
                </p>
                <p className="text-sm text-gray-500">
                  For daily update you will get it
                </p>
              </div>
            </div>
            <div className="w-12 h-6 bg-orange-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* More */}
      <div className="px-5 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide mb-4">
          More
        </h2>
        <div className="space-y-0">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Star className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Rate Us</p>
                <p className="text-sm text-gray-500">
                  Rate us playstore, appstor
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">FAQ</p>
                <p className="text-sm text-gray-500">
                  Frequently asked questions
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 mt-8">
        <button className="flex items-center w-full py-4 text-gray-900">
          <LogOut className="w-6 h-6 text-gray-400 mr-3" />
          <span className="font-medium">Logout</span>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </button>
      </div>
    </div>
  );
}
