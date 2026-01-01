'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

interface BottomNavProps {
  token: string;
}

export default function BottomNav({ token }: BottomNavProps) {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const isActive = (path: string) => {
    if (path === '/menu') {
      return pathname === '/menu' || pathname.startsWith('/menu/');
    }
    return pathname === path;
  };

  const navItems = [
    {
      name: 'Home',
      path: '/menu',
      icon: (active: boolean) => (
        <svg 
          className={`w-6 h-6 ${active ? 'text-[#fa4a0c]' : 'text-gray-400'}`} 
          fill={active ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={active ? 0 : 2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
      ),
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: (active: boolean) => (
        <svg 
          className={`w-6 h-6 ${active ? 'text-[#fa4a0c]' : 'text-gray-400'}`} 
          fill={active ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      ),
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: (active: boolean) => (
        <div className="relative">
          <svg 
            className={`w-6 h-6 ${active ? 'text-[#fa4a0c]' : 'text-gray-400'}`} 
            fill={active ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#fa4a0c] text-white text-xs rounded-full flex items-center justify-center font-medium">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </div>
      ),
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: (active: boolean) => (
        <svg 
          className={`w-6 h-6 ${active ? 'text-[#fa4a0c]' : 'text-gray-400'}`} 
          fill={active ? 'currentColor' : 'none'} 
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
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-40">
      <div className="max-w-md mx-auto px-6">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={`${item.path}?token=${token}`}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  active ? 'text-[#fa4a0c]' : 'text-gray-400'
                }`}
              >
                {item.icon(active)}
                <span className={`text-xs ${active ? 'font-semibold' : ''}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
