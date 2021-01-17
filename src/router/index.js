import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Quotation from '../views/Quotation.vue';
import User from '../components/User.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegistration from '../views/UserRegistration.vue';

Vue.use(VueRouter)
/* eslint-disable no-debugger */

const routes = [
  {
    path: "/user",
    name: 'user',
    component: User,
    beforeEnter(to, from, next) {
      let token = JSON.parse(window.localStorage.token);
      if(token) {          
        next();        

      } else {
        next("/"); 

      }
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },  
      {
        path: 'quotation/:selectedQuotation',
        name: 'Quotation',
        component: Quotation,
      },
      {
        path: '/users',
        name: 'user-registration',
        component: UserRegistration,
      },

    ]
  },
  {
    path: '/',
    name: 'user-login',
    component: UserLogin,
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
