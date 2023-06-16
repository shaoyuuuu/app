import { data } from "autoprefixer";
import request from "./request";

//获取用户信息列表
export const reqGetUserList = () =>
  request({ url: "/getUserList", method: "get" });
//获取活动信息列表
export const reqGetActivityList = (type) =>
  request({ url: `/getActivityList`, params: { type: type }, method: "get" });
//登录
export const reqUserLogin = (data) =>
  request({ url: "/Login", data, method: "post" });
//退出登录
export const reqUserLoginOut = (data) =>
  request({ url: "/loginOut", data, method: "post" });
