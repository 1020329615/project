import Vue from 'vue'
import Router from 'vue-router'
// 引入一级路由
import Index from '@/components/index';
import Login from '@/components/login';
import Sign from '@/components/sign';
import Detail from '@/components/detail';
// 引入二级路由
import Home from '@/components/home';
import Person from '@/components/pages/person';
import Sort from '@/components/pages/sort';
import Car from '@/components/pages/car';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children:[{
        path:'/home',
        component: Home
      },{
        path:'/person',
        component: Person
      },{
        path:'/sort',
        component: Sort
      },{
        path:'/car',
        component: Car
      }]
    },{
      path:'/detail',
      component: Detail
    },{
      path:'/login',
      component: Login
    },{
      path:'/sign',
      component: Sign
    },{
      path:'*',
      redirect:'/home'
    }
  ]
})
