import axios from 'axios'
import ElementUI from 'element-ui'
import router from "./router";

axios.defaults.baseURL = "http://127.0.0.1:8081";
//前置拦截
axios.interceptors.request.use(config => {

   return config
});
// 后置拦截
axios.interceptors.response.use(response => {
    let data = response.data;
    if (data.code  === 200) {
        return response;
    } else {
        ElementUI.Message.error("这是一条错误信息", {duration: 3000});
        return Promise.reject(response.data.msg);
    }
},error => {
    if (error.response.data) {
        error.message = error.response.data.msg;
    }
    if (error.response,status === 400) {
        store.commit("REMOVE_INFO");
        router.push("/user/login");
    }

    ElementUI.Message.error(error.message,{duration: 3000});
    return Promise.reject(error)
});