"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const version = 1;
let staticName = `staticCache-${version}`;
let imgStaticName = `imageCache-${version}`;
let fontsStaticName = `fontsCache-${version}`;
let dynamicName = `dynamicCache-${version}`;
let assets = [
    "/public/",
    "/public/index.html",
    "/public/main.css",
    "/public/app.js",
];
self.addEventListener("install", (ev) => __awaiter(void 0, void 0, void 0, function* () {
    ev.waitUntil(Promise.resolve().then(() => {
        caches
            .open(staticName)
            .then((cache) => {
            cache.addAll(assets).then(() => {
                console.log(`Cache ${staticName} has been updated`);
            });
        })
            .catch((err) => {
            console.log("An error occured while caching assets ", err.message);
        });
    }));
    self.skipWaiting();
}));
self.addEventListener("activate", (ev) => {
    ev.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys
            .filter((key) => ![
            staticName,
            imgStaticName,
            fontsStaticName,
            dynamicName,
        ].includes(key))
            .map((filteredKey) => caches.delete(filteredKey)));
    }));
});
self.addEventListener("fetch", (ev) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`FETCH: ${ev.request.url} from ${ev.clientId}`);
    // Intercept fetch requests
    ev.respondWith(caches.match(ev.request).then((matchedCache) => {
        if (matchedCache)
            return matchedCache;
        return fetch(ev.request).then((fetchResponse) => {
            // Check the type of response
            const content_type = fetchResponse.headers.get("content-type");
            // It's a CSS file or a font from google
            if ((content_type && content_type.match(/^text\/css/i)) ||
                ev.request.url.match(/fonts.googleapis.com/i)) {
                return caches.open(dynamicName).then((cache) => {
                    cache.put(ev.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }
            // It's A font file or a font from gstatic
            else if ((content_type && content_type.match(/^font/i)) ||
                ev.request.url.match(/fonts.gstatic.com/i)) {
                return caches.open(fontsStaticName).then((cache) => {
                    cache.put(ev.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }
            // It's an image
            else if (content_type && content_type.match(/^image\//i)) {
                return caches.open(imgStaticName).then((cache) => {
                    cache.put(ev.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }
            //Las resort
            else {
                return caches.open(dynamicName).then((cache) => {
                    cache.put(ev.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }
        });
    }));
}));
