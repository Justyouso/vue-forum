import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta: {
      name: '主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    meta: {
      name: '登陆'
    },
    component: () => import("../views/Login/index.vue")
  },
   // 控制台
   {
    path: "/console",
    name: "Console",
    meta: {
      name: '控制台',
      icon: 'console'
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: '首页'
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  // 信息管理
  {
    path: "/info",
    name: "Info",
    meta: {
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: '信息列表'
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: '信息分类'
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  // 用户管理
  {
    path: "/user",
    name: "User",
    meta: {
      name: '用户管理',
      icon: 'user'
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: '用户列表'
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
