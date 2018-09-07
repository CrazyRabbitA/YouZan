// import './goods_base.css'
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin'
import Swipe from 'components/Swipe.vue'

let { id } = qs.parse(location.search.substr(1))
let tabSelect = ['商品详情', '本店成交']

new Vue({
  el: '#app',
  data: {
      id,
    details: null,
    tabSelect,
    tabIndex: 0,
    dealList: null,
    bannerList: null,
    skuType: 1,
    showMask: false,
    showBuy: false,
    purchaseNum:1,
    ifAdd:false,
    showAddMessage:false,
    ifAddCart: false,
    twoChoice:false,
    buyNow: false,
  },
  components: {
    Swipe
  },
  created () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      axios.post(url.details, { id }).then(res => {
        // console.dir(res.data.data)
        this.details = res.data.data
        // 下面对要传递到轮播组件的数据进行数据改造
        let final = []
        res.data.data.imgs.map(item => {
          final.push({ clickUrl: '#', image: item.picUrl})
        })
        this.bannerList = final
      })
    },
    changeStatus (index) {
      this.tabIndex = index
      if (index === 1) {
        axios.post(url.deal, { id }).then(res => {
          //  console.dir(res.data.data.lists[0] )
          this.dealList = res.data.data.lists
        })
      }
    },
    showHide(num){
        this.skuType=num
        if(num===1){
            this.twoChoice=true
            this.ifAddCart=false
            this.buyNow=false          
        }
        else if(num===2){
            this.twoChoice=false
            this.ifAddCart=true
            this.buyNow=false
        }
        else if(num===3){
            this.twoChoice=false
            this.ifAddCart=false
            this.buyNow=true
        }
        this.showMask=true
    setTimeout(()=>{
            this.showBuy=true
        },200)
    },
   hideMask(num){
        // this.skuType=num
        this.showBuy=false
        
    setTimeout(()=>{
        this.showMask=false
            
        },300)
    },
    addNum(){
        this.purchaseNum+=1
    },
    reduceNum(){     
if(this.purchaseNum==1){this.purchaseNum=1}
else{
    this.purchaseNum-=1
}
    },
    addCart(){
        // console.log('加入购物车了')
        axios.post(url.addCart,{id:id,number:this.purchaseNum}).then(res=>{
            // console.dir(res)
           if(res.data.status===200){
               this.hideMask()
               this.ifAdd=true
               this.showAddMessage=true
               setTimeout(()=>{
this.showAddMessage=false
               },1500)
           }
        })
    }
  },
  watch:{
      showBuy(val,oldval){
          document.body.style.overflow=val?'hidden':'auto'
          document.querySelector('html').style.overflow=val?'hidden':'auto'
          document.body.style.height=val?'100%':'auto'     
          document.querySelector('html').style.height=val?'100%':'auto'     
      }
  },
  mixins: [mixin]
})
