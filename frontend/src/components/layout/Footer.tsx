import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t-[2.5px] border-[var(--border)] bg-[var(--card)] py-12 text-[var(--foreground)]">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white border-2 border-[var(--border)] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
                LINK SHIELD
              </span>
            </div>
            <p className="text-[15px] text-[var(--muted-foreground)] max-w-md leading-relaxed">
              Multi-layer heuristic and threat intelligence engine engineered to detect deceptive links, typosquatting domains, and fraudulent phishing portals before users interact.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--muted)] border border-[var(--border)] rounded-full text-xs font-['Space_Mono']">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
              Backend: Python 3.12 Engine on port 8080
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-['Fredoka'] font-semibold text-base uppercase tracking-wider text-[var(--foreground)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[15px] font-medium">
              <li>
                <Link to="/" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                  URL Scanner
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                  Scan History
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Academic */}
          <div className="space-y-3">
            <h4 className="font-['Fredoka'] font-semibold text-base uppercase tracking-wider text-[var(--foreground)]">
              College Seminar
            </h4>
            <p className="text-[14px] text-[var(--muted-foreground)] leading-snug">
              Developed as a web security academic demonstration on heuristic and blacklist URL classification.
            </p>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/about" className="text-[var(--primary)] font-semibold underline underline-offset-2 hover:opacity-80">
                  Project Documentation & Architecture &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t-2 border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Space_Mono'] text-[var(--muted-foreground)]">
          <div>
            &copy; {new Date().getFullYear()} LINK SHIELD — Cybersecurity Seminar Project.
          </div>
          <div className="flex items-center gap-4">
            <span>Client-side verification only. Never click unverified links.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
