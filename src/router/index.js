import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '@/components/page/login'
import Dashboard from '@/components/Dashboard'
import products from '@/components/page/products'
import customerorder from '@/components/page/CustomerOrder'
import customerCheck from '@/components/page/customerCheck'
import finishorder from '@/components/page/finishorder'
import coupon from '@/components/page/coupon'


Vue.use(VueRouter)

const routes = [
  {
    path:'*',     // * 為無設定亂打得網址
    redirect:'login' // 轉跳至login
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //   meta: { requiresAuth: true }, // 
  // },
  {
    path:'/login',
    name: 'login',
    component: Login,
  },
  {
    path:'/admin',
    name: 'Dashboard',
    component: Dashboard, //Dashboard 模板
    children:[
      {
        path:'products',
        name: 'products',
        component: products,
        meta: { requiresAuth: true  }, // 需驗證
      },
      {
        path:'coupon',
        name: 'coupon',
        component: coupon, //customerorder 模板
      },
      {
        path:'finishorder',
        name: 'finishorder',
        component: finishorder, //customerorder 模板
      },
    ],
  },
  {
    path:'/',
    name: 'Dashboard',
    component: Dashboard,  //Dashboard 模板下的
    children:[
      {
        path:'customerorder',
        name: 'customerorder',
        component: customerorder, //customerorder 模板
      },
      {
        path:'/customerCheck/:orderId',
        name: 'customerCheck',
        component: customerCheck, //customerorder 模板
      },
    ],
  }
]

const router = new VueRouter({
  routes
})

export default router
