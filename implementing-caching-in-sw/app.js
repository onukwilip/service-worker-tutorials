const register_sw = async () => {
  if ("serviceWorker" in navigator) {
    const registered_sw = await navigator.serviceWorker
      .register("./sw.js", { scope: "/" })
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

register_sw();
