const register_service_worker = async () => {
  if ("serviceWorker" in navigator) {
    const service_worker = await navigator.serviceWorker
      .register("./sw.js", {
        scope: "/",
      })
      .catch((e) => {
        console.error("AN ERROR OCCURED", e.message);
      });
    console.log("INSTALLING", service_worker.installing);
    console.log("WAITING", service_worker.waiting);
    console.log("ACTIVE", service_worker.active);

    // * Confirming if a service worker is alreqdy active on this page

    if (navigator.serviceWorker.controller) {
      console.log(
        "A SERVICE WORKER IS ACTIVE ON THIS PAGE",
        navigator.serviceWorker.controller
      );
    }

    // * Listening for updates to the service workewr
    navigator.serviceWorker.oncontrollerchange = (e) => {
      console.log("SERVICE WORKER CHANGED", e);
    };
  } else {
    console.error("YOUR BROWSER DOESN'T SUPPORT SERVICE WORKERS");
  }
};

document.addEventListener("DOMContentLoaded", register_service_worker);
