import "./style.css";

import { setupCalendar } from "v-calendar";
import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);
app.use(setupCalendar, {});
app.mount("#app");
