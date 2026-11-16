import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Copy,
  Download,
  FileJson,
  History,
  Flag,
  Check,
  ShieldX,
} from 'lucide-react';
import type { ScanResponse } from '../types/scanner';
import { getScanById } from '../services/history';
import { SecurityCheckCard } from '../components/results/SecurityCheckCard';
import { ScreenshotPreview } from '../components/results/ScreenshotPreview';
import { ScanStats } from '../components/results/ScanStats';
import { TrustScoreCard } from '../components/results/TrustScoreCard';
import { ReportModal } from '../components/results/ReportModal';
import { generateScanPdfReport } from '../utils/pdfReport';

export const Results: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [scan, setScan] = useState<ScanResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check if passed via React Router navigation state
    if (location.state && (location.state as any).scanResult) {
      setScan((location.state as any).scanResult);
      return;
    }

    // 2. Fallback to localStorage scan history lookup
    if (scanId) {
      const record = getScanById(scanId);
      if (record && record.raw_response) {
        setScan(record.raw_response);
      }
    }
  }, [scanId, location.state]);

  if (!scan) {
    return (
      <div className="card max-w-lg mx-auto my-16 text-center p-8 bg-[var(--card)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-md)] space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-[var(--muted)] border-2 border-[var(--border)] flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-[var(--warning)]" />
        </div>
        <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
          Scan Result Not Found
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          The requested scan ID could not be retrieved from local memory. You can initiate a new scan anytime.
        </p>
        <div className="pt-2">
          <Link to="/scanner" className="btn btn-primary">
            Start New Scan
          </Link>
        </div>
      </div>
    );
  }

  // Final Verdict Logic
  const verdictKey = (scan.verdict?.combined_verdict || (scan.status === 'REJECTED' ? 'rejected' : 'unknown')).toLowerCase();
  const isClean = verdictKey === 'clean';
  const isMalicious = verdictKey === 'malicious' || verdictKey === 'suspicious';
  const isRejected = verdictKey === 'rejected' || scan.status === 'REJECTED';

  const riskLabel = scan.verdict?.risk_label || (isRejected ? 'Rejected' : isClean ? 'Low Risk' : 'High Risk');
  const headline = scan.verdict?.headline || (isRejected ? 'Scan was rejected by host security policy.' : isClean ? 'This URL appears safe.' : 'Potential security indicators detected.');
  const description = scan.verdict?.description || (isRejected ? scan.message || 'Target does not meet public host requirements.' : 'Review the breakdown below.');

  // Actions
  const handleCopySummary = () => {
    const summary = `LINK SHIELD SCAN REPORT\nTarget URL: ${scan.url}\nHostname: ${scan.hostname}\nVerdict: ${riskLabel.toUpperCase()}\nHeadline: ${headline}\nBlacklist Flag: ${scan.tier1_blacklisted ? 'DETECTED' : 'CLEAN'}\nTyposquatting: ${scan.typosquat_detected ? 'DETECTED' : 'CLEAN'}\nScanned: ${scan.timestamp || new Date().toLocaleString()}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(scan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `link-shield-${(scan.hostname || 'scan').replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    generateScanPdfReport(scan);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Top Banner & Result Summary */}
      <div
        className={`card p-6 md:p-8 border-[2.5px] border-[var(--border)] shadow-[var(--shadow-lg)] relative overflow-hidden ${
          isClean
            ? 'bg-[var(--secondary)]'
            : isMalicious
            ? 'bg-[var(--primary)] text-white'
            : isRejected
            ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
            : 'bg-[var(--card)]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            {/* Verdict Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-['Space_Mono'] font-bold uppercase tracking-wider border-2 border-[var(--border)] shadow-[2px_2px_0_var(--border)] ${
                  isClean
                    ? 'bg-white text-[var(--foreground)]'
                    : isMalicious
                    ? 'bg-white text-[var(--primary)]'
                    : 'bg-white text-[var(--foreground)]'
                }`}
              >
                VERDICT: {riskLabel.toUpperCase()}
              </span>
              <span className="text-xs font-['Space_Mono'] opacity-80">
                Job ID: {scan.job_id}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-['Fredoka'] font-bold leading-tight">
              {headline}
            </h1>

            <p className="text-sm md:text-base opacity-90 leading-relaxed font-medium">
              {description}
            </p>

            {/* URL Meta bar */}
            <div className="p-3 rounded-xl bg-white/90 text-[var(--foreground)] border-2 border-[var(--border)] shadow-[var(--shadow-sm)] flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm font-['Space_Mono']">
              <div className="truncate max-w-full">
                <span className="font-bold">Inspected URL: </span>
                <span className="break-all">{scan.url}</span>
              </div>
              <div className="text-[11px] opacity-75">
                Timestamp: {scan.timestamp ? new Date(scan.timestamp).toLocaleString() : 'Just now'}
              </div>
            </div>
          </div>

          {/* Verdict Status Icon Illustration */}
          <div className="shrink-0 self-center md:self-start">
            <div
              className={`w-24 h-24 rounded-3xl border-3 border-[var(--border)] shadow-[var(--shadow-md)] flex items-center justify-center ${
                isClean
                  ? 'bg-white text-[var(--success)]'
                  : isMalicious
                  ? 'bg-white text-[var(--destructive)]'
                  : 'bg-white text-[var(--warning)]'
              }`}
            >
              {isClean ? (
                <ShieldCheck className="w-14 h-14" />
              ) : isMalicious ? (
                <ShieldAlert className="w-14 h-14" />
              ) : (
                <ShieldX className="w-14 h-14" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Actions Bar */}
      <div className="card p-4 bg-[var(--card)] border-[2.5px] border-[var(--border)] flex flex-wrap items-center justify-between gap-3 shadow-[var(--shadow-sm)]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/scanner')}
            className="btn btn-outline btn-sm flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Scan Another URL</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="btn btn-outline btn-sm flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="btn btn-primary btn-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>

          <button
            onClick={handleExportJson}
            className="btn btn-outline btn-sm flex items-center gap-1.5"
          >
            <FileJson className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportModalOpen(true)}
            className="btn btn-ghost btn-sm text-[var(--destructive)] border-[var(--border)] hover:bg-[var(--destructive)] hover:text-white flex items-center gap-1.5"
          >
            <Flag className="w-4 h-4" />
            <span>Report URL</span>
          </button>

          <Link
            to="/history"
            className="btn btn-ghost btn-sm flex items-center gap-1.5"
          >
            <History className="w-4 h-4" />
            <span>Scan History</span>
          </Link>
        </div>
      </div>

      {/* Trust Score & Threat Databases & Heuristics Section */}
      <TrustScoreCard
        score={scan.trust_score ?? (isClean ? 100 : isMalicious ? 20 : 65)}
        assessment={scan.trust_assessment}
        hostname={scan.hostname}
      />

      {/* Threat Detection Indicators (Explicit Booleans) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blacklist Indicator Card */}
        <div
          className={`card p-5 border-[2.5px] border-[var(--border)] ${
            scan.tier1_blacklisted
              ? 'bg-[var(--destructive)] text-white'
              : 'bg-[var(--card)] text-[var(--foreground)]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-['Space_Mono'] font-bold uppercase tracking-wider">
              Blacklist Intelligence
            </span>
            <span
              className={`badge text-xs ${
                scan.tier1_blacklisted ? 'bg-white text-[var(--destructive)]' : 'badge-clean'
              }`}
            >
              {scan.tier1_blacklisted ? 'DETECTED' : 'NOT DETECTED'}
            </span>
          </div>
          <h3 className="font-['Fredoka'] font-bold text-xl mb-1">
            {scan.tier1_blacklisted
              ? 'Known Threat Repository Match'
              : 'Clean Against Blacklist Feeds'}
          </h3>
          <p className="text-xs md:text-sm opacity-90 leading-relaxed">
            {scan.tier1_blacklisted
              ? 'This host or URL pattern is cataloged in security threat feeds as an active phishing or malicious distributor.'
              : 'No matching entry was identified in local malware/phishing lists or cloud reputation signatures at the time of query.'}
          </p>
        </div>

        {/* Typosquatting Indicator Card */}
        <div
          className={`card p-5 border-[2.5px] border-[var(--border)] ${
            scan.typosquat_detected
              ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
              : 'bg-[var(--card)] text-[var(--foreground)]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-['Space_Mono'] font-bold uppercase tracking-wider">
              Typosquatting & Impersonation
            </span>
            <span
              className={`badge text-xs ${
                scan.typosquat_detected ? 'bg-[var(--foreground)] text-white' : 'badge-clean'
              }`}
            >
              {scan.typosquat_detected ? 'DETECTED' : 'NOT DETECTED'}
            </span>
          </div>
          <h3 className="font-['Fredoka'] font-bold text-xl mb-1">
            {scan.typosquat_detected
              ? 'Suspicious Brand Mimicry Observed'
              : 'No Lookalike Target Detected'}
          </h3>
          <p className="text-xs md:text-sm opacity-90 leading-relaxed">
            {scan.typosquat_detected
              ? 'Domain utilizes subtle typographical substitutions (Levenshtein distance / confusable characters) to mimic a legitimate organization.'
              : 'Domain name syntax does not display recognized lookalike patterns for monitored major platforms.'}
          </p>
        </div>
      </div>

      {/* Main Content Layout: Inspection Cards + Telemetry/Screenshot sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Security Inspection Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
              Detailed Inspection Findings
            </h2>
            <span className="text-xs font-['Space_Mono'] text-[var(--muted-foreground)]">
              {scan.verdict_details?.checks?.length || 0} Checks Evaluated
            </span>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {scan.verdict_details?.checks && scan.verdict_details.checks.length > 0 ? (
              scan.verdict_details.checks.map((check, index) => (
                <SecurityCheckCard key={index} check={check} defaultExpanded={index === 0} />
              ))
            ) : (
              <div className="card p-6 bg-[var(--card)] text-center text-[var(--muted-foreground)]">
                No granular check items returned by backend.
              </div>
            )}
          </div>

          {/* Security Recommendations Card */}
          <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] space-y-3">
            <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
              Security Recommendations
            </h3>
            <ul className="space-y-2 text-sm text-[var(--foreground)]">
              {isMalicious ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--destructive)] font-bold">&bull;</span>
                    <span><strong>Avoid entering credentials:</strong> Do not submit usernames, passwords, or PINs on this page.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--destructive)] font-bold">&bull;</span>
                    <span><strong>Do not provide financial data:</strong> Withhold debit/credit card numbers and billing addresses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--destructive)] font-bold">&bull;</span>
                    <span><strong>Inspect address manually:</strong> Use bookmarks or manually type the official website address.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--destructive)] font-bold">&bull;</span>
                    <span><strong>Block or report:</strong> Mark the incoming message or email as spam/phishing.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--success)] font-bold">&bull;</span>
                    <span><strong>No active threats found:</strong> The address tested clean against tested heuristic modules.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold">&bull;</span>
                    <span><strong>Stay vigilant:</strong> Never enter sensitive secrets into unfamiliar websites even if the address seems valid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold">&bull;</span>
                    <span><strong>Verify sender identity:</strong> Confirm with sender through a separate out-of-band channel before taking action.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column: Screenshot & Statistics */}
        <div className="space-y-6">
          <ScreenshotPreview screenshotUrl={scan.screenshot_url} targetUrl={scan.url} />
          <ScanStats statistics={scan.statistics} hostname={scan.hostname || 'Unknown'} />
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        url={scan.url}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
};
