import React from 'react';
import { Server, Code } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--muted)] border-2 border-[var(--border)] text-xs font-['Space_Mono'] font-bold uppercase">
          <span>Academic Project Overview</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-['Fredoka'] font-bold text-[var(--foreground)]">
          About LINK SHIELD
        </h1>
        <p className="text-base text-[var(--muted-foreground)] max-w-xl mx-auto">
          Phishing & Malicious URL Verification System — College Seminar Engineering Demonstration.
        </p>
      </div>

      {/* Project Meta Card */}
      <div className="card p-6 md:p-8 bg-[var(--card)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-md)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-['Space_Mono']">
          <div className="p-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)]">
            <span className="block text-xs font-bold text-[var(--muted-foreground)] uppercase">
              Project Name
            </span>
            <span className="font-bold text-base text-[var(--foreground)] font-['Fredoka']">
              LINK SHIELD
            </span>
          </div>
          <div className="p-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)]">
            <span className="block text-xs font-bold text-[var(--muted-foreground)] uppercase">
              Academic Category
            </span>
            <span className="font-bold text-base text-[var(--foreground)] font-['Fredoka']">
              Cybersecurity / Web Security
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
            Project Objective
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            Link Shield analyzes web links to detect phishing portals, lookalike domains, and unsafe HTTP forms before users open them. It combines blocklist hash matching, Levenshtein edit distance, live DNS verification, TLS handshake checks, and DOM form inspection into a transparent, rule-based security assessment.
          </p>
        </div>
      </div>

      {/* Technologies Used Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
          Technologies & Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backend Stack */}
          <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] space-y-3">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <Server className="w-5 h-5" />
              <h3 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
                Backend Architecture
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm text-[var(--muted-foreground)] font-['Space_Mono']">
              <li>&bull; Python 3.12 Standard Library runtime</li>
              <li>&bull; <code className="text-xs bg-[var(--muted)] px-1 py-0.5 rounded">http.server</code> socket server (Port 8080)</li>
              <li>&bull; <code className="text-xs bg-[var(--muted)] px-1 py-0.5 rounded">urllib.parse</code> & <code className="text-xs bg-[var(--muted)] px-1 py-0.5 rounded">urllib.request</code></li>
              <li>&bull; <code className="text-xs bg-[var(--muted)] px-1 py-0.5 rounded">socket</code> & <code className="text-xs bg-[var(--muted)] px-1 py-0.5 rounded">ssl</code> certificate inspection</li>
              <li>&bull; <code className="text-xs bg-[var(--muted)] px-1 py-0.5 rounded">ipaddress</code> SSRF / Private IP protection</li>
              <li>&bull; Regular Expression string tokenizers</li>
            </ul>
          </div>

          {/* Frontend Stack */}
          <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] space-y-3">
            <div className="flex items-center gap-2 text-[var(--secondary-foreground)]">
              <Code className="w-5 h-5" />
              <h3 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
                Frontend Architecture
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm text-[var(--muted-foreground)] font-['Space_Mono']">
              <li>&bull; React 19 with TypeScript</li>
              <li>&bull; Vite 6 Fast Build Engine</li>
              <li>&bull; Tailwind CSS v4 & Neo Memphis Design Tokens</li>
              <li>&bull; React Router 7 client routing</li>
              <li>&bull; Lucide React iconography</li>
              <li>&bull; jsPDF client-side report generator</li>
              <li>&bull; Browser LocalStorage session persistence</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="card p-6 md:p-8 bg-[var(--card)] border-[2.5px] border-[var(--border)] space-y-6">
        <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
          System Architecture Flow
        </h2>

        {/* Visual Flow diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center text-xs font-['Space_Mono'] font-bold">
          <div className="w-full md:w-36 p-3 rounded-xl border-2 border-[var(--border)] bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[2px_2px_0_var(--border)]">
            End User Input
          </div>
          <span className="text-lg font-bold text-[var(--foreground)]">&rarr;</span>
          <div className="w-full md:w-36 p-3 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] shadow-[2px_2px_0_var(--border)]">
            React App
          </div>
          <span className="text-lg font-bold text-[var(--foreground)]">&rarr;</span>
          <div className="w-full md:w-36 p-3 rounded-xl border-2 border-[var(--border)] bg-[var(--muted)] shadow-[2px_2px_0_var(--border)]">
            Python HTTP API (Port 8080)
          </div>
          <span className="text-lg font-bold text-[var(--foreground)]">&rarr;</span>
          <div className="w-full md:w-36 p-3 rounded-xl border-2 border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-[2px_2px_0_var(--border)]">
            Scanner Modules
          </div>
          <span className="text-lg font-bold text-[var(--foreground)]">&rarr;</span>
          <div className="w-full md:w-36 p-3 rounded-xl border-2 border-[var(--border)] bg-[var(--primary)] text-white shadow-[2px_2px_0_var(--border)]">
            Results Dashboard
          </div>
        </div>
      </div>

      {/* Limitations Section */}
      <div className="card p-6 bg-[var(--muted)]/40 border-[2.5px] border-[var(--border)] space-y-3">
        <h3 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
          Project Limitations & Scope
        </h3>
        <ul className="space-y-1.5 text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed list-disc list-inside">
          <li>
            <strong>Heuristic Boundary:</strong> A clean scan indicates that known indicators and blacklist patterns were not detected; it is not a 100% guarantee against brand-new zero-day campaigns.
          </li>
          <li>
            <strong>Statelessness:</strong> The backend server does not maintain server-side user authentication or a remote SQL database.
          </li>
          <li>
            <strong>Network Dependency:</strong> Upstream threat intelligence lookups and screenshot proxies require outbound internet connectivity.
          </li>
        </ul>
      </div>
    </div>
  );
};
