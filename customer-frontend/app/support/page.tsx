"use client";

import React from "react";
import { Headphones, Mail, Phone, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-[#f5cb58] px-6 py-8">
        <h1 className="text-[#f8f8f8] font-bold text-[28px] text-center">
          Support
        </h1>
      </div>

      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <Headphones className="w-20 h-20 text-[#e95322] mb-4" />
          <h2 className="text-[#391713] text-xl font-semibold mb-2">
            How Can We Help?
          </h2>
          <p className="text-[#252525] text-center">
            We're here to assist you with any questions or concerns
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-[#f5f5f5] rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Phone className="w-6 h-6 text-[#e95322] mr-3" />
              <h3 className="text-[#391713] font-semibold text-lg">Call Us</h3>
            </div>
            <p className="text-[#252525]">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
          </div>

          <div className="bg-[#f5f5f5] rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Mail className="w-6 h-6 text-[#e95322] mr-3" />
              <h3 className="text-[#391713] font-semibold text-lg">Email Us</h3>
            </div>
            <p className="text-[#252525]">support@smartrestaurant.com</p>
            <p className="text-sm text-gray-500 mt-1">
              We'll respond within 24 hours
            </p>
          </div>

          <div className="bg-[#f5f5f5] rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <MessageCircle className="w-6 h-6 text-[#e95322] mr-3" />
              <h3 className="text-[#391713] font-semibold text-lg">
                Live Chat
              </h3>
            </div>
            <p className="text-[#252525] mb-4">Chat with our support team</p>
            <button className="w-full bg-[#e95322] hover:bg-[#d4441a] text-white font-medium py-3 rounded-full transition-colors">
              Start Chat
            </button>
          </div>
        </div>

        <div className="mt-8 bg-[#ffdecf] rounded-2xl p-6">
          <h3 className="text-[#391713] font-semibold text-lg mb-3">FAQ</h3>
          <ul className="space-y-2 text-[#252525]">
            <li>• How do I place an order?</li>
            <li>• What are your delivery hours?</li>
            <li>• Can I modify my order?</li>
            <li>• What payment methods do you accept?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
