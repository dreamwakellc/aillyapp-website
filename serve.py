import http.server, socketserver, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        p = self.path.split('?')[0]
        if p != '/' and not os.path.splitext(p)[1]:
            cand = p.lstrip('/') + '.html'
            if os.path.isfile(os.path.join(os.getcwd(), cand)):
                self.path = '/' + cand
        return super().send_head()
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
socketserver.TCPServer(("127.0.0.1", 8000), H).serve_forever()
