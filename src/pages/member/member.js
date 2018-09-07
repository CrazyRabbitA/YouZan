

console.log('od')


import './member.css'
import './member_base.css'

import Vue from 'vue'
import router from './components/router/index.js'
import store from './components/vuex/index.js'
//根组件注入
console.dir(router)
 new Vue({
     el:'#app',
     router,
     store
 }) 
