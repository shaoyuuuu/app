import { reqGetActivityList, reqGetUserList } from "@/api";
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
  async getUserList({ commit }) {
    let result = await reqGetUserList();
    if (result && result.code == 200) {
      let list = JSON.parse(result.data);
      commit("GETUSERLIST", list);
    }
  },
  async getActivityList({ commit },type) {
    let result = await reqGetActivityList(type);
    if (result && result.code == 200) {
      let list = JSON.parse(result.data);
      commit("GETACTIVITYLIST", list);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
