import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/css/bootstrap.css'
import './plugins/element.js'

import global_ from './components/global.vue'//引用文件
Vue.prototype._global = global_//挂载到Vue实例上面

axios.interceptors.request.use(
  config => {
    if (localStorage.token) { //判断token是否存在
      config.headers.Authorization = localStorage.token;  //将token设置成请求头
      console.log("成功设置请求头");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.errno === 999) {
      console.log("token过期");
      router.replace('/');
      console.log("token过期");
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


