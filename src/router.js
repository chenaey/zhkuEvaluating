import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import persionInfo from './views/logins/persionInfo.vue'
import login from './views/logins/login.vue'
import studentInfo from './views/studentPage/info.vue'

//管理员路由
import managePage from './views/managePage/manage.vue'
import managePageHome from './views/managePage/Home.vue'
import managePageInfo from './views/managePage/Info.vue'
import managePageClassReview from './views/managePage/classReview.vue'
import managePageComprehensive from './views/managePage/comprehensive.vue'
import managePageReview from './views/managePage/review.vue'
import managePageSetting from './views/managePage/setting.vue'
import _404 from './views/errPage/404.vue'
import _401 from './views/errPage/401.vue'

import studentPageIndex from './views/studentPage/index.vue'
import studentPageComprehensive from './views/studentPage/comprehensive.vue'
import studentPageInfo from './views/studentPage/info.vue'
import studentPageHome from './views/studentPage/home.vue'

Vue.use(Router)
const router = new Router({

  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      // name: Home,
      // component: Home,
      component: login
    },
    {
      path: '/',
      // name: Home,
      // component: Home,
      redirect: '/login'
    },
    {
      path: '/manage',
      redirect: '/manage/home',
      component: managePage,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      },
      children: [{
        path: 'home',
        component: managePageHome,
        meta: {
          requireAuth: true,  // 该路由项需要权限校验
        },
      },
      {
        path: 'info',
        component: managePageInfo,
        meta: {
          requireAuth: true,  // 该路由项需要权限校验
        },
      },
      {
        path: 'class',
        component: managePageClassReview,
        meta: {
          requireAuth: true,  // 该路由项需要权限校验
        },
      },
      {
        path: 'comprehensive',
        component: managePageComprehensive
      }, {
        path: 'review',
        component: managePageReview
      }, {
        path: 'setting',
        component: managePageSetting
      },

      ],
    },

    {
      path: '/student',
      // default: studentPageIndex,
      redirect: '/student/home',
      component: studentPageIndex,
      meta: {
        requireAuth: true,  // 该路由项需要权限校验
      },
      children: [{
        path: 'home',
        component: studentPageHome
      },
      {
        path: 'info',
        component: studentPageInfo
      },
      {
        path: 'comprehensive',
        component: studentPageComprehensive
      },

      ],
    },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    //404
    {
      path: '/401',
      component: _401,
      // meta: { requiresAuth: true }
    },
    {
      path: '*',
      component: _404,
      // meta: { requiresAuth: true }
    },

  ],
  
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 获取当前的token是否存在
      console.log("token存在");
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/401', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});

export default router

