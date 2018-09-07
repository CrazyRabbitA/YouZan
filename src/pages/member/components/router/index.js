import Vue from 'vue'
import Router from 'vue-router'//路由是一个插件

Vue.use(Router)//使用插件 

//创建router实例
let routes=[
    {
    path:'/',
    component:require('../member.vue')
},
{
    path:'/address',
    component: require('../address.vue'),
    children:[
        {
            path:'', 
            // component:require('./components/all.vue')
            redirect:'all'

        },
        {
            path:'all',
            name:'all',
            component:require('../all.vue')

        },
        {
            path:'form',
            name:'forms',
            component:require('../form.vue')

        }
    ]
}

]
let router=new Router({
    routes
})
export default router