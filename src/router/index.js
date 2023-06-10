import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/admin",
    name: "admin",
    meta: "首页",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "changePwd",
        name: "changePwd",
        meta: "修改密码",
        component: () => import("../components/admin/changePwd.vue"),
      },
      {
        path: "manage",
        name: "manage",
        meta: "用户管理",
        component: () => import("@/components/admin/userManage.vue"),
      },
      {
        path: "activities1",
        name: "activities1",
        meta: "登山活动管理",
        component: () => import("@/components/admin/activities1.vue"),
      },
      {
        path: "activities2",
        name: "activities2",
        meta: "中长途活动管理",
        component: () => import("@/components/admin/activities2.vue"),
      },

      {
        path: "audit",
        name: "audit",
        meta: "内容审计",
        component: () => import("@/components/admin/audit.vue"),
      },
      {
        path: "setting",
        name: "setting",
        meta: "系统管理",
        component: () => import("@/components/admin/setting.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
