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
const version = 6;
let staticName = `staticCache-${version}`;
let imgStaticName = `imageCache-${version}`;
let assets = [
    "/public/",
    "/public/index.html",
    "/public/main.css",
    "/public/app.js",
];
const imgAssets = [
    "/public/img/man-on-couch.png",
    "/public/img/me-smiling.jpg",
    "/public/img/man-on-couch.png?id=one",
    "/public/img/me-smiling.jpg?id=one",
    "/public/img/man-on-couch.png?id=two",
    "/public/img/me-smiling.jpg?id=two",
    "/public/img/man-on-couch.png?id=three",
    "/public/img/me-smiling.jpg?id=three",
];
self.addEventListener("install", (ev) => __awaiter(void 0, void 0, void 0, function* () {
    ev.waitUntil(Promise.resolve()
        .then(() => {
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
    })
        .then(() => {
        caches
            .open(imgStaticName)
            .then((cache) => {
            cache
                .addAll(imgAssets)
                .then(() => console.log(`Cache ${imgStaticName} has been updated`));
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
            .filter((key) => key !== staticName && key !== imgStaticName)
            .map((filteredKey) => caches.delete(filteredKey)));
    }));
});
self.addEventListener("fetch", (ev) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`FETCH: ${ev.request.url} from ${ev.clientId}`);
}));
