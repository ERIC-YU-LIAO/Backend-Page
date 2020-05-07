import Vue from 'vue'

// 載入npm axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import currencyfilter from './components/filters/currency'  //插入 filter.js

// import 驗證tool 
// import * as VeeValidate from 'vee-validate';// Root Cause 主要因3.0cli  版本但目前使用2.0cli  import方式有所更改
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)

// import { extend } from 'vee-validate';
// import { required } from 'vee-validate/dist/rules';
// import { ValidationProvider } from 'vee-validate';
// Vue.component('ValidationProvider', ValidationProvider);
// extend('required', {
//   ...required,
//   validate: name => name === '',
//   message: '請輸入姓名'
// });

import './eventbus'

// Vue.config.productionTip = false,
// Vue.use(VueLoading);
Vue.use(VueAxios, axios),
axios.defaults.withCredentials = true; // cookie 設定

Vue.component('Loading',Loading) // 載入啟用Loading 的元件
Vue.filter('currency', currencyfilter)  // 全域註冊filter

new Vue({
  router,
  store,
  // ValidationProvider, //插入驗證
  render: h => h(App)
}).$mount('#app')



router.beforeEach((to, from, next) => {
    console.log('to',to, 'from', from, 'next',next);
    // meta.requiresAuth 要為true 需驗證
    if(to.meta.requiresAuth){
      //走下方api
      const api = 'https://vue-course-api.hexschool.io/api/user/check'
      axios.post(api).then((response)=>{
      console.log(response.data)
      // 如果接API成功
      if(response.data.success){
        next() // next放行 進入下一頁
      }else{
        next({
          path:'/login'// 不對的話就一直跳入 login頁面
        })
      }
  })
    }else{
      next()
    }
})

