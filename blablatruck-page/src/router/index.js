import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies';
//import { FormRadioPlugin } from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(VueCookies);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login"
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
    path: "/priceCalculation",
    name: "PriceCalculation",
    component: () =>
      import("../views/Packages/PriceCalculation.vue")
  },
  {
    path: "/registerPackage",
    name: "RegisterPackage",
    component: () =>
      import("../views/Packages/RegisterPackage.vue")
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
      import("../views/Packages/RegisterNewPackage.vue")
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
    path: "/myShipments",
    name: "MyShipments",
    component: () =>
      import("../views/MyShipments.vue")
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
  if(!checkPagesWithoutPermissions(to.name) && (cookieValue == null || cookieValue.Type === 'NotLogged'))
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
    'Navegator',
    'MyShipments'
  ]
  var res = false;
  pageNames.forEach(pageName => {
    res = res || pageName === name
  });
  return res
}

export default router;
