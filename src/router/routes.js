import store from "@/store";
export default [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/User/Home.vue"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("@/components/login.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: "首页",
    component: () => import("../views/Admin.vue"),
    beforeEnter: (to, from, next) => {
      // ...
      let userInfo = store.state.login_register.userInfo;
      if(userInfo&&userInfo.type==1){
        next()
      } else{
        next(false)
      }
    },
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
        children: [
          {
            path: ":userId",
            name: "userMsg",
            meta: "查看用户",
            props: ($route) => {
              return { userData: $route.params.userData };
            },
            component: () => import("@/components/admin/userMsg.vue"),
          },
        ],
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
]
