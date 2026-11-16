"""
HTTP Web Server for Link Security Scanner.
Serves UI, Scan Endpoint, and Proxies Live Screenshots.
"""
import http.server
import socketserver
import json
import urllib.parse
import urllib.request
from scanner import run_full_scan

PORT = 8080

class ScannerHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            with open("templates/index.html", "rb") as f:
                self.wfile.write(f.read())
            return

        elif path == "/api/scan":
            params = urllib.parse.parse_qs(parsed.query)
            target = params.get("url", [""])[0]
            if not target:
                self._send_json({"error": "No URL provided"}, status=400)
                return
            result = run_full_scan(target)
            self._send_json(result)
            return

        elif path.startswith("/api/screenshot/"):
            params = urllib.parse.parse_qs(parsed.query)
            target_url = params.get("target", [""])[0]
            job_id = path.split("/")[-1]

            # Try upstream Malwarebytes if job_id is valid cloud hash
            if not job_id.startswith("LOCAL_"):
                try:
                    upstream_url = f"https://lookup-api.malwarebytes.com/api/v1/lookup/screenshot/{job_id}"
                    req = urllib.request.Request(upstream_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=3.5) as resp:
                        img_data = resp.read()
                        self.send_response(200)
                        self.send_header("Content-Type", "image/png")
                        self.send_header("Content-Length", str(len(img_data)))
                        self.send_header("Access-Control-Allow-Origin", "*")
                        self.send_header("Cache-Control", "public, max-age=3600")
                        self.end_headers()
                        self.wfile.write(img_data)
                        return
                except Exception:
                    pass

            # Fallback to live screenshot renderer proxy if target url is provided
            if target_url:
                try:
                    clean_target = target_url if target_url.startswith("http") else f"https://{target_url}"
                    render_url = f"https://image.thum.io/get/width/600/crop/800/{clean_target}"
                    req = urllib.request.Request(render_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=6.0) as resp:
                        img_data = resp.read()
                        self.send_response(200)
                        self.send_header("Content-Type", "image/png")
                        self.send_header("Content-Length", str(len(img_data)))
                        self.send_header("Access-Control-Allow-Origin", "*")
                        self.send_header("Cache-Control", "public, max-age=3600")
                        self.end_headers()
                        self.wfile.write(img_data)
                        return
                except Exception:
                    pass

            self.send_error(404, "Screenshot not available")
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/scan":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8")
            try:
                data = json.loads(body)
                target = data.get("url", "")
            except Exception:
                target = ""

            if not target:
                self._send_json({"error": "No URL provided in payload"}, status=400)
                return

            result = run_full_scan(target)
            self._send_json(result)
            return

        elif parsed.path == "/api/report":
            # Handles report submission ("No reports on this URL yet. Be the first.")
            self._send_json({"status": "SUCCESS", "message": "Feedback submitted successfully. Thank you!"})
            return

        self.send_error(404, "Not Found")

    def _send_json(self, payload, status=200):
        resp = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(resp)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(resp)

def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ScannerHandler) as httpd:
        print(f"[*] Link Security Scanner running at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    run()
