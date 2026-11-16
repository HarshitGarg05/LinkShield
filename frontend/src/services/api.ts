import type { ScanResponse, ReportPayload, ReportResponse } from '../types/scanner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export class ApiError extends Error {
  status?: number;
  errorType?: string;
  constructor(message: string, status?: number, errorType?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorType = errorType;
  }
}

/**
 * Scan a URL via Link Shield backend.
 */
export async function scanUrl(targetUrl: string, signal?: AbortSignal): Promise<ScanResponse> {
  const cleanUrl = targetUrl.trim();
  if (!cleanUrl) {
    throw new ApiError('Please enter a valid URL to analyze.');
  }

  const endpoint = `${API_BASE_URL}/api/scan`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: cleanUrl }),
      signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw err;
    }
    throw new ApiError(
      'Could not connect to the Link Shield backend server at http://localhost:8080. Please ensure the backend is running.',
      0
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new ApiError('Received an unparseable response from the backend server.', response.status);
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Scan request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status, data?.error_type);
  }

  // Handle REJECTED responses (e.g., localhost, private IPs, unsupported schemes)
  if (data.status === 'REJECTED') {
    return {
      job_id: data.job_id || `REJECTED_${Date.now()}`,
      url: cleanUrl,
      hostname: data.hostname || 'Unresolved',
      status: 'REJECTED',
      error_type: data.error_type,
      message: data.message || 'Scan was rejected by security policy.',
      timestamp: new Date().toISOString(),
      verdict: {
        combined_verdict: 'rejected',
        risk_label: 'Rejected',
        headline: 'Scan Request Rejected',
        description: data.message || 'Only public internet hosts can be analyzed.',
      },
      verdict_details: {
        checks: [
          {
            category: 'policy_rejection',
            title: 'Policy Inspection',
            verdict: 'flagged',
            reason: data.message || 'Target does not meet public host requirements.',
          },
        ],
      },
      statistics: {
        duration_seconds: 0,
      },
    };
  }

  // Attach client timestamp
  return {
    ...data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Submit feedback / report suspicious URL
 */
export async function submitReport(payload: ReportPayload): Promise<ReportResponse> {
  const endpoint = `${API_BASE_URL}/api/report`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new ApiError(`Failed to submit report. Server responded with ${response.status}`);
  }

  return response.json();
}

/**
 * Resolve screenshot proxy URL safely
 */
export function getScreenshotUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) return null;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  return `${API_BASE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}
