import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue")
  },
  {
    path: "/registerClient1",
    name: "RegisterClient1",
    component: () =>
      import("../views/RegisterClient1.vue")
  },
  {
    path: "/registerClient2",
    name: "RegisterClient2",
    component: () =>
      import("../views/RegisterClient2.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
