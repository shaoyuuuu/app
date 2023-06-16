import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import admin from "./admin";
import login_register from "./login_register";
export default new Vuex.Store({
  modules: {
    admin,
    login_register,
  },
});
