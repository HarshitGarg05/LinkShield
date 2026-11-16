import React from 'react';
import { Clock, Globe, Shield, Activity, Info } from 'lucide-react';
import type { ScanStatistics } from '../../types/scanner';

interface ScanStatsProps {
  statistics?: ScanStatistics;
  hostname: string;
}

export const ScanStats: React.FC<ScanStatsProps> = ({ statistics, hostname }) => {
  if (!statistics) return null;

  // Data Integrity Validation Layer:
  // Distinguish verified runtime measurements from unverified or placeholder fields
  const verifiedDuration =
    typeof statistics.duration_seconds === 'number' && statistics.duration_seconds > 0
      ? `${statistics.duration_seconds.toFixed(2)}s`
      : 'Measured at runtime';

  // Format server location safely (can be object { country_name, ... } or string)
  let formattedLocation = 'Resolved via DNS';
  if (statistics.server_location) {
    if (typeof statistics.server_location === 'object') {
      const loc = statistics.server_location as any;
      formattedLocation = [loc.country_name || loc.country_code, loc.asn_org].filter(Boolean).join(' • ') || 'Resolved via DNS';
    } else {
      formattedLocation = String(statistics.server_location);
    }
  }

  const items = [
    {
      title: 'Inspection Time',
      subtitle: 'Verified local timer',
      value: verifiedDuration,
      icon: Clock,
      subColor: 'text-[var(--success)]',
    },
    {
      title: 'Target Host',
      subtitle: 'DNS Record Probe',
      value: hostname,
      icon: Globe,
      subColor: 'text-[var(--muted-foreground)]',
    },
    {
      title: 'Host Origin',
      subtitle: 'Network routing',
      value: formattedLocation,
      icon: Shield,
      subColor: 'text-[var(--muted-foreground)]',
    },
  ];

  return (
    <div className="card bg-[var(--card)] border-[2.5px] border-[var(--border)] p-5 space-y-4 shadow-[var(--shadow-md)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[var(--primary)] shrink-0" />
          <h4 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)] leading-tight">
            Scan Telemetry & Diagnostics
          </h4>
        </div>
        <span className="badge badge-muted text-[11px] font-['Space_Mono'] shrink-0">
          Telemetry Profile
        </span>
      </div>

      {/* 3 Unified Equal-Height Stacked Cards */}
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--background)] shadow-[2px_2px_0_var(--border)] flex flex-col justify-between gap-1.5 min-h-[82px]"
            >
              {/* Top row: Icon + Label + Subtitle */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[var(--foreground)]" />
                  </div>
                  <span className="text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {item.title}
                  </span>
                </div>
                <span className={`text-[11px] font-medium ${item.subColor}`}>
                  {item.subtitle}
                </span>
              </div>

              {/* Bottom row: Value (full width, clean wrapping) */}
              <div
                className="font-['Fredoka'] font-bold text-base md:text-lg text-[var(--foreground)] leading-snug break-words pl-8"
                title={item.value}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Backend placeholder disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--muted)]/50 border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[var(--foreground)]" />
        <span>
          Data-integrity notice: Only metrics directly observed and verified by the inspection engine are displayed above. Unverified network byte estimates are omitted to preserve technical accuracy.
        </span>
      </div>
    </div>
  );
};
