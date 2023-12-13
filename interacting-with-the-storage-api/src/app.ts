const register_sw = async () => {
  if ("serviceWorker" in navigator) {
    const registered_sw = await navigator.serviceWorker
      .register("./sw.js", { scope: "/public/" })
      .catch((e) =>
        console.error("Unable to register service worker due to " + e.message)
      );

    if (!registered_sw) {
      console.error("Unable to register service worker");
      return;
    }

    console.log("INSTALLING", registered_sw.installing);
    console.log("WAITING", registered_sw.waiting);
    console.log("ACTIVATING", registered_sw.active);
  } else {
    console.error("Your browser doesn't support service workers");
  }
};

const storage_API = async () => {
  if ("storage" in navigator) {
    if ("estimate" in navigator.storage) {
      const estimate = await navigator.storage.estimate();

      const used = ((estimate.usage || 0) / (1024 * 1024)).toFixed(3);
      const quota = ((estimate.quota || 0) / (1024 * 1024)).toFixed(3);

      console.log(`You've used ${used}MB out of ${quota}MB`);
    }
    if ("persist" in navigator.storage) {
      const isPersist = await navigator.storage.persist();
      console.log(`Storage ${isPersist ? "IS" : "IS NOT"} persisted`);
    }
  }
};

const get_cached_storage = async () => {
  const cache = await caches.open("imageCache-6");

  let totalSize = 0;

  const returnedMatchResponse = await cache.matchAll();
  returnedMatchResponse.forEach((matchResponse) => {
    if (matchResponse.headers.has("content-length")) {
      const resSize = parseInt(
        matchResponse.headers.get("content-length") || "0"
      );
      totalSize += resSize;

      console.log(`Adding size for cache ${matchResponse.url}`);
    }
  });

  console.log(
    `Total size of cache imageCache-6 is ${totalSize / (1040 * 1040)} MB`
  );
};

register_sw();
storage_API();
get_cached_storage();
