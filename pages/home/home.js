// 引入 用来发送请求的 方法
import { request } from "../../request/request.js"
//Page Object
Page({
  data: {
    // 轮播图片列表
    swiperList: {},
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // 获取轮播图数据
    this.getSwiperList()
    // 获取分类导航数据
    this.getCatItems()
    // 获取楼层数据
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },

  // 获取分类导航数据
  getCatItems() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
      .then(result => {
        this.setData({
          cateList: result.data.message
        })
        // console.log('res:', result, 'catItem:', this.data.cateList)
      })
  },

  // 获取楼层导航
  getFloorList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }
});
