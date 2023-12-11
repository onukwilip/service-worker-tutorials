const version = 3;
let staticName = `staticCache-${version}`;

let assets = ["/", "/index.html", "/main.css", "/app.js"];

self.addEventListener("install", async (ev) => {
  ev.waitUntil(
    Promise.resolve().then(() => {
      caches
        .open(staticName)
        .then((cache) => {
          cache
            .addAll(assets)
            .then(() => console.log(`Cache ${staticName} has been updated`));
        })
        .catch((err) => {
          console.log("An error occured while caching assets ", err.message);
        });
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticName)
          .map((filteredKey) => caches.delete(filteredKey))
      );
    })
  );
});

self.addEventListener("fetch", async (ev) => {
  console.log(`FETCH: ${ev.request.url} from ${ev.clientId}`);
});
