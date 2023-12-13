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
const register_sw = () => __awaiter(void 0, void 0, void 0, function* () {
    if ("serviceWorker" in navigator) {
        const registered_sw = yield navigator.serviceWorker
            .register("./sw.js", { scope: "/public/" })
            .catch((e) => console.error("Unable to register service worker due to " + e.message));
        if (!registered_sw) {
            console.error("Unable to register service worker");
            return;
        }
        console.log("INSTALLING", registered_sw.installing);
        console.log("WAITING", registered_sw.waiting);
        console.log("ACTIVATING", registered_sw.active);
    }
    else {
        console.error("Your browser doesn't support service workers");
    }
});
register_sw();
