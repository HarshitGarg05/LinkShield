import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, Moon, Sun, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'URL Scanner', path: '/scanner' },
    { name: 'Scan History', path: '/history' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About Project', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b-[2.5px] border-[var(--border)] transition-colors">
      <div className="max-w-[1140px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-foreground)] border-2 border-[var(--border)] shadow-[var(--shadow-sm)] flex items-center justify-center transition-transform group-hover:scale-105">
            <Shield className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-['Fredoka'] font-bold text-xl leading-none text-[var(--foreground)] tracking-tight">
              LINK SHIELD
            </span>
            <span className="text-[11px] font-['Space_Mono'] font-bold text-[var(--muted-foreground)] tracking-widest uppercase">
              URL Verifier
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-[15px] font-['Fredoka'] font-semibold transition-all border-2 ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--border)] shadow-[2px_2px_0_var(--border)]'
                    : 'text-[var(--foreground)] border-transparent hover:bg-[var(--muted)] hover:border-[var(--border)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border-2 border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] flex items-center justify-center shadow-[var(--shadow-sm)] hover:bg-[var(--accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-[var(--warning)]" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => navigate('/scanner')}
            className="btn btn-primary btn-sm flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Scan a URL</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border-2 border-[var(--border)] bg-[var(--card)]"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-[var(--warning)]" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border-2 border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-[var(--shadow-sm)]"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--card)] border-b-[2.5px] border-[var(--border)] px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-['Fredoka'] font-semibold text-base border-2 ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--border)] shadow-[2px_2px_0_var(--border)]'
                    : 'text-[var(--foreground)] border-transparent hover:bg-[var(--muted)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[var(--border)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/scanner');
              }}
              className="btn btn-primary w-full justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Scan a URL
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
