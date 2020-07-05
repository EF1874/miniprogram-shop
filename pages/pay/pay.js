import request from "../../request/request.js"
import { requestPayment, showToast } from "../../utils/asyncWx.js"

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    // 获取缓存的地址
    const address = wx.getStorageSync("address");
    // 获取缓存的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数据
    cart = cart.filter(v => v.checked)
    this.setData({
      address
    })

    // 定义总金额和总数量
    let totalNum = 0;
    let totalPrice = 0;
    // 遍历购物车数组，计算总金额和数量
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
      }
    })
    // 将数据保存到data
    this.setData({
      cart,
      totalNum,
      totalPrice
    });
  },

  // 点击支付事件
  async handleOrderPay() {
    try {// 定义token
      const { token } = wx.getStorageSync("token");
      // 判断缓存内是否存在token，不存在则跳转授权页面
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
          success: (result) => {
            console.log(result);
          },
          fail: (err) => { err },
        });
      }
      // 创建订单
      // 准备请求头
      // const header = { Authorization: token };
      // 获取请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      // 定义空数组用于保存goods参数
      let goods = [];
      const cart = this.data.cart;
      // 遍历cart，将参数添加到goods
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.goods_number,
          goods_price: v.goods_price
        })
      });
      const orderParams = { order_price, consignee_addr, goods }
      // 请求创建订单
      const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
      console.log(res);
      // 发起预支付接口
      const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
      // console.log(res)
      // 发起微信支付
      await requestPayment(pay);
      console.log(res);
      // 查询支付状态
      const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
      console.log(res);
      // 请求成功提示
      await showToast({ title: "支付成功" });
      // 手动删除缓存中已支付商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => v.checked);
      // 保存新数据
      wx.wx.setStorageSync("cart", newCart);
      // 成功之后跳转订单界面
      wx.navigateTo({
        url: "./pages/order/order"
      })
    }
    // 请求失败
    catch (err) {
      await showToast({ title: "支付失败" });
      console.log(err)
    }
  }
})
