import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
        {
            path: '/',
            redirect: '/readme'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/pcount',
                    component: resolve => require(['../components/page/PCount.vue'], resolve)
                },
               {
                    path: '/qcount',
                    component: resolve => require(['../components/page/QCount.vue'], resolve)
                },
                {
                    path: '/users',
                    component: resolve => require(['../components/page/Users.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
  ]
})
