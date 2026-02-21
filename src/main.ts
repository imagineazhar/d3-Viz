import "./styles/global.css";

import { startRouter } from "./app/router";

const app = document.getElementById("app");
if (!app) {
  throw new Error("#app root element not found");
}

startRouter(app);