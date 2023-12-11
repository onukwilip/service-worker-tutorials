const version = "v1";

self.addEventListener("install", (e) => {
  console.log("INSTALLED");
});

self.addEventListener("activate", (e) => {
  console.log("ACTIVATED");
});

self.addEventListener("fetch", (e) => {
  console.log("FETCHING: ", e.request.url, " from ", e.clientId);
});
