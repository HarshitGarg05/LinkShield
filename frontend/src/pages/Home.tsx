import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Globe,
  Database,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ScannerInput } from '../components/scanner/ScannerInput';
import { scanUrl } from '../services/api';
import { saveScanToHistory } from '../services/history';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartScan = async (url: string) => {
    setIsLoading(true);
    setScanError(null);
    try {
      const response = await scanUrl(url);
      const record = saveScanToHistory(response);
      setIsLoading(false);
      navigate(`/results/${record.job_id}`, { state: { scanResult: response } });
    } catch (err: any) {
      setIsLoading(false);
      setScanError(err.message || 'Scan failed to complete. Please try again.');
    }
  };

  const capabilities = [
    {
      title: 'Blocklist Matching',
      desc: 'Checks hostnames against active phishing and malware feeds (including URLhaus and OpenPhish) in O(1) time.',
      icon: Database,
      tag: 'Reputation',
      color: 'bg-[var(--primary)] text-white',
    },
    {
      title: 'Lookalike Domain Detection',
      desc: 'Calculates Levenshtein edit distance and flags Punycode homoglyphs mimicking brands like Google, PayPal, and Apple.',
      icon: ShieldAlert,
      tag: 'Domain Security',
      color: 'bg-[var(--accent)] text-[var(--accent-foreground)]',
    },
    {
      title: 'TLS & Certificate Checks',
      desc: 'Validates certificate chains, expiry dates, negotiated TLS versions, and flags plaintext HTTP downgrade risks.',
      icon: Lock,
      tag: 'Encryption',
      color: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
    },
    {
      title: 'DNS Resolution Audit',
      desc: 'Queries A and AAAA records via Cloudflare Anycast DoH to confirm real host routing and catch unresolvable domains.',
      icon: Globe,
      tag: 'Network',
      color: 'bg-[var(--muted)] text-[var(--foreground)]',
    },
    {
      title: 'Form & Input Inspection',
      desc: 'Scans markup for password fields over plain HTTP or form actions submitting credentials to third-party endpoints.',
      icon: ShieldCheck,
      tag: 'DOM Analysis',
      color: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
    },
    {
      title: 'Heuristic Risk Scoring',
      desc: 'Combines 10 heuristic signals into a transparent 0-100 trust score with itemized penalty explanations.',
      icon: Layers,
      tag: 'Intelligence',
      color: 'bg-[var(--accent)] text-[var(--accent-foreground)]',
    },
  ];

  return (
    <div className="space-y-20 py-4">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6 pb-4">
        {/* Confetti decorative shapes */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)] text-xs md:text-sm font-['Fredoka'] font-semibold">
          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
          <span>Multi-Layer URL Verification Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Fredoka'] font-bold text-[var(--foreground)] tracking-tight leading-none">
          Detect Suspicious Links <br />
          <span className="text-[var(--primary)] underline decoration-wavy decoration-2">
            Before You Click
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          Check links for phishing indicators, lookalike domains, TLS weaknesses, and known blocklist entries before opening them.
        </p>

        {/* Primary URL Scanner Box */}
        <div className="pt-4 max-w-3xl mx-auto">
          <ScannerInput onScan={handleStartScan} isLoading={isLoading} />

          {scanError && (
            <div className="mt-4 p-4 rounded-xl bg-[var(--card)] border-2 border-[var(--destructive)] text-[var(--destructive)] text-left shadow-[var(--shadow-sm)] flex items-center justify-between">
              <span>{scanError}</span>
              <button
                onClick={() => setScanError(null)}
                className="text-xs font-bold underline cursor-pointer ml-3"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Quick sample buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-['Space_Mono'] text-[var(--muted-foreground)]">
            <span>Try sample URL:</span>
            <button
              onClick={() => handleStartScan('https://google.com')}
              className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors cursor-pointer"
            >
              google.com (Clean)
            </button>
            <button
              onClick={() => handleStartScan('http://paypal-security-update.account-verification-notice.tk')}
              className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] text-[var(--foreground)] transition-colors cursor-pointer"
            >
              paypal-update.tk (Suspicious)
            </button>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-['Fredoka'] font-bold text-[var(--foreground)]">
            How LINK SHIELD Works
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-lg mx-auto text-sm sm:text-base">
            Three simple steps to evaluate the security hygiene of any suspicious address.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] relative space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white border-2 border-[var(--border)] shadow-[var(--shadow-sm)] flex items-center justify-center font-['Fredoka'] font-bold text-xl">
              1
            </div>
            <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
              Enter a URL
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Paste the link from an email, SMS, or message into the scanner without opening it in your browser.
            </p>
          </div>

          <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] relative space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] text-[var(--foreground)] border-2 border-[var(--border)] shadow-[var(--shadow-sm)] flex items-center justify-center font-['Fredoka'] font-bold text-xl">
              2
            </div>
            <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
              Analyze Indicators
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              The engine checks blocklists, calculates typosquatting proximity, inspects TLS certificates, and audits form targets.
            </p>
          </div>

          <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] relative space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--secondary)] text-[var(--secondary-foreground)] border-2 border-[var(--border)] shadow-[var(--shadow-sm)] flex items-center justify-center font-['Fredoka'] font-bold text-xl">
              3
            </div>
            <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
              Review Verdict
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Get an overall trust score, itemized telemetry signals, actionable advice, and a downloadable PDF report.
            </p>
          </div>
        </div>
      </section>

      {/* Security Capabilities Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-['Fredoka'] font-bold text-[var(--foreground)]">
            Security Capabilities
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-lg mx-auto text-sm sm:text-base">
            Engineered with multiple independent defensive checks to maximize detection accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="card card-interactive p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 border-[var(--border)] shadow-[var(--shadow-sm)] ${cap.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-['Space_Mono'] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[var(--muted)] border border-[var(--border)] text-[var(--muted-foreground)]">
                    {cap.tag}
                  </span>
                </div>
                <h4 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
                  {cap.title}
                </h4>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="card p-10 bg-[var(--accent)] border-[2.5px] border-[var(--border)] text-center space-y-4 shadow-[var(--shadow-lg)]">
        <h2 className="text-3xl md:text-4xl font-['Fredoka'] font-bold text-[var(--accent-foreground)]">
          Ready to verify a link?
        </h2>
        <p className="text-[var(--accent-foreground)] max-w-xl mx-auto text-base">
          Safeguard your accounts and personal data by scanning suspicious web addresses before opening them.
        </p>
        <div className="pt-2">
          <Link to="/scanner" className="btn btn-primary inline-flex items-center gap-2 text-lg">
            <span>Launch Dedicated Scanner</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
