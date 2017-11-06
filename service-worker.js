var cacheName = 'v1';
var filesToCache = ['./', './index.html', './image/img.jpg', './manifest.json', './service-worker.js'];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
        return cache.addAll(filesToCache);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});