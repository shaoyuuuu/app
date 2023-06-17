import { reqGetActivityList, reqGetUserList,reqAdminChangePwd } from "@/api";
import {Message,MessageBox,Loading} from 'element-ui';
const state = {
  userList: [],
  activityList: [],
};
const getters = {
  userList(state) {
    return state.userList || [];
  },
  activityList(state) {
    return state.activityList || [];
  },
};
const mutations = {
  GETUSERLIST(state, userList) {
    state.userList = userList;
  },
  GETACTIVITYLIST(state, activityList) {
    state.activityList = activityList;
  },
};
const actions = {
  //得到用户列表
  async getUserList({ commit }) {
    let result = await reqGetUserList();
    if (result && result.code == 200) {
      let list = JSON.parse(result.data);
      commit("GETUSERLIST", list);
    }
  },
  //得到活动列表
  async getActivityList({ commit },type) {
    let result = await reqGetActivityList(type);
    if (result && result.code == 200) {

      let list = JSON.parse(result.data);
      commit("GETACTIVITYLIST", list);
    }
  },
  //管理员修改密码
  async adminChangePwd({commit},data){
    let result = await reqAdminChangePwd(data);
    if(result && result.code==200){
      return 'ok'
    } else {
      return Promise.reject(new Error("false"));
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions,
};
