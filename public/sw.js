/* AEROMUSTER offline cache — safety content only, no personal data. */
const CACHE = "aeromuster-offline-v2";
const PRECACHE = [
  "/",
  "/map",
  "/evacuation",
  "/navigate",
  "/alerts",
  "/img/bg.jpg",
  "/img/logo.png",
  "/img/avatar.jpg",
  "/img/crk-level12.svg",
  "/img/crk-level3.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages: network first so content is never stale, cached copy when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || (await caches.match("/map")) || (await caches.match("/")) || Response.error();
        }),
    );
    return;
  }

  // Maps and artwork: cache first, refresh in the background.
  const isImage = request.destination === "image" || url.pathname.startsWith("/img/");
  if (!isImage) return;

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached),
    ),
  );
});
