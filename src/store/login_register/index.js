//登录与注册相关的仓库
import { reqUserLogin, reqUserLoginOut } from "@/api";
import { setToken, removeToken } from "@/utils/token";
import { loginOutLS } from "@/utils/loginOut";
const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  //用户信息
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};
const getters = {
  userInfo(state) {
    return state.userInfo || {};
  },
};
const mutations = {
  USERLOGIN(state, data) {
    state.token = data.token;
    state.userInfo = data.userInfo;
  },
  USERLOGINOUT(state){
    state.token=''
    state.userInfo={}
  }
};
const actions = {
  //用户登录逻辑
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      let msg = JSON.parse(result.data);
      let userInfo = {
        id: msg.id,
        nickName: msg.nickName,
        type: data.type,
      };
      commit("USERLOGIN", {
        token: msg.token,
        userInfo: userInfo,
      });
      setToken(msg.token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return "ok";
    } else {
      return Promise.reject(new Error("false"));
    }
  },
  //退出登录逻辑
  async userLoginOut({ commit },data) {
    let result = await reqUserLoginOut(data);
    if (result.code == 200) {
      loginOutLS();
      commit("USERLOGINOUT");
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
