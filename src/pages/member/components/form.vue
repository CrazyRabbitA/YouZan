<template>
    <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model='name' maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model='provinceValue'>
              <option value="-1">选择省份</option>
              <option :value="p.value" v-for='p in addressData.list'>{{p.label}}</option>
              
             
            </select>
            <select class="js-city-selector" v-model='cityValue'>
              <option value="-1">选择城市</option>
              <option :value='city.value' v-for="city in cityList">{{city.label}}</option>
              
            </select>
            <select class="js-county-selector" name="area_code" data-code="" v-model='districtValue'>
              <option value="-1">选择地区</option>
              <option :value="district.value" v-for='district in districtList'>{{district.label}}</option>
              
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model='address' maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div class="block-item c-blue center" @click=add>保存</div>
    </div>
    <div class="block section js-delete  block-control-btn" v-show='type==="edit"'>
      <div class="block-item c-red center" @click=remove>删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default " v-show='type==="edit"'>
      <button class="btn btn-standard js-save-default-btn" @click=setDefault>设为默认收货地址</button>
    </div>
     <a style="display: block;" href="https://pfmarket.youzan.com/market/home?m_alias=3nu78u467kddj" class="ft-copyright"></a>
  </div>
 
</template>
 

 <script>
 import Address from 'js/addressService.js'
   export default { 
     name:'forms',
     data(){
        return{
          name:'',
          tel:'',
          provinceValue:-1,
          cityValue:-1,
          districtValue:-1,
          address: '',
          id:'',
          type:this.$route.query.type,
          instance: this.$route.query.instance,
          addressData: require('js/address.json') ,
          cityList:null,
          districtList:null,
        }
     },
     watch:{
       provinceValue(val){
         if(val===-1){return}
         let list=this.addressData.list 
         let index=list.findIndex(item=>{   
           return item.value===val
         })
        
         this.cityList=list[index].children     
         this.cityValue=-1
         this.districtValue=-1


         if(this.type==='edit'){
           this.cityValue=parseInt(this.instance.cityValue)
         }
       },
          cityValue(val){
         if(val===-1){return}
         let list=this.cityList
         let index=list.findIndex(item=>{
           return item.value===val
         })
         this.districtList=list[index].children
         this.districtValue=-1
         
         if(this.type==='edit'){
           this.districtValue=parseInt(this.instance.districtValue)
         }
       },
      //  lists(){
      //    this.$router.go(-1)
      //  }
      lists:{
        handler(){
          this.$router.go(-1)
        },
        deep:true

      }

   },
   methods:{
     add(){
       //需要做非空和合法性校验
// console.dir(this)
let {name,tel,provinceValue,cityValue,districtValue,address}=this
let data={name,tel,provinceValue,cityValue,districtValue,address}
if(this.type==='add'){
// Address.add(data).then(res=>{
//   // console.log('好难')
//   this.$router.go(-1)
// })
this.$store.dispatch('addLists',data)
}
if(this.type==='edit'){
  data.id=this.id
// Address.update(data).then(res=>{
//   // console.log('好难')
//   this.$router.go(-1)
// })
this.$store.dispatch('updateLists',data)
}
     },
     remove(){
if(window.confirm('确认删除？')){
// Address.remove(this.id).then(res=>{
//   this.$router.go(-1)
// })
this.$store.dispatch('deleteLists',this.id)
}
     },
     setDefault(){
// Address.setDefault(this.id).then(res=>{
//   this.$router.go(-1)
// })
console.log(333)
this.$store.dispatch('setDefault',this.id)
console.log(333)


     }
   },
   created(){
     if(this.type==='edit'){
       let ins=this.instance  
       this.provinceValue=ins.provinceValue
       this.name=ins.name
       this.address=ins.address 
       this.tel=ins.tel
       this.id=ins.id
     }
   },
   computed:{
     lists(){
       return this.$store.state.lists
     }
   }
   }
 </script>