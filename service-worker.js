const cacheName = 'v1';
const filesToCache = ['./', './index.html', './image/img.jpg', './manifest.json', './service-worker.js'];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(filesToCache);
        }).then(() => {
            return self.skipWaiting();
        })
    );
    event.registerForeignFetch({
		scopes:['/'],
		origins:['*'] // or simply '*' to allow all origins - jsonplaceholder.typicode.com
	});
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
        })
    );
});


self.addEventListener('foreignfetch', event => {
	event.respondWith(fetch(event.request).then(response => {
		return {
			response: response,
			origin: event.origin,
			headers: ['Content-Type']
		}
	}));
});