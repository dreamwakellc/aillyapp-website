import http.server, socketserver, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        p = self.path.split('?')[0].rstrip('/')
        if p in ('', '/'): self.path = '/index.html'
        elif not os.path.splitext(p)[1] and os.path.exists('.'+p+'.html'):
            self.path = p + '.html'   # clean URL → .html (like Cloudflare Pages)
        return super().do_GET()
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", 8801), H) as s:
    s.serve_forever()
