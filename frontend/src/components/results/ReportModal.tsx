import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle, Flag } from 'lucide-react';
import { submitReport } from '../../services/api';

interface ReportModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ url, isOpen, onClose }) => {
  const [reason, setReason] = useState('Suspected phishing');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMsg(null);
    setIsError(false);

    try {
      const res = await submitReport({
        url,
        reason,
        details,
      });
      setIsSubmitting(false);
      setResponseMsg(res.message || 'Report submitted successfully. Thank you!');
    } catch (err: any) {
      setIsSubmitting(false);
      setIsError(true);
      setResponseMsg(err.message || 'Failed to submit report. Please check backend connection.');
    }
  };

  return (
    <div className="dialog-overlay animate-in fade-in" onClick={onClose}>
      <div
        className="dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[var(--border)] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center border-2 border-[var(--border)]">
              <Flag className="w-5 h-5" />
            </div>
            <h3 id="report-modal-title" className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
              Report Suspicious Link
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[var(--muted)] border border-transparent hover:border-[var(--border)] text-[var(--foreground)] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {responseMsg ? (
          <div className="text-center py-6 space-y-4">
            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center border-2 border-[var(--border)] ${
              isError ? 'bg-[var(--destructive)] text-white' : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'
            }`}>
              {isError ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
            </div>
            <h4 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
              {isError ? 'Submission Failed' : 'Submission Acknowledged'}
            </h4>
            <p className="text-sm text-[var(--muted-foreground)]">
              {responseMsg}
            </p>
            <div className="pt-4">
              <button onClick={onClose} className="btn btn-outline w-full justify-center">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
                Reported Address
              </label>
              <input
                type="text"
                readOnly
                value={url}
                className="input bg-[var(--muted)] cursor-not-allowed text-sm font-['Space_Mono']"
              />
            </div>

            <div>
              <label className="block text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
                Threat Classification
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input bg-[var(--card)] text-sm cursor-pointer"
              >
                <option value="Suspected phishing">Suspected phishing</option>
                <option value="Brand impersonation">Brand impersonation</option>
                <option value="Suspicious login page">Suspicious login page</option>
                <option value="Malware or malicious download">Malware or malicious download</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="What suspicious behavior did you observe on this page?"
                rows={3}
                className="input h-auto py-2.5 text-sm resize-none"
              />
            </div>

            <div className="p-3 bg-[var(--muted)]/50 border border-[var(--border)] rounded-lg text-xs text-[var(--muted-foreground)]">
              Note: This report submits diagnostic observations to the local backend verification registry.
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-[var(--border)]">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
