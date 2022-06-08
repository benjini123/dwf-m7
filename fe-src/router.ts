import { Router } from "@vaadin/router";

const rootEl = document.querySelector(".root");
const router = new Router(rootEl);
router.setRoutes([
  // { path: "/", component: "home-page" },
  { path: "/home", component: "home-page" },
]);
