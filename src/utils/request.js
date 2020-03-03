import axios from 'axios'
import { Message } from 'element-ui';

// 获取开发环境中 vue.config.js中的proxy中的target
const BASEURL =  process.env.NODE_ENV === 'production' ? 'dist' : '/devApi';
// const BASEURL = "http://119.3.230.228:8999"
console.log(BASEURL)
// 创建axios
const service = axios.create({
  // 请求基础地址
  baseURL: BASEURL,  // http://localhost:8080/devApi/  == http://www.web-jshtml.cn/productapi
  // 请求超时
  timeout: 1000*60,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加token
  config.headers["Token"] = "111111"
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 对正常返回的错误数据进行响应拦截
  let data = response.data
  if (data.resCode != 0){
    Message.error(data.message);
    return Promise.reject(data);
  }else{
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error);
});

export default service;