let url = {
  // 首页接口
  banner: '/index/banner',
  goodShop: '/index/goodShop',
  hotList: '/index/hotList',
  // 分类页接口
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank',
  searchList: '/search/list',
  details: '/goods/details',
  deal: '/goods/deal',
  // 购物车接口
  cartAdd: '/cart/add',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartRemoveMore: '/cart/removeMore',
  cartList: '/cart/list',
  cartUpdate: '/cart/update',
  // 地址管理
  addressLists: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault'
}
let host = 'http://rap2api.taobao.org/app/mock/25696'
for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}
export default url
