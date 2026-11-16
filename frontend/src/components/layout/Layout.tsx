import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden">
      {/* Decorative Neo Memphis shapes in corners */}
      <div 
        className="confetti-dot w-24 h-24 bg-[var(--accent)] opacity-30 -top-8 -left-8 border-2 border-[var(--border)]"
        aria-hidden="true"
      />
      <div 
        className="confetti-dot w-16 h-16 bg-[var(--secondary)] opacity-30 top-40 -right-6 border-2 border-[var(--border)]"
        aria-hidden="true"
      />
      
      <Header />
      <main className="flex-1 w-full max-w-[1140px] mx-auto px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
