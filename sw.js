// bpleone.com service worker — offline cache + freshness for the trading hub.
// Strategy:
//   - HTML pages: network-first with cache fallback (always try fresh, fall back if offline)
//   - Static assets (CSS/JS/SVG/JSON): cache-first with revalidation
//   - Live feeds (homepage_feed.json / market_brief.json): network-first, short TTL
const CACHE_VERSION = 'bpleone-v1';
const CORE_ASSETS = [
  '/',
  '/cards.html',
  '/card.html',
  '/compare.html',
  '/methodology.html',
  '/changelog.html',
  '/about.html',
  '/roadmap.html',
  '/press.html',
  '/icon.svg',
  '/og.svg',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // Live feeds: network-first
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(r => {
          const clone = r.clone();
          caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
          return r;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML / others: cache-first with background revalidate
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(r => {
        const clone = r.clone();
        caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
        return r;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
