import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/login'
import desTest from '@/components/desTest'
import login2 from '@/components/login2'
import weightMain from '@/components/weightMain'



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/HelloWorld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
    {
      path: '/desTest',
      name: 'desTest',
      component: desTest

    },
    {
      path: '/',
      name: 'login2',
      component: login2
    },
    {
      path: '/weightMain',
      name: 'weightMain',
      component: weightMain
    }


  ]
})
