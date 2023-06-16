import axios from "axios";
//进度条
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import router from "@/router"
import {Message,MessageBox,Loading} from 'element-ui';
import { removeToken } from "@/utils/token";
const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});


//请求拦截器
request.interceptors.request.use((config) => {
  nProgress.start();
  // console.log(store.state.login_register.token)
  // 可以在headers请求头上挂载用户token
  if (store.state.login_register.token) {
    config.headers.token = store.state.login_register.token
  }
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (res) => {
    nProgress.done();
    if(res.data.code==202){
      console.log('res.data')
      Message({
        showClose: true,
        message: '用户已过期，请重新登录',
        duration:2000,
        type: 'error'
      });
      removeToken();
      localStorage.removeItem("userInfo");
      router.push('/login')
    }
    return res.data;
  },
  (error) => {}
);

export default request;
