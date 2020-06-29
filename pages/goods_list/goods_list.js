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

  // 总页数
  totalPage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid

    // 判断是否有旧数据
    this.getGoodsList()
    // const Goods = wx.getStorageSync("goods");
    // if (!Goods) {
    //   this.getGoodsList(options)
    // } else {
    //   if (Date.now() - Goods.time > 1000 * 60 * 5) {
    //     this.getGoodsList(options);
    //   } else {
    //     this.setData({
    //       goodsList: Goods.data
    //     })
    //   }
    // }
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
  async getGoodsList() {
    // console.log(this.QueryParams)
    // 1.发送异步请求
    const result = await request({ url: "/goods/search", data: this.QueryParams })
    // 计算总页数
    this.totalPage = Math.ceil(result.total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    // console.log('result:', result, this.totalPage)
    // // 保存数据
    // wx.setStorageSync("goods", { time: Date.now(), data: this.data.goodsList });
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
    this.QueryParams.pagenum = 10
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    /* 
    * 1.触发下拉刷新
    * 2.重置 数据 数组
    * 3.重置页码 设置为1
    * 4.重新发送请求
    */
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /*
    * 1 用户上滑页面。滚动条触底 开始加载下一页数据
    *   1.找到滚动条触底事件 
    *   2.判断还有没有下一页数据
    *     1.获取总页数， 获取数据列表的时候有总条数，进行计算
    *     2.总页数 = Math.ceil(总条数 / 页容量)，将总页数保存
    *     3.获取到当前的页码
    *     3.判断当前页码是否大于等于 总页数
    *   3.假如没有下一页数据 弹出一个提示
    *   4.假如还有下一页数据 加载下一页数据
    *     1.当前的页码 ++
    *     2.重新发送请求
    *     3.请求回来的数据不能直接替换原数组 会导致旧数据消失，需要对 data中的数组进行 拼接 
    */
    console.log("触底加载")
    if (this.QueryParams.pagenum >= this.totalPage) {
      // console.log("已经没有下一页")
      wx.showToast({
        title: '加载完毕！'
      });
    } else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})