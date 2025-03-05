self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('dynamic-cache').then((cache) => {
            return cache.addAll([
                // Cache any essential files here
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return the cached response if it's found
            if (response) {
                return response;
            }

            // Clone the request to fetch the resource and cache it
            let fetchRequest = event.request.clone();

            return fetch(fetchRequest).then((fetchResponse) => {
                // Check if the fetch request was successful
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    return fetchResponse;
                }

                // Clone the fetch response to cache it
                let responseToCache = fetchResponse.clone();

                caches.open('dynamic-cache').then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return fetchResponse;
            });
        })
    );
});
