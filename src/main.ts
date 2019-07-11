import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

declare module "vue/types/vue" {
  interface Vue {
    $message: any;
  }
}

// declare global{
//   interface Vue {
//     $message: any
//   }
// }

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
