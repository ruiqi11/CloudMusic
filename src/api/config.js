import axios from 'axios';

export const baseUrl = 'http://localhost:4000';

// 创建axios的实例
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

// 响应拦截器【响应拦截器的作用是在接收到响应后进行一些操作】
axiosInstance.interceptors.response.use(
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  res => res.data,
  // 服务器状态码不是2开头的的情况
  err => {
    console.log(err, "网络错误");
  }
);

export {
  axiosInstance
};