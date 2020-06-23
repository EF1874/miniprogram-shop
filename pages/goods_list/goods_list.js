import { request } from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs数据
    tabs: [
      {
        title: "综合",
        isActive: true,
        id: 0
      },
      {
        title: "销量",
        isActive: false,
        id: 1
      },
      {
        title: "价格",
        isActive: false,
        id: 2
      }
    ],
    // 商品列表数据
    goodsList: []
  },

  // 请求商品列表数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否有旧数据
    const Goods = wx.getStorageSync("goods");
    if (!Goods) {
      this.getGoodsList(options)
    } else {
      if (Date.now() - Goods.time > 1000 * 60 * 5) {
        this.getGoodsList(options);
      } else {
        this.setData({
          goodsList: Goods.data
        })
      }
    }
  },

  // 点击事件
  handleTabsItemChange(e) {
    // console.log(e)
    // 获取被点击的标题索引
    const { index } = e.detail
    // 修改原数组，产生激活效果
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // console.log(index, this.data.tabs)
    // 赋值给data
    this.setData(
      {
        tabs
      }
    )
  },

  // 请求数据
  async getGoodsList(options) {
    // 0.给cid和data解构赋值
    this.QueryParams.cid = options.cid
    console.log(this.QueryParams)
    console.log('data:', this.QueryParams)
    // 1.发送异步请求
    const result = await request({ url: "/goods/search", data: this.QueryParams })
    // this.goodsList = result.goods
    this.setData({
      goodsList: result.goods
    })
    // 保存数据
    wx.setStorageSync("goods", { time: Date.now(), data: this.data.goodsList });
    // console.log(result, this.goodsList)
    // 2. 不使用异步请求
    // request({ url: "/goods/search" }, { data })
    //   .then(result => {
    //     this.setData({
    //       goodsList: result.goods
    //     })
    //     console.log(result,this.data.goodsList)
    //   })
    // 3. 不使用封装接口
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search', 
    //   data: {
    //       cid,
    //       pagenum: 1,
    //       pagesize: 10
    //     },
    //     success(res) {
    //       console.log(res.data)
    //     }
    //   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})