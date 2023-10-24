/* eslint-disable no-restricted-globals */

// Define a name and version for your cache
const CACHE_NAME = "kanban-app-v1";

// Define the assets to cache
const ASSETS_TO_CACHE = [
  "/",
  "./index.html",
  "../src/index.js",
  "../src/App.css",
  "./manifest.json",
  // Add any other assets that you want to cache
];

// Install the service worker and cache the assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate the service worker and delete any old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch the assets from the cache or the network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // If there's a cached response, return it
        return cachedResponse;
      }

      // If there's no cached response, fetch from the network and update the cache
      return fetch(event.request).then((networkResponse) => {
        // Make sure the response is OK before updating the cache
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          // Clone the response because it's a stream and can only be consumed once
          var responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return networkResponse;
      });
    })
  );
});
