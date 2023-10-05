import axios from 'axios'
import { ElMessage } from 'element-plus';

//可以封装多个

const http=axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
    timeout: 5000
})


http.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    if (token) config.headers["authorization"] = token;
    return config
  }, e => Promise.reject(e))

  http.interceptors.response.use(res=> {
    return res
  },error=> {
    errorNotice(error.response.status)
    return Promise.reject(error);
  })

  //http1 s上传文件用
// const http1=axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
//     timeout: 5000
// })


// http1.interceptors.request.use(config => {
//     let token = localStorage.getItem("token");
//     if (token) config.headers["authorization"] = token;
//     return config
//   }, e => Promise.reject(e))

//   http.interceptors.response.use(res=> {
//     if(res.data.code===1)
//     return res.data
//     if(res.data.code===0)
//     ElMessage.error(res.data.msg)
//     return null;
//   },error=> {
//     errorNotice(error.response.status)
//     return Promise.reject(error);
//   })



  function errorNotice(status:number) {
    let msg=''
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";
    }
    ElMessage.error(msg)
   }

  
   

  export default http

