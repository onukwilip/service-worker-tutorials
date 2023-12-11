const APP = {
  SW: null,
  cacheName: "assetCache1",
  init: async () => {
    //called after DOMContentLoaded
    if ("serviceWorker" in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          APP.SW =
            registration.installing ||
            registration.waiting ||
            registration.active;
        },
        (error) => {
          console.log("Service worker registration failed:", error);
        }
      );
    } else {
      console.log("Service workers are not supported.");
    }

    await APP.startCaching();

    document
      .querySelector("#delete")
      .addEventListener("click", APP.deleteCache);
  },
  startCaching: async () => {
    const cache = await caches.open(APP.cacheName);

    console.log(`CACHE ${APP.cacheName} OPENED`);

    await APP.hasCahe();
    await APP.displayKeys(cache);

    // * USING THE cache.add() method to add a cache
    const urlString = "./img/hp-laptop.png";
    cache.add(urlString);

    const url = new URL(
      "http://127.0.0.1:5500/img/joel-muniz-qvzjG2pF4bE-unsplash.jpg"
    );
    cache.add(url);

    await APP.displayKeys();

    // * USING THE cache.put() method to add a cache
    await APP.hasCahe();

    const urlString2 = "/img/me-smiling-removebg.png";

    const matchedCacheResponse = await caches.match(urlString2);

    if (matchedCacheResponse) {
      console.log(`${urlString2} FOUND IN CACHE`, matchedCacheResponse);

      // * ADD THE IMAGE TO THE DOM
      await APP.addCacheToDOM(matchedCacheResponse);
    }
    // * FETCH IMAGE AND ADD TO CACHE
    else {
      console.log(`${urlString2} NOT FOUND IN CACHE`);

      const fetchedResponse = await fetch(urlString2);
      if (!fetchedResponse.ok) throw fetchedResponse.statusText;

      // * ADD THE FETCH RESPONSE TO THE CACHE
      cache.put(urlString2, fetchedResponse.clone());

      // * ADD THE IMAGE TO THE DOM
      await APP.addCacheToDOM(fetchedResponse);
    }
  },
  displayKeys: async (cache) => {
    if (!cache) return;

    const cacheKeys = await cache.keys();

    if (!cacheKeys) return console.log("NO CACHE");
    cacheKeys.forEach((key, i) => {
      console.log(`Cache${i + 1}`, key);
    });
  },
  hasCahe: async () => {
    const has_cache = await caches.has(APP.cacheName);
    console.log(`${APP.cacheName} ${has_cache}`);
  },
  addCacheToDOM: async (response) => {
    if (!response) return;

    const blob = await response.blob();
    document.getElementById("output").innerHTML = response.url;
    let fetchBlobURL = URL.createObjectURL(blob);
    let img = document.createElement("img");
    img.src = fetchBlobURL;
    document.getElementById("output").append(img);
  },
  deleteCache: async () => {
    const cache = await caches.open(APP.cacheName);
    if (!cache) return;

    // const urlString2 = "/img/me-smiling-removebg.png";
    // const deletedCache = await cache.delete(urlString2);
    // console.log(`${urlString2} is ${!deletedCache ? "NOT " : ""}deleted`);

    const allDeleted = await caches.delete(APP.cacheName);
    console.log(
      `${APP.cacheName} caches are ${!allDeleted ? "NOT " : "ALL "}deleted`
    );
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
