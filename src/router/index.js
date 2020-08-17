import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Accueil from '../components/Accueil';
import Relative from '../components/Relative';
import Quotation from '../views/Quotation.vue';
import AdminUserList from '../views/AdminUserList.vue';
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
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if(currentUser && currentUser.firstName) {
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
        path:'admin/users',
        name: 'admin-user-list',
        component: AdminUserList,    
      },
      {
        path: 'quotation/:selectedQuotation',
        name: 'Quotation',
        component: Quotation,
      },

    ]
  },
  {
    path: '/',
    name: 'user-login',
    component: UserLogin,
  },
  {
    path: '/users',
    name: 'user-registration',
    component: UserRegistration,
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/relative',
    name: 'RelativeAccueil',
    component: Relative,
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
