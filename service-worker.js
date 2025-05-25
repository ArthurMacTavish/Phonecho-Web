// ChatGPT and reading some docu tho.

const CACHE_NAME = "phonecho-cache-v1";
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/404.html',
    '/game/index.html',
    '/style/universal.css',
    '/style/root.css',
    '/style/game.css',
    '/assets/IconOG.png',
    '/assets/favicon.ico',
    '/assets/not_available.png',
    '/assets/dictionary/agentChecker.js',
    '/assets/dictionary/phonetics.txt',
    '/assets/dictionary/wordDict.txt',
];

// Install — Cache everything
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting(); // Activate immediately
});

// Activate — Clean old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim(); // Take control immediately
});

// Fetch — Serve from cache, fallback to network
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).catch(() => {
                if (event.request.headers.get("accept")?.includes("text/html")) {
                    return caches.match("/404.html");
                }
            });
        })
    );
});