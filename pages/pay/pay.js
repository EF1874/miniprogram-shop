
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
  handleOrderPay() {
    const { token } = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
        success: (result)=>{
          console.log(result)
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    } else {
      console.log("已获取token")
    }
  }
})