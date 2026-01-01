'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Customer, AuthResponse } from './types';

interface AppContextType {
  // Token management
  token: string | null;
  setToken: (token: string | null) => void;
  
  // Table info
  tableId: string | null;
  restaurantId: string | null;
  tableNumber: string | null;
  setTableInfo: (info: { tableId: string; restaurantId: string; tableNumber: string }) => void;
  
  // Auth
  isAuthenticated: boolean;
  isGuest: boolean;
  customer: Customer | null;
  authToken: string | null;
  login: (authResponse: AuthResponse) => void;
  loginAsGuest: () => void;
  logout: () => void;
  updateCustomer: (customer: Customer) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_TOKEN = 'smart_restaurant_qr_token';
const STORAGE_KEY_AUTH = 'smart_restaurant_auth';
const STORAGE_KEY_CUSTOMER = 'smart_restaurant_customer';
const STORAGE_KEY_GUEST = 'smart_restaurant_guest';
const STORAGE_KEY_TABLE = 'smart_restaurant_table';

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initialization for state that comes from sessionStorage
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY_TOKEN);
    }
    return null;
  });
  const [tableId, setTableId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const storedTable = sessionStorage.getItem(STORAGE_KEY_TABLE);
      if (storedTable) {
        try {
          return JSON.parse(storedTable).tableId;
        } catch { return null; }
      }
    }
    return null;
  });
  const [restaurantId, setRestaurantId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const storedTable = sessionStorage.getItem(STORAGE_KEY_TABLE);
      if (storedTable) {
        try {
          return JSON.parse(storedTable).restaurantId;
        } catch { return null; }
      }
    }
    return null;
  });
  const [tableNumber, setTableNumber] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const storedTable = sessionStorage.getItem(STORAGE_KEY_TABLE);
      if (storedTable) {
        try {
          return JSON.parse(storedTable).tableNumber;
        } catch { return null; }
      }
    }
    return null;
  });
  const [customer, setCustomer] = useState<Customer | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY_CUSTOMER);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch { return null; }
      }
    }
    return null;
  });
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY_AUTH);
    }
    return null;
  });
  const [isGuest, setIsGuest] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY_GUEST) === 'true';
    }
    return false;
  });

  const setToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);
    if (typeof window !== 'undefined') {
      if (newToken) {
        sessionStorage.setItem(STORAGE_KEY_TOKEN, newToken);
      } else {
        sessionStorage.removeItem(STORAGE_KEY_TOKEN);
      }
    }
  }, []);

  const setTableInfo = useCallback((info: { tableId: string; restaurantId: string; tableNumber: string }) => {
    setTableId(info.tableId);
    setRestaurantId(info.restaurantId);
    setTableNumber(info.tableNumber);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_TABLE, JSON.stringify(info));
    }
  }, []);

  const login = useCallback((authResponse: AuthResponse) => {
    setAuthToken(authResponse.access_token);
    setCustomer(authResponse.user);
    setIsGuest(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_AUTH, authResponse.access_token);
      sessionStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(authResponse.user));
      sessionStorage.removeItem(STORAGE_KEY_GUEST);
    }
  }, []);

  const loginAsGuest = useCallback(() => {
    setIsGuest(true);
    setCustomer(null);
    setAuthToken(null);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_GUEST, 'true');
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
      sessionStorage.removeItem(STORAGE_KEY_CUSTOMER);
    }
  }, []);

  const logout = useCallback(() => {
    setCustomer(null);
    setAuthToken(null);
    setIsGuest(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
      sessionStorage.removeItem(STORAGE_KEY_CUSTOMER);
      sessionStorage.removeItem(STORAGE_KEY_GUEST);
    }
  }, []);

  const updateCustomer = useCallback((updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(updatedCustomer));
    }
  }, []);

  const isAuthenticated = Boolean(authToken && customer) || isGuest;

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        tableId,
        restaurantId,
        tableNumber,
        setTableInfo,
        isAuthenticated,
        isGuest,
        customer,
        authToken,
        login,
        loginAsGuest,
        logout,
        updateCustomer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
