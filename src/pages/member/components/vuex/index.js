// 使用Vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'

Vue.use(Vuex)
// 创建实例
const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init (state, lists) {
      state.lists = lists
    },
    add(state,instance){
state.lists.push(instance)
    },
    update(state,instance){
        //lists增加内容可以的，删除内容也是可以的，都可以检测到变化
        //现在是改变lists数组中某一项的值（替换），vue检测不到了
        //方法就是把整个lists数组替换掉，然后就用到了深拷贝
        let lists=JSON.parse(JSON.stringify(state.lists))
        let index=state.lists.findIndex(item=>{
            return item.id===instance.id
        })
        lists[index]=instance
        state.lists=lists
    },
    remove(state,id){
        if(id){
            let index=state.lists.findIndex(item=>{
                return item.id===id
            })
            state.lists.splice(index,1)
        }
    },
    default(state,id){
       
        let index=state.lists.forEach(item=>{
           if(item.id===id){
               item.isDefault=true
           } 
           else{
               item.isDefault=false
           }
        })
        // state.lists[index1].isDefault=false
    //   Vue.set(state.lists[index1],'isDefault',false)
        
        // let index2=state.lists.findIndex(item=>{
        //     return item.id===id
        // })
        // state.lists[index2].isDefault=true
    //   Vue.set(state.lists[index2],'isDefault',true)

        
    }

  }, // 更改state中的数据只能通过mutations，该过程是同步的
  // mutations中定义一系列方法对state中的数据进行修改

  // 存放所有的异步逻辑
  // 不能直接修改state中的数据，必须要先触发mutations中的方法，间接的修改state中的数据
  actions: {
    getLists ({ commit }) {
      Address.list().then(res => {
        commit('init', res.data.lists)
      })
    },
    addLists({commit},instance){
        Address.add(instance).then(res=>{
            instance.id=res.data.id
            commit("add",instance)
        })
    },
    deleteLists({commit},id){
        Address.remove(id).then(res=>{
            commit('remove',id)
        })
    },
    setDefault({commit},id){
        Address.setDefault(id).then(res=>{
            commit('default',id)
        })
    },
    updateLists({commit},instance){
    Address.update(instance.id).then(res=>{
commit('update',instance)
    })
  }
}
})

export default store
