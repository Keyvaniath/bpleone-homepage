// show-sw.js — service worker for show.html (PWA install + offline cache)
// =====================================================================
// Pre-caches the page shell + the homepage_feed.json snapshot so card-show
// lookups work even on flaky con-floor WiFi. Background-revalidates the
// feed every load (stale-while-revalidate pattern).

const CACHE = 'show-mode-v1';
const CORE = [
  '/show.html',
  '/show-manifest.json',
  '/homepage_feed.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Only handle GETs to our own origin
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  // homepage_feed.json — stale-while-revalidate (fast page, freshest data when online)
  if (url.pathname.endsWith('/homepage_feed.json')) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const network = fetch(event.request).then(resp => {
            if (resp.ok) cache.put(event.request, resp.clone());
            return resp;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // Page shell — cache-first with background update
  if (CORE.some(p => url.pathname.endsWith(p))) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
        if (resp.ok) caches.open(CACHE).then(c => c.put(event.request, resp.clone()));
        return resp;
      }))
    );
  }
});
