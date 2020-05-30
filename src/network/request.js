import axios from 'axios'
// import { TIMEOUT } from 'dns'

export function request(config) {

  // 1.创建axios实例
  const instance = axios.create({
    baseURL : "",
    timeout: 5000
  })

  // 2.1axios拦截器 (发送出去的请求拦截)
  instance.interceptors.request.use(config => {
    // 为什么要拦截
    // 1.config中的信息不符合服务器要求可拦截修改
    // 2.比如每次发送网络请求时都希望在界面显示一个请求图标
    // 3.某些网络请求（例如登录（token）），必须携带一些特殊信息
    // console.log('拦截器config',config);
    // 拦截后必须重新发送config，不然请求无法发出
    return config
  }, err => {
    // console.log('拦截器err',err);

  })
  // 2.2响应拦截（响应回来的结果拦截）
  instance.interceptors.response.use(res => {
    // console.log('拦截响应res',res);
    // 响应拦截成功需要返回data
    return res.data
  }, err => {
    // console.log('拦截响应err',err);

  })

  // 发送网络请求
  return instance(config)

}


