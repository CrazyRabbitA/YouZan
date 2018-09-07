import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import InfiniteScroll from 'mint-ui'
import mixin from 'js/mixin'
import Swipe from 'components/Swipe'

Vue.use(InfiniteScroll)

let app = new Vue({
  el: '#app',
  data: {
    lists: '',
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    ifLoading: false,
    bannerLists: null,
    goodShop: null,
    maxPage: 10
  },
  components: {
    Swipe
  },

  created: function () {
    this.getBanner()
    this.getGoodShop()
    this.getLists()
  },

  methods: {
    getLists () {
      if (this.allLoaded) {
        return
      }
      this.loading = true
      this.ifLoading = true
      axios
        .post(url.hotList, {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let curLists = res.data.data.lists
          if (curLists.length < this.pageSize) {
            this.allLoaded = true
          }
          if (this.lists) {
            this.lists = this.lists.concat(curLists)
          } else {
            this.lists = curLists
          }
          this.loading = false
          this.ifLoading = false
          this.pageNum++
          if (this.pageNum == this.maxPage) {
            this.allLoaded = true
          }
        })
    },
    getBanner () {
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    },
    getGoodShop () {
      axios.get(url.goodShop).then(res => {
        this.goodShop = res.data.lists
      })
    }
  },
  mixins: [mixin]
})
