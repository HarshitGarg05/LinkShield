import React from 'react';
import { ShieldAlert, Database, Search, FileCode, Lock, CheckCircle2 } from 'lucide-react';

export const ScanningProgress: React.FC = () => {
  const stages = [
    { label: 'URL Validation & Scheme Sanitization', icon: Search },
    { label: 'Threat Blacklist & Offline Intelligence Hash Matching', icon: Database },
    { label: 'Typosquatting & Levenshtein Distance Evaluation', icon: ShieldAlert },
    { label: 'HTML DOM & Suspicious Form Element Extraction', icon: FileCode },
    { label: 'TLS / SSL Certificate & DNS Resolution Validation', icon: Lock },
    { label: 'Multi-layer Heuristic Risk Synthesis', icon: CheckCircle2 },
  ];

  return (
    <div className="card max-w-2xl mx-auto my-12 text-center p-8 bg-[var(--card)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-lg)]">
      {/* Animated Spinner Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--accent)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-sm)] flex items-center justify-center relative">
        <span className="w-8 h-8 border-4 border-[var(--foreground)] border-t-transparent rounded-full animate-spin"></span>
      </div>

      <h3 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)] mb-2">
        Analyzing Security Indicators...
      </h3>
      <p className="text-[var(--muted-foreground)] text-sm mb-6 max-w-md mx-auto">
        Evaluating the target address through our multi-stage inspection pipeline. A completed verdict will appear shortly.
      </p>

      {/* Conceptual Inspection Stages List (Honest indeterminate status) */}
      <div className="space-y-3 text-left max-w-md mx-auto">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 text-sm font-medium"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[var(--foreground)]" />
              </div>
              <span className="flex-1 text-[var(--foreground)]">{stage.label}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] border border-[var(--border)] animate-ping"></span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-xs text-[var(--muted-foreground)] font-['Space_Mono'] bg-[var(--muted)] p-3 rounded-lg border border-[var(--border)]">
        Backend: Querying Python engine at localhost:8080 &middot; Please do not close this window.
      </div>
    </div>
  );
};
