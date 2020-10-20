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
      import("../views/UserRegistrations/RegisterClient1.vue")
  },
  {
    path: "/registerClient2",
    name: "RegisterClient2",
    component: () =>
      import("../views/UserRegistrations/RegisterClient2.vue")
  },
  {
    path: "/registerCarrier1",
    name: "RegisterCarrier1",
    component: () =>
      import("../views/UserRegistrations/RegisterCarrier1.vue")
  },
  {
    path: "/registerCarrier2",
    name: "RegisterCarrier2",
    component: () =>
      import("../views/UserRegistrations/RegisterCarrier2.vue")
  },
  {
    path: "/registerNewPackage",
    name: "RegisterNewPackage",
    component: () =>
      import("../views/RegisterNewPackage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
