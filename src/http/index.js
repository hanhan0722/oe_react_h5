
import axios from 'axios';
import { message } from 'antd'
import store from '@/redux/store'
import { changeLoading } from '@/redux/action'
import { Encrypt, Decrypt } from "@/http/secret.js";

const $ajax = axios.create({
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

// POST传参序列化(添加请求拦截器)
$ajax.interceptors.request.use(
  config => {
    if (!config.hideLoading) {
      store.dispatch(changeLoading(true))
    }
    if (config.method === "post" && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
      let data = Encrypt(config.data);
      let ret = "";
      for (let it in data) {
        ret +=
          encodeURIComponent(it) +
          "=" +
          encodeURIComponent(data[it]) +
          "&";
      }
      config.data = ret;
    }
    return config;
  },
  error => {
    message.info(error.message);
    return Promise.reject(error);
  }
);

// 返回状态判断(添加响应拦截器)
$ajax.interceptors.response.use(
  res => {
    store.dispatch(changeLoading(false))
    if (res.data.body && JSON.stringify(res.data.body) !== "{}" && res.data.code === 0) {
      return Promise.resolve(JSON.parse(Decrypt(res.data.body)));
    } else {
      if (res.data.code !== 0) {
        message.info(res.data.msg)
        return Promise.reject(res.data)
      } else return Promise.resolve(res.data);
    }
  },
  error => {
    store.dispatch(changeLoading(false))
    message.info(error.message)
    return Promise.reject(error);
  }
);

export default $ajax
