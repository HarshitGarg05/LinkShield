export interface ScanCheck {
  category: string;
  title: string;
  verdict: 'clean' | 'suspicious' | 'malicious' | 'flagged' | 'unknown';
  reason: string;
  details?: Record<string, any>;
}

export interface ScanVerdict {
  combined_verdict: 'clean' | 'suspicious' | 'malicious' | 'rejected' | 'unknown';
  risk_label: string;
  headline: string;
  description: string;
}

export interface ScanStatistics {
  duration_seconds?: number;
  total_requests?: number;
  https_ratio?: number;
  request_bytes?: number;
  transfer_bytes?: number;
  domain_count?: number;
  ip_count?: number;
  link_count?: number;
  certificate_count?: number;
  cookie_count?: number;
  file_count?: number;
  server_location?: string;
  [key: string]: any;
}

export interface HeuristicSignal {
  name: string;
  status: 'clean' | 'flagged' | 'unknown';
  label: string;
}

export interface ThreatDbCheck {
  name: string;
  status: 'clean' | 'flagged' | 'unknown' | 'N/A';
}

export interface TrustAssessment {
  score: number;
  max_score: number;
  penalties: string[];
  signals: HeuristicSignal[];
  threat_databases: ThreatDbCheck[];
}

export interface ScanResponse {
  job_id: string;
  url: string;
  hostname: string;
  status: 'COMPLETED' | 'REJECTED' | 'FAILED' | 'PENDING' | 'ERROR';
  tier1_blacklisted?: boolean;
  typosquat_detected?: boolean;
  trust_score?: number;
  trust_assessment?: TrustAssessment;
  verdict?: ScanVerdict;
  screenshot_url?: string | null;
  verdict_details?: {
    checks: ScanCheck[];
  };
  statistics?: ScanStatistics;
  error_type?: string;
  message?: string;
  error?: string;
  timestamp?: string; // Client recorded
}

export interface StoredScanRecord {
  job_id: string;
  url: string;
  hostname: string;
  verdict_status: 'clean' | 'malicious' | 'suspicious' | 'rejected' | 'unknown';
  risk_label: string;
  timestamp: string;
  duration_seconds?: number;
  raw_response: ScanResponse;
}

export interface ReportPayload {
  url: string;
  reason: string;
  details?: string;
}

export interface ReportResponse {
  status: string;
  message: string;
}
