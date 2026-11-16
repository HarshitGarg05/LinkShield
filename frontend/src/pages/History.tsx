import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  History as HistoryIcon,
  Search,
  Filter,
  Trash2,
  FileJson,
  RotateCcw,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import type { StoredScanRecord } from '../types/scanner';
import {
  getScanHistory,
  deleteScanById,
  clearAllHistory,
  exportHistoryAsJson,
} from '../services/history';

export const History: React.FC = () => {
  const [history, setHistory] = useState<StoredScanRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<'all' | 'clean' | 'malicious' | 'rejected'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getScanHistory());
  };

  const handleDelete = (jobId: string) => {
    deleteScanById(jobId);
    loadHistory();
  };

  const handleClearAll = () => {
    clearAllHistory();
    loadHistory();
    setShowClearConfirm(false);
  };

  const handleRescan = (url: string) => {
    navigate('/scanner', { state: { prefillUrl: url } });
  };

  const handleViewDetails = (record: StoredScanRecord) => {
    navigate(`/results/${record.job_id}`, { state: { scanResult: record.raw_response } });
  };

  // Filter & Search Logic
  const filteredHistory = history
    .filter((item) => {
      const matchesSearch =
        item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hostname.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (verdictFilter === 'all') return true;
      if (verdictFilter === 'clean') return item.verdict_status === 'clean';
      if (verdictFilter === 'malicious') return item.verdict_status === 'malicious' || item.verdict_status === 'suspicious';
      if (verdictFilter === 'rejected') return item.verdict_status === 'rejected';

      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="space-y-8 py-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-['Fredoka'] font-bold text-[var(--foreground)]">
            Scan History
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Locally stored URL verification records preserved within your browser session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={exportHistoryAsJson}
                className="btn btn-outline btn-sm flex items-center gap-1.5"
                title="Download history as JSON"
              >
                <FileJson className="w-4 h-4" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="btn btn-ghost btn-sm text-[var(--destructive)] border-[var(--border)] hover:bg-[var(--destructive)] hover:text-white flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 bg-[var(--card)] border-[2.5px] border-[var(--border)] flex flex-col md:flex-row items-center gap-3 shadow-[var(--shadow-sm)]">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scans by URL or domain name..."
            className="input h-10 pl-9 pr-3 text-sm"
          />
        </div>

        {/* Verdict Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" />
          <select
            value={verdictFilter}
            onChange={(e) => setVerdictFilter(e.target.value as any)}
            className="input h-10 py-1 text-sm bg-[var(--card)] cursor-pointer"
          >
            <option value="all">All Verdicts</option>
            <option value="clean">Clean Only</option>
            <option value="malicious">Malicious / Flagged</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Sort order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="input h-10 py-1 text-sm bg-[var(--card)] cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* History Table / Records */}
      {filteredHistory.length === 0 ? (
        <div className="card p-12 text-center bg-[var(--card)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-sm)] space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--muted)] border-2 border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)]">
            <HistoryIcon className="w-8 h-8" />
          </div>
          <h3 className="font-['Fredoka'] font-bold text-2xl text-[var(--foreground)]">
            No Scan Records Found
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto">
            {history.length === 0
              ? 'You have not scanned any URLs in this session yet.'
              : 'No scanned records match your search filter parameters.'}
          </p>
          <div className="pt-2">
            <Link to="/scanner" className="btn btn-primary">
              Scan a URL Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-lg)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-md)] bg-[var(--card)]">
          <table className="table-memphis">
            <thead>
              <tr>
                <th>Target URL & Hostname</th>
                <th>Security Verdict</th>
                <th>Scan Date</th>
                <th>Duration</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => {
                const isClean = item.verdict_status === 'clean';
                const isMalicious = item.verdict_status === 'malicious' || item.verdict_status === 'suspicious';
                const badgeTone = isClean ? 'success' : isMalicious ? 'destructive' : 'warning';

                return (
                  <tr key={item.job_id}>
                    {/* URL */}
                    <td className="max-w-[280px]">
                      <div className="font-['Fredoka'] font-bold text-[var(--foreground)] truncate" title={item.url}>
                        {item.hostname}
                      </div>
                      <div className="text-xs font-['Space_Mono'] text-[var(--muted-foreground)] truncate" title={item.url}>
                        {item.url}
                      </div>
                    </td>

                    {/* Verdict */}
                    <td>
                      <span className="badge" data-tone={badgeTone}>
                        {item.risk_label || item.verdict_status.toUpperCase()}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="text-xs font-['Space_Mono'] text-[var(--muted-foreground)]">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>

                    {/* Duration */}
                    <td className="text-xs font-['Space_Mono']">
                      {item.duration_seconds ? `${item.duration_seconds.toFixed(2)}s` : 'N/A'}
                    </td>

                    {/* Action buttons */}
                    <td className="text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="btn btn-outline btn-sm h-8 px-2.5 text-xs flex items-center gap-1"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => handleRescan(item.url)}
                          className="btn btn-secondary btn-sm h-8 px-2.5 text-xs flex items-center gap-1"
                          title="Rescan URL"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rescan</span>
                        </button>

                        <button
                          onClick={() => handleDelete(item.job_id)}
                          className="p-1.5 rounded-lg border border-transparent hover:border-[var(--border)] hover:bg-[var(--destructive)] hover:text-white text-[var(--muted-foreground)] transition-colors cursor-pointer"
                          title="Delete Record"
                          aria-label="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal for Clearing History */}
      {showClearConfirm && (
        <div className="dialog-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-[var(--destructive)] mb-4">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
                Clear All Scan History?
              </h3>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              This will permanently delete all {history.length} locally saved scan records from your browser. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-[var(--border)]">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="btn btn-primary btn-sm bg-[var(--destructive)] hover:bg-[var(--destructive)] text-white"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
