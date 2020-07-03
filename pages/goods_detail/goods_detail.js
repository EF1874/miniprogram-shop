import { request } from "../../request/request.js";
// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
  },
  goodsData: {},
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
    this.goodsData = goodsInfo
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

  // 点击轮播图查看大图
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

  // 点击加入购物车
  handleCartAdd() {
    // 获取缓存中的购物车数组
    const cart = wx.getStorageSync('cart') || [];
  // 判断 商品对象是否存在于购物车数组中
    const index = cart.findIndex(v => v.goods_id === this.goodsData.goods_id)
    if(index === -1) {
      // 不存在,表示第一次添加购物车,
      this.goodsData.num = 1;
      this.goodsData.checked = true;
      cart.push(this.goodsData)
    } else {
      // 已存在,把购物车数量增加
      cart[index].num++
    }
    // 把购物车重新添加回缓存
    wx.setStorageSync('cart', cart);
    // 弹框提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户手抖疯狂点击按钮，为true会等待1.5s才能再次点击
      mask: true,
    });
  }
})