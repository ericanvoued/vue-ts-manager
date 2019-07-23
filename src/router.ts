import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/Home.vue";
import LoginPage from "./views/login.vue";
import HomeTabContent from "@/components/team-home/home-tab-content.vue";
import ChangePassword from "@/components/other/change-password.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
      children: [
        {
          path: "/home/table/:id/:group/:groupItem",
          name: "HomeTabContent",
          component: HomeTabContent
        },
        {
          path: "/home/change-password",
          name: "ChangePassword",
          component: ChangePassword
        },
        {
          path: "/home/table",
          name: "HomeTabContent",
          component: HomeTabContent
        }
      ]
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
