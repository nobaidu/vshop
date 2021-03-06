import Vue from "vue";
import Router from "vue-router";
import index from "@/pages/index";
import register from "@/pages/register";
import login from "@/pages/login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/login",
      name: "login",
      component: login
    }
  ]
});
