self.addEventListener("install", async (ev) => {
  ev.waitUntil(
    Promise.resolve()
      .then(() => manu())
      .then(() => promise_func())
      .then(() => console.log("INSTALLING"))
  );

  self.skipWaiting();
});

const manu = () => {
  console.log("Calling manu!");
};
const promise_func = (timeout) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Promise...");
      resolve();
    }, timeout || 1000 * 3);
  });

self.addEventListener("activate", async () => {
  console.log("ACTIVATED! But, not integrated to current page");

  await clients.claim();
  console.log("The current page is now using the activated service worker.");
});

self.addEventListener("fetch", async (ev) => {
  console.log(`FETCH: ${ev.request.url} from ${ev.clientId}`);
});
