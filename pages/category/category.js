// pages/category/category.js
import { request } from "../../request/request.js"
Page({

  data: {
    // 左侧菜单列表
    leftMenuList: [],
    // 右侧内容
    rightContent: [],
    // 左侧菜单的编号
    currentIndex: 0,
    // 滚动条位置
    scrollToTop: 0
  },
  // 页面分类数据
  cateList: [],

  onLoad: function (options) {
    // 获取本地存储数据
    const Cates = wx.getStorageSync("cates");
    // 判断本地是否有数据
    if (!Cates) {
      this.getCateList();
    } else {
      // 有旧的数据 定义过期时间，判断是否过期
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCateList();
        // 没有过期则直接使用
      } else {
        this.cateList = Cates.data;
        this.setData({
          leftMenuList: this.cateList.map(v => v.cat_name),
          rightContent: this.cateList[0].children,
        })
      }
    }

  },

  // 获取分类数据
  async getCateList() {
    // request({ url: "/categories" })
    //   .then(result => {
    const result = await request({ url: "/categories" })
    this.cateList = result
    // 保存数据
    wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });
    this.setData({
      leftMenuList: this.cateList.map(v => v.cat_name),
      rightContent: this.cateList[0].children,
    })
    // console.log(this.cateList)
    // console.log(result)
    // })
  },
  // 左侧菜单点击事件
  clickLetter(e) {
    // console.log(e)
    const { index } = e.currentTarget.dataset
    let rightContent = this.cateList[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置scroll-top距离
      scrollToTop: 0
    })
  },

})