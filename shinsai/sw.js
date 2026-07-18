/* 西消防署 震災タスク — オフラインキャッシュ用 Service Worker */
const CACHE = "shinsai-v2";
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
      // 同一オリジンに他アプリ（suibou・amida）のキャッシュが同居するため、shinsai- のみ削除する
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k.startsWith("shinsai-")).map((k) => caches.delete(k))))
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
