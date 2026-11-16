import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { getScreenshotUrl } from '../../services/api';

interface ScreenshotPreviewProps {
  screenshotUrl?: string | null;
  targetUrl: string;
}

export const ScreenshotPreview: React.FC<ScreenshotPreviewProps> = ({
  screenshotUrl,
  targetUrl,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const resolvedUrl = getScreenshotUrl(screenshotUrl);

  if (!resolvedUrl || loadError) {
    return (
      <div className="card p-6 bg-[var(--card)] border-[2.5px] border-[var(--border)] text-center flex flex-col items-center justify-center min-h-[220px]">
        <div className="w-12 h-12 rounded-full bg-[var(--muted)] border-2 border-[var(--border)] flex items-center justify-center mb-3 text-[var(--muted-foreground)]">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h4 className="font-['Fredoka'] font-bold text-base text-[var(--foreground)] mb-1">
          Website Preview Unavailable
        </h4>
        <p className="text-xs text-[var(--muted-foreground)] max-w-xs">
          Headless visual capture was not generated or the upstream sandbox proxy did not return rendered frames.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="card p-4 bg-[var(--card)] border-[2.5px] border-[var(--border)] relative group">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[var(--primary)]" />
            <h4 className="font-['Fredoka'] font-bold text-base text-[var(--foreground)]">
              Sandbox Visual Capture
            </h4>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-outline btn-sm text-xs py-1 px-2.5 h-8 flex items-center gap-1.5"
            title="Expand Full Screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Expand
          </button>
        </div>

        {/* Thumbnail Container */}
        <div
          onClick={() => setModalOpen(true)}
          className="relative rounded-lg overflow-hidden border-2 border-[var(--border)] bg-black/5 cursor-pointer max-h-[240px] flex items-center justify-center group-hover:shadow-[var(--shadow-sm)] transition-all"
        >
          <img
            src={resolvedUrl}
            alt={`Rendered capture of ${targetUrl}`}
            onError={() => setLoadError(true)}
            className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="px-3 py-1.5 rounded-full bg-[var(--card)] text-[var(--foreground)] font-['Fredoka'] font-bold text-xs border border-[var(--border)] shadow-[var(--shadow-sm)]">
              Click to view full image
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {modalOpen && (
        <div
          className="dialog-overlay animate-in fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="dialog max-w-4xl p-4 bg-[var(--card)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[var(--border)]">
              <span className="font-['Space_Mono'] text-xs font-bold text-[var(--foreground)] truncate max-w-md">
                Live Screenshot: {targetUrl}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[var(--muted)] border border-transparent hover:border-[var(--border)] cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-lg border-2 border-[var(--border)]">
              <img
                src={resolvedUrl}
                alt={`Expanded capture of ${targetUrl}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
