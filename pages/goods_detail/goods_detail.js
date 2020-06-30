import { request } from "../../request/request.js";
// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const { goods_id } = options
    this.getGoodsInfo(goods_id)
  },

  // 获取商品详情数据
  async getGoodsInfo(goods_id) {
    const goodsInfo = await request({ url: "/goods/detail", data: { goods_id } })
    this.setData({
      goodsInfo: {
        goods_name: goodsInfo.goods_name,
        goods_price: goodsInfo.goods_price,
        // iphone部分手机不识别webp图片格式
        goods_introduce: goodsInfo.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsInfo.pics
      }
    })
    console.log(goods_id, goods_id, this.data.goodsInfo)
  },

  // 点击查看大图
  previewImage(e) {
    const current = e.target.dataset.url;
    // 将图片链接添加到一个数组内
    const urls = this.data.goodsInfo.pics.map(v => v.pics_mid)
    console.log(e,urls,this.data.goodsInfo)
    wx.previewImage({
      current, // 当前显示图片的http链接  
      urls // 需要预览的图片http链接列表  
    })
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