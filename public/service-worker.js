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
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          // Optionally, you can add some logic here to update the cache with the network response
          return networkResponse;
        })
      );
    })
  );
});
