import './category.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import $ from 'jquery'
import mixin from 'js/mixin.js'

let app = new Vue({
  el: '#app',
  data: {
    topLists: null,
    ifActive: false,
    topIndex: -1,
    hotGoods: [],
    hotShops: [],
    hotKeywords: [],
    brandList: [],
    categoryList: []
  },

  computed: {},
  methods: {
    getTopList () {
      axios.get(url.topList).then(res => {
        this.topLists = res.data.lists
      })
    },
    getSubList (firstId, index) {
      if (index == 0) {
        this.topIndex = -1
        this.getRank()
      } else {
        this.topIndex = index
        axios
          .get(url.subList, {
            params: {
              id: firstId
            }
          })
          .then(res => {
            this.brandList = res.data.data.brandList
            this.categoryList = res.data.data.categoryList
          })
      }
    },
    getRank () {
      axios.get(url.rank).then(res => {
        this.hotGoods = res.data.data.hotGoods
        this.hotShops = res.data.data.hotShops
        this.hotKeywords = res.data.data.hotKeywords
      })
    },
    toSearch (list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  created () {
    this.getTopList()
    this.getRank()
  },
  mounted () {
    $('#scroll-nav-content').on('click', 'li', e => {
      $(e.currentTarget).addClass('active').siblings().removeClass('active')
    })
  },
  mixins: [mixin]
})
