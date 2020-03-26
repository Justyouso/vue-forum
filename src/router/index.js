import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "indexNew",
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
  // 用户管理
  {
    path: "/user",
    name: "User",
    hidden:false,
    meta: {
      name: '用户',
      icon: 'user'
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/userIndex/:userId",
        name: "UserIndex",
        meta: {
          name: '我的主页'
        },
        component: () => import("../views/User/index.vue"),
        children:[
          {
            path: "/userIndexFollow/:userId",
            name: "UserIndexFollow",
            meta: {
              name: '关注'
            },
            component: () => import("../views/User/Index/follow.vue")
          },
        ]
      },
      {
        path: "/userSetting/:userId",
        name: "UserSetting",
        meta: {
          name: '设置'
        },
        component: () => import("../views/User/setting.vue")
      },
      {
        path: "/userWriting/:userId",
        name: "UserWriting",
        meta: {
          name: '写文章'
        },
        component: () => import("../views/User/writing.vue")
      }

    ]
  },
  // 首页
  {
    path: "/index",
    name: "Index",
    hidden:true,
    meta: {
      name: '首页'
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/indexFound",
        name: "indexFound",
        meta: {
          name: '文章发现'
        },
        component: () => import("../views/Index/found.vue")
      },
      {
        path: "/indexNew",
        name: "IndexNew",
        meta: {
          name: '最新文章'
        },
        component: () => import("../views/Index/new.vue")
      },
      {
        path: "/indexAttention",
        name: "IndexAttention",
        meta: {
          name: '关注'
        },
        component: () => import("../views/Index/attention.vue")
      }
    ]
  },
  // 文章
  {
    path: "/article",
    name: "Article",
    hidden:true,
    meta: {
      name: '文章'
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/article/detail/:articleId",
        name: "ArticleDetail",
        meta: {
          name: '文章详情'
        },
        component: () => import("../views/Article/detail.vue")
      }
    ]
  },
  // 搜索
  {
    path: "/search",
    name: "Search",
    hidden:true,
    meta: {
      name: '搜索',
    },
    component: Layout,
    // 在父component中（Layout/index）会展示children中的第一个
    children: [
      {
        path: "/index/search",
        name: "IndexSearch",
        meta: {
          name: '搜索'
        },
        component: () => import("../views/Search/index.vue")
      }
    ]
  }
];

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location){
//   return routerPush.call(this,location).catch(error=>error)
// }

const router = new VueRouter({
  routes
});

export default router;
