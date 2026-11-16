import { jsPDF } from 'jspdf';
import type { ScanResponse } from '../types/scanner';

export function generateScanPdfReport(scan: ScanResponse): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor: [number, number, number] = [214, 40, 57]; // #d62839
  const darkInk: [number, number, number] = [27, 21, 48]; // #1b1530
  const creamBg: [number, number, number] = [255, 246, 223]; // #fff6df

  // Page background header banner
  doc.setFillColor(...creamBg);
  doc.rect(0, 0, 210, 45, 'F');
  doc.setDrawColor(...darkInk);
  doc.setLineWidth(0.8);
  doc.line(0, 45, 210, 45);

  // Logo / Title
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('LINK SHIELD', 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(...darkInk);
  doc.setFont('helvetica', 'normal');
  doc.text('Phishing & Malicious URL Verification System — Security Inspection Report', 20, 28);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 36);

  // Meta box
  let y = 55;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...darkInk);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Target URL:', 25, y + 8);
  doc.setFont('helvetica', 'normal');
  const splitUrl = doc.splitTextToSize(scan.url || 'N/A', 130);
  doc.text(splitUrl, 52, y + 8);

  const urlLines = Array.isArray(splitUrl) ? splitUrl.length : 1;
  const currentY = y + 8 + (urlLines * 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Hostname:', 25, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(scan.hostname || 'N/A', 52, currentY);

  doc.setFont('helvetica', 'bold');
  doc.text('Job ID:', 25, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(scan.job_id || 'N/A', 52, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Scan Time:', 110, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(scan.timestamp ? new Date(scan.timestamp).toLocaleTimeString() : 'N/A', 135, currentY + 6);

  // Verdict Section
  y = 100;
  const verdict = scan.verdict?.combined_verdict || (scan.status === 'REJECTED' ? 'rejected' : 'unknown');
  const isClean = verdict === 'clean';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkInk);
  doc.text('1. Security Verdict Summary', 20, y);

  y += 6;
  doc.setFillColor(isClean ? 185 : 255, isClean ? 232 : 234, isClean ? 214 : 189);
  doc.roundedRect(20, y, 170, 24, 3, 3, 'FD');

  doc.setFontSize(12);
  doc.setTextColor(...darkInk);
  doc.text(`VERDICT: ${(scan.verdict?.risk_label || verdict).toUpperCase()}`, 26, y + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(scan.verdict?.headline || (scan.status === 'REJECTED' ? 'Scan was rejected by host security policy.' : 'Evaluation completed.'), 26, y + 14);
  doc.text(scan.verdict?.description || 'Always verify links before providing sensitive credentials.', 26, y + 19);

  // Indicators
  y += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('2. Threat Indicators', 20, y);

  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Blacklist Flag:', 25, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(scan.tier1_blacklisted ? 'DETECTED (Known Malicious Target)' : 'Not detected in local/cloud threat blacklists', 60, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Typosquatting:', 25, y + 14);
  doc.setFont('helvetica', 'normal');
  doc.text(scan.typosquat_detected ? 'DETECTED (Lookalike / Impersonation pattern)' : 'Not detected', 60, y + 14);

  // Detailed checks
  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('3. Security Inspection Details', 20, y);

  const checks = scan.verdict_details?.checks || [];
  y += 6;

  checks.forEach((chk, index) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...darkInk);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, y, 170, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${index + 1}. ${chk.title || chk.category}`, 24, y + 5);

    doc.setFont('helvetica', 'bold');
    const chkVerdict = (chk.verdict || 'clean').toUpperCase();
    doc.setTextColor(chkVerdict === 'CLEAN' ? 14 : 214, chkVerdict === 'CLEAN' ? 122 : 40, chkVerdict === 'CLEAN' ? 84 : 57);
    doc.text(chkVerdict, 160, y + 5);

    doc.setTextColor(...darkInk);
    doc.setFont('helvetica', 'normal');
    const reasonText = doc.splitTextToSize(chk.reason || 'No detailed log available.', 160);
    doc.text(reasonText, 24, y + 10);

    y += 18;
  });

  // Footer Disclaimer
  if (y > 250) {
    doc.addPage();
    y = 20;
  } else {
    y = 265;
  }

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(91, 79, 102);
  doc.text('Disclaimer: LINK SHIELD verifies known indicators and heuristics at the time of scan.', 20, y);
  doc.text('A "clean" verdict means no active threats were identified in inspected sources; zero-day phishing or newly compromised hosts may evolve.', 20, y + 4);

  // Save PDF
  const filename = `LinkShield_Report_${(scan.hostname || 'scan').replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
  doc.save(filename);
}
