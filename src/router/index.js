import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});
//全局路由，前置守卫
router.beforeEach(async (to, from, next) => {
  let token = await store.state.login_register.token;
  let userInfo = await store.state.login_register.userInfo;
  if (token && userInfo) {
    let { id, nickName, type } = userInfo;
    if (to.path == "/login") {
      if (!localStorage.getItem("TOEKN")) {
        next();
      } else next(false);
    } else next();
  } else {
    next();
  }
});
export default router;
