import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入Elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入moment
import moment from "moment";
moment.locale('zh-cn')
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default Vue;