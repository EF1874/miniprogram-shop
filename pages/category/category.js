// pages/category/category.js
import { request } from "../../request/request.js"
Page({

  data: {
    // 左侧菜单列表
    leftMenuList: [],
    // 右侧内容
    rightContent: []
  },
  // 页面分类数据
  cateList: [],

  onLoad: function (options) {
    this.getCateList()
  },

  // 获取分类数据
  getCateList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/categories" })
      .then(result => {
        this.cateList = result.data.message
        this.setData({
          leftMenuList: this.cateList.map(v => v.cat_name),
          rightContent: this.cateList[0].children,
        })
        console.log(this.cateList)
        // console.log(result)
      })
  }
})