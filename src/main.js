// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//element-ui 引入
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-default/index.css';  
import 'element-ui/lib/theme-chalk/index.css';


//element-ui 引入 继承
Vue.use(ElementUI)
Vue.prototype.$axios = axios



/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');


