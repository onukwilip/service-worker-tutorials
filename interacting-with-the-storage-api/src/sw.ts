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

self.addEventListener("install", async (ev) => {
  (ev as any).waitUntil(
    Promise.resolve()
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
              .then(() =>
                console.log(`Cache ${imgStaticName} has been updated`)
              );
          })
          .catch((err) => {
            console.log("An error occured while caching assets ", err.message);
          });
      })
  );

  (self as any).skipWaiting();
});

self.addEventListener("activate", (ev) => {
  (ev as any).waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticName && key !== imgStaticName)
          .map((filteredKey) => caches.delete(filteredKey))
      );
    })
  );
});

self.addEventListener("fetch", async (ev: any) => {
  console.log(`FETCH: ${ev.request.url} from ${ev.clientId}`);
});
