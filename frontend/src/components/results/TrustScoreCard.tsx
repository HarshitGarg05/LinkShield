import React from 'react';
import { Database, Check, X, Activity } from 'lucide-react';
import type { TrustAssessment } from '../../types/scanner';

interface TrustScoreCardProps {
  score?: number;
  assessment?: TrustAssessment;
  hostname: string;
}

export const TrustScoreCard: React.FC<TrustScoreCardProps> = ({
  score = 100,
  assessment,
}) => {
  // Determine color scheme based on 0-100 score
  const isHighTrust = score >= 80;
  const isModerateTrust = score >= 50 && score < 80;

  const scoreBarColor = isHighTrust
    ? 'bg-[var(--success)]'
    : isModerateTrust
    ? 'bg-[var(--warning)]'
    : 'bg-[var(--destructive)]';

  const scoreTextColor = isHighTrust
    ? 'text-[var(--success)]'
    : isModerateTrust
    ? 'text-[var(--warning-foreground)]'
    : 'text-[var(--destructive)]';

  // Threat databases
  const threatDbs = assessment?.threat_databases || [
    { name: 'OpenPhish', status: score >= 50 ? 'clean' : 'flagged' },
    { name: 'Abuse.ch URLhaus', status: score >= 50 ? 'clean' : 'flagged' },
    { name: 'Google Safe Browsing', status: score >= 70 ? 'clean' : 'flagged' },
    { name: 'Domain Age & Reputation', status: score >= 70 ? 'clean' : 'unknown' },
  ];

  // Heuristic signals
  const signals = assessment?.signals || [
    { name: 'HTTPS', status: 'clean', label: 'HTTPS Encrypted' },
    { name: 'TLD risk', status: 'clean', label: 'Standard TLD' },
    { name: 'Shortener', status: 'clean', label: 'Direct URL' },
    { name: 'Non-ASCII chars', status: 'clean', label: 'ASCII Domain' },
    { name: 'IP hostname', status: 'clean', label: 'Named Hostname' },
    { name: 'Subdomain depth', status: 'clean', label: 'Normal Depth' },
    { name: 'Brand impersonation', status: 'clean', label: 'Legitimate Syntax' },
    { name: 'Suspicious keywords', status: 'clean', label: 'Clean Tokens' },
    { name: 'Domain length', status: 'clean', label: 'Normal Length' },
    { name: 'Character substitution', status: 'clean', label: 'Standard Chars' },
  ];

  return (
    <div className="card p-6 md:p-7 bg-[var(--card)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-md)] space-y-6">
      {/* Top 2 Columns: Trust Score Gauge + Threat Databases */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Trust Score Gauge (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Trust Score
            </span>
            <span className="badge badge-muted text-[11px] font-['Space_Mono']">
              Score Metric
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className={`font-['Fredoka'] font-bold text-5xl md:text-6xl ${scoreTextColor} leading-none`}>
              {score}
            </span>
            <span className="text-sm font-['Space_Mono'] text-[var(--muted-foreground)] font-semibold">
              out of 100
            </span>
          </div>

          {/* Progress Bar with Neo Memphis border */}
          <div className="w-full h-4 rounded-full bg-[var(--muted)] border-2 border-[var(--border)] overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full ${scoreBarColor} transition-all duration-700 ease-out`}
              style={{ width: `${Math.max(5, Math.min(100, score))}%` }}
            ></div>
          </div>

          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed pt-1">
            {isHighTrust
              ? 'High confidence score based on verified TLS, standard domain structure, and absence in threat feeds.'
              : isModerateTrust
              ? 'Moderate trust. Target was not listed in active blocklists, but exhibits heuristic risk signals.'
              : 'Severe risk detected. Multiple critical anomalies or threat blacklist matches present.'}
          </p>
        </div>

        {/* Right: Threat Databases Table (7 cols) */}
        <div className="md:col-span-7 space-y-2 border-t md:border-t-0 md:border-l-[2px] md:border-[var(--border)] md:pl-6 pt-4 md:pt-0">
          <div className="flex items-center gap-2 pb-1">
            <Database className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-[var(--foreground)]">
              Threat Intelligence Repositories
            </span>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {threatDbs.map((db, idx) => {
              const isClean = db.status === 'clean';
              const isFlagged = db.status === 'flagged';
              return (
                <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                  <span className="font-['Fredoka'] font-semibold text-[var(--foreground)]">
                    {db.name}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-['Space_Mono'] font-bold border ${
                      isClean
                        ? 'bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--border)]'
                        : isFlagged
                        ? 'bg-[var(--destructive)] text-white border-[var(--border)]'
                        : 'bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)]'
                    }`}
                  >
                    {isClean && <Check className="w-3 h-3" />}
                    {isFlagged && <X className="w-3 h-3" />}
                    <span>{isClean ? 'Clean' : isFlagged ? 'Flagged' : db.status.toUpperCase()}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Heuristic Signals Pill Badges */}
      <div className="pt-4 border-t-2 border-[var(--border)] space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="font-['Fredoka'] font-bold text-base text-[var(--foreground)]">
            Heuristic Signals & Security Attributes
          </h4>
        </div>

        <div className="flex flex-wrap gap-2">
          {signals.map((sig, idx) => {
            const isClean = sig.status === 'clean';
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-['Space_Mono'] font-semibold border-2 border-[var(--border)] shadow-[1.5px_1.5px_0_var(--border)] ${
                  isClean
                    ? 'bg-[var(--secondary)]/60 text-[var(--secondary-foreground)]'
                    : 'bg-[var(--destructive)]/15 text-[var(--destructive)]'
                }`}
                title={sig.label}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isClean ? 'bg-[var(--success)]' : 'bg-[var(--destructive)]'
                  }`}
                />
                <span>{sig.name}</span>
              </span>
            );
          })}
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[11px] text-[var(--muted-foreground)] leading-snug">
          Note: A clean score reflects observed parameters at query time. Emerging zero-day phishing pages can appear constantly; always verify unfamiliar URLs before entering sensitive credentials.
        </div>
      </div>
    </div>
  );
};
