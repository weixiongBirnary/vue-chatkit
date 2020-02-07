import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import ChatDashboard from './views/ChatDashboard.vue'
import createUser from './views/createUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
//   base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatDashboard,
    },
    {
      path: '/createuser',
      name: 'createuser',
      component: createUser
    }
  ]
})



