/* あみだくじ班分け — オフラインキャッシュ用 Service Worker */
const CACHE = "amida-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      // 同一オリジンに他アプリ（suibou等）のキャッシュが同居するため、amida- のみ削除する
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k.startsWith("amida-")).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  // 同一オリジンのGETのみ扱う。外部サイト・他メソッドはブラウザの既定処理に任せる。
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request))
  );
});
