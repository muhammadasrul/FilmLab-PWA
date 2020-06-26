const CACHE_NAME = "filmlab-v2";
var urlsToCache = [
    "/",
    "/regist.js",
    "/manifest.json",
    "/nav.html",
    "/pages/home.html",
    "/pages/process.html",
    "/pages/films.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/labc41.jpg",
    "/img/colorplus.png",
    "/img/ektar100_1.png",
    "/img/fujipro400.png",
    "/img/kodakgold.png",
    "/img/portra400.png",
    "/img/portra160.png",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/icons/icon-72x72.png",
    "/img/icons/icon-96x96.png",
    "/img/icons/icon-128x128.png",
    "/img/icons/icon-144x144.png",
    "/img/icons/icon-152x152.png",
    "/img/icons/icon-192x192.png",
    "/img/icons/icon-384x384.png",
    "/img/icons/icon-512x512.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"

];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response) {
            if(response){
                console.log("ServiceWorker: Gunakan asset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",event.request.url
            );
            return fetch(event.request);
        })
    );
})

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + "di hapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})