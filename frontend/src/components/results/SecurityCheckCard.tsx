import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';
import type { ScanCheck } from '../../types/scanner';

interface SecurityCheckCardProps {
  check: ScanCheck;
  defaultExpanded?: boolean;
}

export const SecurityCheckCard: React.FC<SecurityCheckCardProps> = ({
  check,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const verdictLower = (check.verdict || 'clean').toLowerCase();
  const isClean = verdictLower === 'clean';
  const isFlagged = verdictLower === 'flagged' || verdictLower === 'malicious' || verdictLower === 'suspicious';

  const badgeTone = isClean ? 'success' : isFlagged ? 'destructive' : 'warning';
  const badgeText = isClean ? 'CLEAN' : isFlagged ? 'FLAGGED' : 'UNKNOWN';

  return (
    <div className="card bg-[var(--card)] p-0 overflow-hidden border-[2.5px] border-[var(--border)] transition-all">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-[var(--muted)]/50 transition-colors text-left cursor-pointer select-none"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-[var(--border)] shrink-0 ${
              isClean
                ? 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'
                : isFlagged
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--accent)] text-[var(--accent-foreground)]'
            }`}
          >
            {isClean ? (
              <ShieldCheck className="w-5 h-5" />
            ) : isFlagged ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <HelpCircle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="font-['Fredoka'] font-bold text-base md:text-lg text-[var(--foreground)] leading-tight">
              {check.title || check.category}
            </h4>
            <span className="text-xs font-['Space_Mono'] text-[var(--muted-foreground)]">
              Category: {check.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="badge" data-tone={badgeTone}>
            {badgeText}
          </span>
          <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--card)] shrink-0">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="p-4 pt-2 border-t border-[var(--border)] bg-[var(--card)] space-y-3">
          {/* Finding & Evidence (With break-all & full-width wrapping) */}
          <div className="p-3.5 rounded-lg bg-[var(--muted)]/50 border border-[var(--border)] space-y-1">
            <span className="block text-xs font-['Space_Mono'] font-bold uppercase text-[var(--muted-foreground)]">
              Inspection Finding & Evidence
            </span>
            <p className="text-sm text-[var(--foreground)] leading-relaxed break-words break-all whitespace-normal">
              {check.reason || 'No specific anomalous telemetry reported by backend probe.'}
            </p>
          </div>

          {/* Telemetry Parameters */}
          {check.details && Object.keys(check.details).length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="block text-xs font-['Space_Mono'] font-bold uppercase text-[var(--muted-foreground)]">
                Telemetry Parameters
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-['Space_Mono']">
                {Object.entries(check.details).map(([key, val]) => {
                  const valStr = typeof val === 'object' ? JSON.stringify(val) : String(val);
                  const isLong = valStr.length > 25 || key.toLowerCase().includes('destination') || key.toLowerCase().includes('ip');

                  return (
                    <div
                      key={key}
                      className={`p-2.5 rounded bg-[var(--muted)] border border-[var(--border)] ${
                        isLong
                          ? 'sm:col-span-2 flex flex-col gap-1'
                          : 'flex items-center justify-between gap-2'
                      }`}
                    >
                      <span className="font-semibold text-[var(--muted-foreground)] shrink-0">
                        {key}:
                      </span>
                      <span className="text-[var(--foreground)] font-bold break-words break-all whitespace-normal">
                        {valStr}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
