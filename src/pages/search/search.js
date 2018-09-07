import 'css/common.css'
import './search.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin'


let{keyword,id}=qs.parse(location.search.substring(1))

new Vue({
    el:'#app',
    data:{
        searchList:null,
        keyword,
        isShow:false,
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axios.post(url.searchList,{keyword,id}).then(res=>{
console.dir(res.data.lists[0])
this.searchList=res.data.lists
            })
        },
        move(e){
            console.log('move')
            console.log(document.documentElement.scrollTop)
            // console.log(e.currentTarget)
            if(document.documentElement.scrollTop>100){
            console.log('该显示了')
                
                        this.isShow=true
            } 
            else{
this.isShow=false
            }
        },
        backTop(){

        },
    },
    mixins:[mixin]

})