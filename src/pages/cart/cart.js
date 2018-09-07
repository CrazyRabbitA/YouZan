import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin'

let app = new Vue({
  el: '#app',
  data: {
    shopLists: null,
    ifAllSelect: false,
    totalPrice: 0,
    isEdite: false,//用来判断处于那种状态
    ifAllRemove: false,
    ifDelete: false,
    removeData:null,
    ifDeleteAll:false,
  },

  created () {
    this.getLists()
  },

  methods: {
    getLists () {
      axios.get(url.cartList).then(res => {
        // console.dir(res.data)
        // console.dir(res.data.shopLists)
        let shop = res.data.shopLists
        shop.forEach(shop => {
          shop.shopChecked = false
          shop.ifEdite=false
          shop.editeStatus='编辑'
          shop.removeChecked=false
          shop.goodsLists.forEach(good => {
            good.goodChecked = false
            good.removeChecked=false
          })
        })
        // console.dir(shop[0].goodsLists)
        this.shopLists = shop
      })
    },

    // 这个注释不能删不能删不能删不能删。。。。。。。。。。。。。。
    // 下面这种方式是先对vue的根级属性（goodLists,是个数组）赋值，然后再对该根属性中的内容赋值（增加一个goodChecked属性并赋值为true），事实证明，赋值是可以的，但赋的值不是响应式的，先赋值后添加的属性不是响应式的
    // console.dir(res.data.goodsLists)
    // this.goodsLists=res.data.goodsLists
    // this.goodsLists.map((good)=>{
    //     good.goodChecked=true
    // })
    // 下面这种方式是先对获得的数据进行处理（对goodLists数组中的每个对象增加一个goodChecked属性并赋值为true），然后再赋值给vue的根级属性goodLists，结果证明，所赋的值是响应式的

    addGood (good, shop) {
      good.goodChecked = !good.goodChecked
      shop.shopChecked = shop.goodsLists.every(good => {
        return good.goodChecked === true
      })
    },
    removeGood(good,shop){
good.removeChecked=!good.removeChecked
shop.removeChecked=shop.goodsLists.every((good)=>{
    return good.removeChecked===true
})
    },
    addShop (shop) {
      shop.shopChecked = !shop.shopChecked
      if (shop.shopChecked) {
        shop.goodsLists.forEach(good => {
          good.goodChecked = true
        })
      } else {
        shop.goodsLists.forEach(good => {
          good.goodChecked = false
        })
      }
    },
    removeShop(shop){
        shop.removeChecked = !shop.removeChecked
        if (shop.removeChecked) {
          shop.goodsLists.forEach(good => {
            good.removeChecked = true
          })
        } else {
          shop.goodsLists.forEach(good => {
            good.removeChecked = false
          })
        }
    },
    selectAll () {
      this.ifAllSelect = !this.ifAllSelect
      if (this.ifAllSelect) {
        this.shopLists.forEach(shop => {
          shop.shopChecked = true
          shop.goodsLists.forEach(good => {
            good.goodChecked = true
          })
        })
      } else {
        this.shopLists.forEach(shop => {
          shop.shopChecked = false
          shop.goodsLists.forEach(good => {
            good.goodChecked = false
          })
        })
      }
    },
    removeAll(){
        this.ifAllRemove = !this.ifAllRemove
        if (this.ifAllRemove) {
          this.shopLists.forEach(shop => {
            shop.removeChecked = true
            shop.goodsLists.forEach(good => {
              good.removeChecked = true
            })
          })
        } else {
          this.shopLists.forEach(shop => {
            shop.removeChecked = false
            shop.goodsLists.forEach(good => {
              good.removeChecked = false
            })
          })
        }
    },
    edite(shop,shopIndex){
        shop.ifEdite=!shop.ifEdite
      shop.editeStatus=shop.ifEdite?'完成':'编辑'
      if(shop.ifEdite){
          this.isEdite=true
        this.shopLists.forEach((item,index)=>{
            if(index!=shopIndex){          
                item.editeStatus=''
            }
        })
      }
      else{
        this.isEdite=false      
        this.shopLists.forEach((item,index)=>{
            if(index!=shopIndex){          
                item.editeStatus='编辑'
            }
        })
      }
 
    },

    reduceNum(good){
if(good.number===1){return}
axios.post(url.cartReduce,{
  id:good.id,
  number:1,
}).then(res=>{
  if(res.data.status===200){
    good.number--
  }
})
    },
    addNum(good){
      console.log('为什么不执行')
axios.post(url.cartAdd,{
  id:good.id,
  number:1,
}).then(res=>{
  // console.dir(res)
if(res.data.status===200){
  good.number++
}
})
    },
    deleteGood(good,goodIndex,shop,shopIndex){
      this.ifDelete=true
      this.removeData={good,goodIndex,shop,shopIndex}
    },
    cancelDelete(){
      this.ifDelete=false
    },
    confirmDelete(){
      console.log(111)
      let{good,goodIndex,shop,shopIndex}=this.removeData
   axios.post(url.cartRemove,{
     id: good.id
   }).then(res=>{
     if(res.data.status===200){

       shop.goodsLists.splice(goodIndex,1)
       if(shop.goodsLists.length===0){
         this.shopLists.splice(shopIndex,1)
         this.shopLists.forEach((item)=>{
                  item.ifEdite=false   
              item.editeStatus='编辑'         
      })
       }
       this.ifDelete=false
       
     }
   })
    },
    deleteAllGood(){
      // console.log(1212)
this.ifDeleteAll=true
    },
    cancelDeleteAll(){
      this.ifDeleteAll=false
    },
    confirmDeleteAll(){
console.dir(this.removeLists)
this.shopLists.forEach((shop,shopIndex)=>{
  let arr=[]
  shop.goodsLists.forEach((good)=>{
    let index=this.removeLists.findIndex(item=>{
      return item.id===good.id
    })
    if(index===-1){
      arr.push(good)
    }
  })
  if(!arr.length){
    this.shopLists.splice(shopIndex,1)
    this.shopLists.forEach((item)=>{
             item.ifEdite=false   
         item.editeStatus='编辑'    
  })
}
else{
  shop.goodsLists=arr
}
this.ifDeleteAll=false
})




  },

  
 






  },
  computed: {
    allSelect: {
      get () {
        // console.log('全选执行了')
        // shopLists的初始值为null，数据是异步获取的，不加个判断会报错,不为空的数组
        if (this.shopLists&&this.shopLists.length) {
          return this.shopLists.every(shop => {
            return shop.shopChecked === true
          })
        }
      }
    },
    allRemove: {
get(){
    if (this.shopLists&&this.shopLists.length) {
        return this.shopLists.every(shop => {
          return shop.removeChecked === true
        })
      }
}
    },
    selectedLists(){
        // console.log('加入选择列表执行了')
        // console.log(this.shopLists)
        if(this.shopLists&&this.shopLists.length){
            // console.log('这应该只执行一次')
            let arr=[]
            let total=0
            this.shopLists.forEach((shop)=>{
shop.goodsLists.forEach((good)=>{
    if(good.goodChecked){
        arr.push(good)
        total+=good.number*good.price       
    }
})
            })
            this.totalPrice=total
         return arr
        }
        else {          
        return []  
        }     
    },
    removeLists(){
if(this.isEdite){
  let arr=[]
  this.shopLists.forEach((shop)=>{
    shop.goodsLists.forEach((good)=>{
      if(good.removeChecked){
        arr.push(good)
      }
    })
  })
  return arr
}
return []
    }
  },

  mixins: [mixin]
})
