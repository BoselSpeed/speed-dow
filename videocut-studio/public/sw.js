const CACHE_VERSION = "videocut-studio-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

const STATIC_ASSETS = [
  "/",
  "/editor/new",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.svg",
  "/icons/icon-512x512.svg",
  "/favicon.ico",
];

const STATIC_EXTENSIONS = [".js", ".css", ".mjs", ".json", ".svg", ".png", ".ico", ".woff", ".woff2", ".ttf"];

const FONT_EXTENSIONS = [".woff", ".woff2", ".ttf", ".otf"];
const IMAGE_EXTENSIONS = [".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif", ".ico"];

const isFont = (url: string) => FONT_EXTENSIONS.some((ext) => url.endsWith(ext));
const isImage = (url: string) => IMAGE_EXTENSIONS.some((ext) => url.endsWith(ext));
const isStatic = (url: string) => {
  return STATIC_ASSETS.some((staticUrl) => url.endsWith(staticUrl)) || STATIC_EXTENSIONS.some((ext) => url.endsWith(ext));
};

const cacheAndRespond = async (request: Request, cacheName: string, matchFn = (_request: Request) => _request.clone()) => {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request.clone());
    if (!response || response.status !== 200) return response;
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch {
    return new Response("NETWORK_ERROR", { status: 408, statusText: "Network Error" });
  }
};

const getCacheKey = (url: string) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.pathname}${urlObj.search}`;
  } catch {
    return url;
  }
};

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(STATIC_ASSETS);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key.startsWith(CACHE_VERSION) && ![STATIC_CACHE, DYNAMIC_CACHE, FONT_CACHE, IMAGE_CACHE].includes(key)) {
            return caches.delete(key);
          }
        }),
      );
      await self.clients.claim();
      const allClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      await Promise.all(
        allClients.map((client) => {
          return client.postMessage({ type: "UPDATE_AVAILABLE" });
        }),
      );
    })(),
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!url.protocol.startsWith("http")) return;

  if (isFont(url.href)) {
    event.respondWith(cacheAndRespond(request, FONT_CACHE));
    return;
  }
  if (isImage(url.href)) {
    event.respondWith(cacheAndRespond(request, IMAGE_CACHE));
    return;
  }
  if (isStatic(url.href)) {
    event.respondWith(cacheAndRespond(request, STATIC_CACHE));
    return;
  }
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (response && response.status === 200) {
          const cache = await caches.open(DYNAMIC_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        const offlineFallback = await caches.match("/offline");
        if (offlineFallback) return offlineFallback;
        return new Response("OFFLINE", { status: 503, statusText: "Service Unavailable" });
      }
    })(),
  );
});

self.addEventListener("message", async (event: ExtendableMessageEvent) => {
  const message = event.data;
  if (!message || typeof message !== "object") return;

  switch (message.type) {
    case "CACHE_URLS": {
      const urls = message.urls || [];
      const cache = await caches.open(DYNAMIC_CACHE);
      await Promise.all(
        urls.map((url: string) => {
          return cache.add(url).catch(() => {});
        }),
      );
      break;
    }
    case "SKIP_WAITING": {
      await self.skipWaiting();
      break;
    }
    case "CHECK_FOR_UPDATE": {
      const cache = await caches.open(DYNAMIC_CACHE);
      const allClients = await self.clients.matchAll();
      const hasUpdate = allClients.length > 0;
      await Promise.all(
        allClients.map((client) => {
          return client.postMessage({
            type: hasUpdate ? "UPDATE_AVAILABLE" : "NO_UPDATE",
          });
        }),
      );
      break;
    }
    case "REMOVE_CACHE": {
      const cacheNameToRemove = message.cacheName;
      if (cacheNameToRemove) {
        await caches.delete(cacheNameToRemove);
      }
      break;
    }
    default:
      break;
  }
});

self.addEventListener("sync", (_event: ExtendableSyncEvent) => {
  // handle background sync
});

self.addEventListener("notificationclick", (event: ExtendableNotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      if (allClients.length > 0) {
        const client = allClients[0];
        await client.focus();
        await client.postMessage({ type: "NOTIFICATION_CLICKED", data: event.notification.data });
      }
    })(),
  );
});

self.addEventListener("notificationclose", (event: ExtendableNotificationEvent) => {
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      await Promise.all(
        allClients.map((client) => {
          return client.postMessage({ type: "NOTIFICATION_CLOSED", data: event.notification.data });
        }),
      );
    })(),
  );
});

setInterval(async () => {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    await Promise.all(
      keys.map((request) => {
        return cache.match(request).then((response) => {
          if (response) {
            const dateHeader = response.headers.get("date");
            if (dateHeader) {
              const cacheDate = new Date(dateHeader).getTime();
              if (cacheDate < thirtyDaysAgo) {
                return cache.delete(request);
              }
            }
          }
        });
      }),
    );
  } catch {
    // ignore cache cleanup errors
  }
}, 24 * 60 * 60 * 1000);
