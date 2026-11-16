# Phishing & Malicious URL Verification Engine
**Seminar Project #9 & #10** | Cyber Security & Web Systems

---

## 1. Project Overview & Seminar Defense
This project implements a deterministic link safety scanner modeled after commercial threat-intelligence tools like **Malwarebytes Scam-Check** and **VirusTotal**.

### Why No Machine Learning?
When presenting to professors, you can explain:
> *"Machine learning models for URL detection often behave like black boxes that can be fooled by adversarial string padding or slight character perturbations. Enterprise security engines rely on multi-stage deterministic checks (SSL handshake validation, DNS resolution, domain reputation, and structural lexical parsing) to guarantee zero-hallucination verdicts."*

---

## 2. The Five Inspection Stages

```
User Input URL
      │
      ├── 1. Lexical & Brand Inspection ────> Detects IP hosts, brand spoofing (e.g., paypal in .xyz), risky TLDs
      ├── 2. SSL/TLS Handshake Validation ──> Connects via Python ssl/socket to verify cert validity & expiry
      ├── 3. DNS Infrastructure Check ──────> Confirms active IP resolution and detects NXDOMAIN status
      ├── 4. Redirection & Unmasking ───────> Follows HTTP 301/302 hops to reveal hidden final landing URLs
      │
      ▼
Composite Threat Scoring Engine (0 to 100)
      ├── 0 – 15:  Clean (Normal domains like google.com, wikipedia.org)
      ├── 16 – 50: Suspicious (Uncommon configurations or missing HTTPS)
      └── 51 – 100: High Risk / Malicious (Spoofed brands, IP hosts, disposable TLDs)
```

---

## 3. Code Walkthrough (For Answering Professor Questions)

Everything is located in [**`scanner.py`**](file:///c:/Work/Discussion/link_shield/scanner.py):

1. **`extract_url_components(raw_url)`**: Uses Python's `urllib.parse` to split the string into `scheme`, `hostname`, `port`, and `path`.
2. **`check_lexical_structure(...)`**:
   - `re.match(r"^\d+\.\d+\.\d+\.\d+$", hostname)` checks if an IP was used instead of a domain name.
   - Checks if hostname ends with cheap disposable TLDs (`.xyz`, `.top`, `.tk`).
   - Scans for impersonated brand names (`paypal`, `netflix`, `bankofamerica`) appearing outside their official domain.
3. **`check_connection_security(...)`**:
   - Uses `socket.create_connection` + `ssl.create_default_context()` to verify the SSL certificate against the operating system's trusted root CA store.
4. **`check_navigation_redirects(...)`**:
   - Probes the URL with custom HTTP handlers to log each redirect hop.
5. **`analyze_url(...)`**:
   - Aggregates penalties into a 0–100 risk score and returns a clean JSON summary for the frontend.

---

## 4. How to Run the Project

1. Navigate to the project directory:
   ```powershell
   cd c:\Work\Discussion\link_shield
   ```
2. Start the lightweight server:
   ```powershell
   python server.py
   ```
3. Open your browser and go to:
   ```
   http://localhost:8080
   ```

---

## 5. Live Demo Test Cases to Show During Your Seminar

| URL to Paste | Expected Result | What It Demonstrates to Teacher |
| :--- | :--- | :--- |
| `https://www.google.com` | **Clean (Score: 0)** | Valid SSL certificate, trusted domain, zero penalty signals. |
| `https://www.wikipedia.org` | **Clean (Score: 0)** | Direct navigation path, authentic certificates, established root. |
| `http://paypal-verification.account-update.xyz/login` | **High Risk (Score: 100)** | Flags `.xyz` TLD, brand spoofing of PayPal, sensitive action terms (`login`, `verify`), and cleartext HTTP. |
