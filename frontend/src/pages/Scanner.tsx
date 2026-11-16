import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Info, AlertTriangle } from 'lucide-react';
import { ScannerInput } from '../components/scanner/ScannerInput';
import { ScanningProgress } from '../components/scanner/ScanningProgress';
import { scanUrl } from '../services/api';
import { saveScanToHistory } from '../services/history';

export const Scanner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleExecuteScan = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await scanUrl(url);
      const record = saveScanToHistory(response);
      setIsLoading(false);
      navigate(`/results/${record.job_id}`, { state: { scanResult: response } });
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(
        err.message || 'Unable to complete scan. Please ensure the backend server is running at http://localhost:8080.'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--muted)] border-2 border-[var(--border)] text-xs font-['Space_Mono'] font-bold uppercase">
          <Shield className="w-4 h-4 text-[var(--primary)]" />
          <span>Security Analysis Workspace</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-['Fredoka'] font-bold text-[var(--foreground)]">
          URL Security Scanner
        </h1>
        <p className="text-base text-[var(--muted-foreground)] max-w-xl mx-auto">
          Submit any web address or shortened link to execute comprehensive threat identification, domain integrity checks, and heuristic safety analysis.
        </p>
      </div>

      {/* Main input card */}
      <div className="card p-6 md:p-8 bg-[var(--card)] border-[2.5px] border-[var(--border)] shadow-[var(--shadow-lg)]">
        <ScannerInput onScan={handleExecuteScan} isLoading={isLoading} />

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-[var(--destructive)]/10 border-2 border-[var(--destructive)] text-[var(--destructive)] space-y-2">
            <div className="flex items-center gap-2 font-bold text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Inspection Error Encountered</span>
            </div>
            <p className="text-sm font-medium">{errorMessage}</p>
            <div className="pt-2">
              <button
                onClick={() => setErrorMessage(null)}
                className="btn btn-outline btn-sm text-xs bg-[var(--card)]"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Informative Guidance */}
        <div className="mt-6 pt-6 border-t-2 border-[var(--border)] flex items-start gap-3 text-xs md:text-sm text-[var(--muted-foreground)]">
          <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[var(--foreground)]">Inspection Scope:</span>
            <p>
              Scans evaluate blacklist records, detect punycode & typosquatting mimics of popular platforms (Google, PayPal, Microsoft, Apple, Banks), inspect SSL certificates, and check DOM forms for credential theft signatures.
            </p>
          </div>
        </div>
      </div>

      {/* Indeterminate Progress experience while active */}
      {isLoading && <ScanningProgress />}
    </div>
  );
};
