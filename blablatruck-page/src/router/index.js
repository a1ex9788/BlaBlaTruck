import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueCookies from 'vue-cookies';
//import { FormRadioPlugin } from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(VueCookies);

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
    component: () => {
      import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
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
  },
  {
    path: "/accessForbidden",
    name: "AccessForbidden",
    component: () => 
      import("../views/AccessForbidden.vue")
  },
  {
    path: "/navegator",
    name: "Navegator",
    component: () =>
      import("../views/Navegator.vue")
  },
  {
    path: "/historical",
    name: "Historical",
    component: () =>
      import("../views/Historical.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  var cookieValue = Vue.$cookies.get('loginToken')
  console.log(checkPagesWithoutPermissions(to.name))
  if(!checkPagesWithoutPermissions(to.name) && (cookieValue == null || cookieValue === 'NotLoged'))
    next('/accessForbidden')
  else
    next()
})

function checkPagesWithoutPermissions(name) {
  var pageNames = [
    'Home',
    'Login',
    'RegisterCarrier1',
    'RegisterCarrier2',
    'RegisterClient1',
    'RegisterClient2',
    'AccessForbidden',
    'Navegator'
  ]
  var res = false;
  pageNames.forEach(pageName => {
    res = res || pageName === name
  });
  return res
}

export default router;
