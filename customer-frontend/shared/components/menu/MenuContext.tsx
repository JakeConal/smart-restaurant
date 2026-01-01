"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: "available" | "unavailable" | "sold_out";
  isChefRecommended?: boolean;
  categoryId?: string;
  categoryName?: string;
  primaryPhotoId?: string;
  modifierGroups?: any[];
  canOrder?: boolean;
  rating?: number;
  reviewCount?: number;
  popularityScore?: number;
}

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
}

interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
  pagination: any;
}

interface MenuContextType {
  menuData: MenuData | null;
  allMenuItems: MenuItem[];
  bestSellers: MenuItem[];
  recommended: MenuItem[];
  tableInfo: any;
  loading: boolean;
  error: string | null;
  photoUrls: Record<string, string>;
  cacheTimestamp: number | null;
  setMenuCache: (data: {
    menuData: MenuData;
    tableInfo: any;
    photoUrls: Record<string, string>;
  }) => void;
  clearMenuCache: () => void;
  isCacheValid: () => boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
  const [bestSellers, setBestSellers] = useState<MenuItem[]>([]);
  const [recommended, setRecommended] = useState<MenuItem[]>([]);
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [cacheTimestamp, setCacheTimestamp] = useState<number | null>(null);

  const isCacheValid = useCallback(() => {
    if (!cacheTimestamp) return false;
    const now = Date.now();
    return now - cacheTimestamp < CACHE_DURATION;
  }, [cacheTimestamp]);

  const setMenuCache = useCallback(
    (data: {
      menuData: MenuData;
      tableInfo: any;
      photoUrls: Record<string, string>;
    }) => {
      const items = data.menuData.items || [];

      // Set menu data
      setMenuData(data.menuData);
      setTableInfo(data.tableInfo);
      setPhotoUrls(data.photoUrls);
      setAllMenuItems(items);

      // Calculate best sellers (sorted by popularity)
      const bestSelling = [...items]
        .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
        .slice(0, 4);
      setBestSellers(bestSelling);

      // Calculate recommended items
      const recommendedItems = items
        .filter((item) => item.isChefRecommended)
        .slice(0, 2);
      setRecommended(recommendedItems);

      // Set cache timestamp
      setCacheTimestamp(Date.now());
      setLoading(false);
      setError(null);
    },
    [],
  );

  const clearMenuCache = useCallback(() => {
    setMenuData(null);
    setAllMenuItems([]);
    setBestSellers([]);
    setRecommended([]);
    setTableInfo(null);
    setPhotoUrls({});
    setCacheTimestamp(null);
    setError(null);
  }, []);

  const value: MenuContextType = {
    menuData,
    allMenuItems,
    bestSellers,
    recommended,
    tableInfo,
    loading,
    error,
    photoUrls,
    cacheTimestamp,
    setMenuCache,
    clearMenuCache,
    isCacheValid,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
