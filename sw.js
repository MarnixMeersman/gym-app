/* bump C on every deploy, together with APP_VERSION in index.html */
const C = "ironlog-v6";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(ASSETS)));
  /* no skipWaiting() here — activation is gated by the in-app update banner */
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const nav = e.request.mode === "navigate" || /(\/|index\.html)$/.test(url.pathname);
  if (nav) {
    /* network-first: new deploys arrive automatically; cache fallback keeps offline working */
    e.respondWith(
      fetch(e.request).then(r => {
        const cp = r.clone();
        caches.open(C).then(c => c.put("./index.html", cp));
        return r;
      }).catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
  } else {
    /* cache-first for static assets, populate on miss */
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp.ok && url.origin === location.origin) {
        const cp = resp.clone();
        caches.open(C).then(c => c.put(e.request, cp));
      }
      return resp;
    })));
  }
});
