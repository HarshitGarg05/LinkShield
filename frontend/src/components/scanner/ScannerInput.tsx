import React, { useState } from 'react';
import { Search, Clipboard, X, AlertCircle, ArrowRight } from 'lucide-react';

interface ScannerInputProps {
  onScan: (url: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export const ScannerInput: React.FC<ScannerInputProps> = ({
  onScan,
  isLoading,
  initialValue = '',
}) => {
  const [url, setUrl] = useState(initialValue);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setValidationError(null);
      }
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    setUrl('');
    setValidationError(null);
  };

  const validateUrl = (raw: string): string | null => {
    const trimmed = raw.trim();
    if (!trimmed) {
      return 'Please enter a URL to scan.';
    }

    let testUrl = trimmed;
    if (!/^https?:\/\//i.test(testUrl)) {
      testUrl = 'http://' + testUrl;
    }

    try {
      const parsed = new URL(testUrl);
      if (!parsed.hostname || !parsed.hostname.includes('.')) {
        return 'Please enter a valid domain address (e.g., example.com or https://secure-login.net).';
      }
    } catch {
      return 'The URL structure is invalid. Please double-check the address.';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const error = validateUrl(url);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    onScan(url.trim());
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div
          className={`relative flex items-center bg-[var(--card)] border-[2.5px] border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] focus-within:shadow-[var(--shadow-lg)] transition-all ${
            validationError ? 'border-[var(--destructive)]' : ''
          }`}
        >
          {/* Search Icon */}
          <div className="pl-4 pr-2 text-[var(--muted-foreground)]">
            <Search className="w-6 h-6" />
          </div>

          {/* Input Element */}
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Paste suspicious URL here (e.g., http://login-verify-account.tk)..."
            disabled={isLoading}
            className="w-full h-14 md:h-16 py-2 px-2 bg-transparent text-[var(--foreground)] placeholder-[var(--muted-foreground)] font-['Nunito'] text-base md:text-lg outline-none"
            aria-label="URL to inspect"
          />

          {/* Quick utility buttons inside input */}
          <div className="flex items-center gap-1.5 pr-3">
            {url && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-full hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                title="Clear Input"
                aria-label="Clear input"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {!url && !isLoading && (
              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-['Fredoka'] font-semibold bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] rounded-md hover:bg-[var(--accent)] transition-colors cursor-pointer"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                Paste
              </button>
            )}

            {/* Scan Button (Integrated in Desktop) */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary h-11 md:h-12 px-5 text-base md:text-lg flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Scan URL</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] border-2 border-[var(--destructive)] text-[var(--destructive)] rounded-[var(--radius-md)] text-sm font-semibold shadow-[var(--shadow-sm)] animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </form>
    </div>
  );
};
