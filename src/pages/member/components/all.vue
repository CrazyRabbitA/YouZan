<template>
   <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" >
      <a class="block-item js-address-item address-item "  v-for='list in lists' @click=toEdit(list) :class='{"address-item-default": list.isDefault}' :key=list.id>
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'forms',query:{type:'add'}}">
            新增地址
      </router-link>
    </div>
      <!-- <a style="display: block;" href="https://pfmarket.youzan.com/market/home?m_alias=3nu78u467kddj" class="ft-copyright"></a> -->
  </div>

</template>

<script>
// import axios from 'axios'
// import url from 'js/api.js'
// import Address from 'js/addressService.js'
// import store from './vuex/index.js' 
    export default{
        data(){
            return {
                // lists:null,
            }
        },
        
        computed:{
             lists(){
           return this.$store.state.lists
            },
        },
        created(){
            // console.dir(Address.list())
            // Address.list()  
// Address.list().then(res=>{
// this.lists=res.data.lists
// }
// )
if(!this.lists){
this.$store.dispatch('getLists')
}
        },


        methods:{
toEdit(list){
    // this.$router.push({path:'/address/form'})
    this.$router.push({name:'forms',query:{type:'edit',instance:list}})

}
        }
    }
</script>

<style>
@import '../address_base.css';
@import '../address.css';
</style>
