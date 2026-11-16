import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Globe,
  Database,
  Search,
  Code,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const detectionPipeline = [
    {
      step: '01',
      title: 'URL Normalization & Host Validation',
      desc: 'Trims whitespace, validates protocol structure, and checks RFC specifications. Rejects private IP addresses (RFC 1918) and loopback interfaces to prevent SSRF vulnerabilities.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Blocklist Hash Matching',
      desc: 'Matches domains and target URLs in O(1) time against threat intelligence feeds (including URLhaus and OpenPhish) and local blacklist hash sets.',
      icon: Database,
    },
    {
      step: '03',
      title: 'Levenshtein Typosquatting Analysis',
      desc: 'Calculates string edit distance against major brand names (Google, PayPal, Apple, Microsoft) to catch single-character substitutions or omitted letters.',
      icon: ShieldAlert,
    },
    {
      step: '04',
      title: 'Punycode & Homoglyph Detection',
      desc: 'Identifies non-ASCII Cyrillic, Greek, or Unicode characters disguised as standard Latin letters (homograph attacks like "googӏe.com").',
      icon: Globe,
    },
    {
      step: '05',
      title: 'HTML Form & Input Audit',
      desc: 'Inspects page markup for password input fields transmitted over plain HTTP, as well as form actions submitting credentials to external third-party hosts.',
      icon: Code,
    },
    {
      step: '06',
      title: 'DNS Resolution & TLS Probing',
      desc: 'Queries A/AAAA records via Cloudflare Anycast DoH to confirm real host routing, inspects certificate validity dates, and flags unencrypted HTTP.',
      icon: Lock,
    },
    {
      step: '07',
      title: 'Trust Score Synthesis',
      desc: 'Weighs 10 heuristic signals and database matches to calculate a final 0-100 trust score with itemized penalty reasons.',
      icon: FileCheck,
    },
  ];

  const concepts = [
    {
      term: 'Phishing',
      def: 'A social engineering attack where malicious actors pose as trustworthy entities to deceive victims into disclosing credentials, financial data, or sensitive tokens.',
    },
    {
      term: 'Typosquatting',
      def: 'The registration of deceptive domain names that exploit common typing mistakes or visually similar characters to lure unsuspecting users.',
    },
    {
      term: 'HTTPS / TLS',
      def: 'Encrypted communication between your browser and the web server. Crucially, HTTPS only encrypts the connection—it does NOT mean the recipient is honest or safe.',
    },
    {
      term: 'Threat Intelligence',
      def: 'Structured cyber threat evidence aggregated by security analysts and feeds to identify malicious IPs, command & control servers, and attack campaigns.',
    },
  ];

  const faqs = [
    {
      q: 'Does an HTTPS green lock guarantee a website is safe?',
      a: 'No. HTTPS only proves that the connection between your device and the destination server is encrypted against eavesdropping. Today, over 80% of phishing portals utilize valid SSL certificates (e.g., from Let\'s Encrypt). Link Shield checks content and reputation beyond basic TLS.',
    },
    {
      q: 'How does Link Shield detect lookalike domain names?',
      a: 'Link Shield calculates the Levenshtein edit distance between the target hostname and a corpus of high-target brands (such as PayPal, Google, Amazon, Microsoft). If the difference is 1-2 character edits or contains homoglyphs, it is flagged as a potential typosquatting attack.',
    },
    {
      q: 'Can a safe-looking URL still be malicious?',
      a: 'Yes. Attackers frequently use URL shortening services, open redirects, or newly registered domains that haven\'t yet appeared on threat blacklists. That is why LINK SHIELD employs multi-layer inspection instead of relying on blacklist lookups alone.',
    },
    {
      q: 'Why might a scan be rejected?',
      a: 'Link Shield rejects private intranet addresses (e.g., 192.168.x.x, 10.x.x.x, localhost) and unsupported non-HTTP protocols to enforce host safety policies and prevent Server-Side Request Forgery (SSRF).',
    },
    {
      q: 'Does LINK SHIELD store or log my scanned URLs on a remote server?',
      a: 'No. The local Python backend operates statelessly. All previous scan records and history you see in the interface are preserved solely in your browser\'s local storage.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-['Fredoka'] font-bold text-[var(--foreground)]">
          How LINK SHIELD Works
        </h1>
        <p className="text-base text-[var(--muted-foreground)] max-w-xl mx-auto">
          An educational breakdown of our multi-stage inspection pipeline, detection algorithms, and cybersecurity fundamentals.
        </p>
      </div>

      {/* Pipeline Steps */}
      <section className="space-y-6">
        <div className="border-b-2 border-[var(--border)] pb-3">
          <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
            Inspection Pipeline
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Each URL passes sequentially through 7 distinct defensive verification layers:
          </p>
        </div>

        <div className="space-y-4">
          {detectionPipeline.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card p-5 bg-[var(--card)] border-[2.5px] border-[var(--border)] flex flex-col sm:flex-row items-start gap-4 shadow-[var(--shadow-sm)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)] border-2 border-[var(--border)] flex items-center justify-center font-['Fredoka'] font-bold text-lg text-[var(--foreground)] shrink-0 shadow-[2px_2px_0_var(--border)]">
                  {step.step}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--primary)]" />
                    <h3 className="font-['Fredoka'] font-bold text-lg text-[var(--foreground)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security Fundamentals Concept Cards */}
      <section className="space-y-6">
        <div className="border-b-2 border-[var(--border)] pb-3">
          <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
            Key Web Security Concepts
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Understanding the core differences between web technologies and attack vectors:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {concepts.map((concept, idx) => (
            <div key={idx} className="card p-5 bg-[var(--card)] border-[2.5px] border-[var(--border)] space-y-2">
              <span className="badge badge-warning text-xs font-['Space_Mono']">
                Core Term
              </span>
              <h3 className="font-['Fredoka'] font-bold text-xl text-[var(--foreground)]">
                {concept.term}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {concept.def}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="space-y-6">
        <div className="border-b-2 border-[var(--border)] pb-3">
          <h2 className="text-2xl font-['Fredoka'] font-bold text-[var(--foreground)]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Common questions regarding link security, scanner limitations, and privacy:
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="card p-0 bg-[var(--card)] border-[2.5px] border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 flex items-center justify-between text-left font-['Fredoka'] font-bold text-base md:text-lg text-[var(--foreground)] hover:bg-[var(--muted)]/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 ml-4 bg-[var(--card)]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 border-t border-[var(--border)] text-sm text-[var(--muted-foreground)] leading-relaxed bg-[var(--card)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
