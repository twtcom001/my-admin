// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import router from './router'
import axios from 'axios'
//element-ui 引入
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';

//开启debug模式
Vue.config.debug = true;

//element-ui 引入 继承
Vue.use(ElementUI)
Vue.prototype.$axios = axios

// 初始化axios
//axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.auth = {
    username: '',
    password: '',
}
// 路由跳转
router.beforeEach((to, from, next) => {
    if (to.meta.required) {
        // 检查localStorage
        if (localStorage.token) {
            store.commit('set_token', localStorage.token)
            // 添加axios头部Authorized
            axios.defaults.auth = {
                username: 'localStorage.token',
                password: 'unused',
            }
            // iview的页面加载条
            //iView.LoadingBar.start();
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        //iView.LoadingBar.start();
        next()
    }
})

router.afterEach((to, from, next) => {
    //iView.LoadingBar.finish();
})
/* eslint-disable no-new */
new Vue({
    router,
    store:store,
    render: h => h(App)
}).$mount('#app');


