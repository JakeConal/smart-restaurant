import { ReactNode } from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Menu | Smart Restaurant',
  description: 'Browse our menu and order your favorites',
};

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <div className={outfit.className}>
      {children}
    </div>
  );
}
