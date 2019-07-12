import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/Home.vue";
import LoginPage from "./views/login.vue";
import HomeAside from "@/components/team-home/home-aside.vue";

Vue.use(Router);

export default new Router({
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
      children:[{
        path:"/home/table/:id/:group/:groupItem",
        name: 'HomeAside',
        component: HomeAside
      },{
        path:"/home/table",
        name: 'HomeAside',
        component: HomeAside
      }]
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
