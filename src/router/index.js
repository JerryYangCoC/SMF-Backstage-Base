import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
// import ForgotPassword from '../views/ForgotPassword'
// import ResetPassword from '../views/ResetPassword'
import Overview from '../views/Overview.vue'
import Historical from '../views/Historical.vue'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/ForgotPassword',
  //   name: 'ForgotPassword',
  //   component: ForgotPassword
  // },
  // {
  //   path: '/ResetPassword',
  //   name: 'ResetPassword',
  //   component: ResetPassword
  // },
  {
    path: '/Overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/Historical',
    name: 'Historical',
    component: Historical
  },
  {
    path: '/',
    redirect: { name: 'Overview' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
