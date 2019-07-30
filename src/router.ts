import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/Home.vue";
import LoginPage from "./views/login.vue";
import HomeTabContent from "@/components/team-home/home-tab-content.vue";
import ChangePassword from "@/components/other/change-password.vue";
import Register from "@/components/other/register.vue";
import Apply from "@/components/other/apply.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/surface/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
      children: [
        {
          path: "/home/change-password",
          name: "ChangePassword",
          component: ChangePassword
        },
        {
          path: "/home/register",
          name: "register",
          component: Register
        },
        {
          path: "/home/dispatch-apply",
          name: "dispatch-apply",
          component: Apply
        },
        {
          path: "/home/:id",
          name: "HomeTabContent",
          component: HomeTabContent
        },
      ]
    }
    
  ]
});


