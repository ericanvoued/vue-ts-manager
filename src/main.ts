import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { ApiList } from "./api/api";
import "./plugins/element.js";
import VueRouter from 'vue-router';

declare module "vue/types/vue" {
  interface Vue {
    $message: any;
    $alert: any;
    $apiList: any;
    $confirm: any;
    $breadKey: any;
  }
}

Vue.prototype.$apiList = new ApiList();
Vue.prototype.$breadKey = window.breadKey
// declare global{
//   interface window {
//     baseUrl: any
//   }
// }
router.beforeEach((to, from, next) => {
  if(to.name != 'login') {
    if(sessionStorage.getItem('userInfo')) {
      next();
    }else {
      next({path: '/surface/login'})
    }
  }else {
    next()
  }
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
