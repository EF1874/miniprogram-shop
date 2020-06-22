// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

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