import Vue from "vue";
import Router from "vue-router";
const HomePage = (r: any) => require.ensure([], () => r(require("./views/Home.vue")));
const LoginPage = (r: any) => require.ensure([], () => r(require("./views/login.vue")));
const HomeTabContent = (r: any) => require.ensure([], () => r(require("@/components/team-home/home-tab-content.vue")));
const ChangePassword = (r: any) => require.ensure([], () => r(require("@/components/other/change-password.vue")));
const CalculateRate = (r: any) => require.ensure([], () => r(require("@/components/other/calculate-rate.vue")));
const Register = (r: any) => require.ensure([], () => r(require("@/components/other/register.vue")));
const Apply = (r: any) => require.ensure([], () => r(require("@/components/other/apply.vue")));
const FeeRateManager = (r: any) => require.ensure([], () => r(require("@/components/other/fee-rate-manager.vue")));
const GoogleQrcode = (r: any) => require.ensure([], () => r(require("@/components/other/google-qrcode.vue")));

// import HomePage from "./views/Home.vue";
// import LoginPage from "./views/login.vue";
// import HomeTabContent from "@/components/team-home/home-tab-content.vue";
// import ChangePassword from "@/components/other/change-password.vue";
// import CalculateRate from "@/components/other/calculate-rate.vue";
// import Register from "@/components/other/register.vue";
// import Apply from "@/components/other/apply.vue";
// import FeeRateManager from "@/components/other/fee-rate-manager.vue";
// import GoogleQrcode from "@/components/other/google-qrcode.vue";


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
          path: "/home/calculate-rate",
          name: "CalculateRate",
          component: CalculateRate
        },
        {
          path: "/home/fee-rate-manager",
          name: "FeeRateManager",
          component: FeeRateManager
        },
        {
          path: "/home/change-password",
          name: "ChangePassword",
          component: ChangePassword
        },
        {
          path: "/home/google-QRcode",
          name: "GoogleQrcode",
          component: GoogleQrcode
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
    },
    {
      path: "/",
      redirect: "/home",
    }
    
  ]
});


