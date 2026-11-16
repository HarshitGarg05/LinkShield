import type { ScanResponse, StoredScanRecord } from '../types/scanner';

const STORAGE_KEY = 'link_shield_scan_history_v1';

export function getScanHistory(): StoredScanRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read scan history from localStorage:', e);
    return [];
  }
}

export function saveScanToHistory(scan: ScanResponse): StoredScanRecord {
  const history = getScanHistory();
  
  const record: StoredScanRecord = {
    job_id: scan.job_id || `SCAN_${Date.now()}`,
    url: scan.url,
    hostname: scan.hostname || (scan.url ? new URL(scan.url.startsWith('http') ? scan.url : `http://${scan.url}`).hostname : 'Unknown'),
    verdict_status: (scan.verdict?.combined_verdict || (scan.status === 'REJECTED' ? 'rejected' : 'unknown')) as any,
    risk_label: scan.verdict?.risk_label || (scan.status === 'REJECTED' ? 'Rejected' : 'Unknown'),
    timestamp: scan.timestamp || new Date().toISOString(),
    duration_seconds: scan.statistics?.duration_seconds,
    raw_response: scan,
  };

  // Prepend new record, avoid identical duplicate job_ids
  const filtered = history.filter((item) => item.job_id !== record.job_id);
  const updated = [record, ...filtered].slice(0, 50); // limit to last 50 scans

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save scan record to localStorage:', e);
  }

  return record;
}

export function getScanById(scanId: string): StoredScanRecord | undefined {
  const history = getScanHistory();
  return history.find((item) => item.job_id === scanId);
}

export function deleteScanById(scanId: string): void {
  const history = getScanHistory();
  const updated = history.filter((item) => item.job_id !== scanId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearAllHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportHistoryAsJson(): void {
  const history = getScanHistory();
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `link-shield-history-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
