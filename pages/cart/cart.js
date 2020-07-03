import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js"

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
    const cart = wx.getStorageSync("cart") || [];
    // // 设置全选状态
    // const allChecked = cart.length === 0 ? false : cart.every(v => v.checked);
    this.setData({
      address
    })
    // 重新计算底栏数据
    this.getFooterData(cart)
  },

  // 获取收货地址
  async chooseAddress() {
    try {
      // 先获取授权状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      // 判断 如果状态为未获取，则打开授权页面
      if (scopeAddress === false) {
        // 引导用户打开授权界面
        await openSetting()
      }
      // 调用收货地址API
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 将地址存入缓存区
      wx.setStorageSync("address", address);
      console.log(res2)
    } catch (err) {
      // 打印错误信息
      console.log(err)
    }
  },

  // 勾选商品事件
  checkboxChange(e) {
    // console.log(e)
    const { cart } = this.data;
    // 获取被选中的商品id
    const { goods_id } = e.currentTarget.dataset;
    // 获取被选中的商品index
    const index = this.data.cart.findIndex(v => goods_id === v.goods_id);
    // console.log(cart, goods_id, index)
    // 修改商品选中状态
    cart[index].checked = !cart[index].checked;
    // 重新计算总金额总数量和全选
    this.getFooterData(cart)
  },

  // 全选、全不选
  allCheckedChange() {
    // 获取全选状态
    const { allChecked } = this.data
    // 获取购物车数据
    const { cart } = this.data;
    // 遍历购物车商品，全部取全选状态相反的状态
    cart.forEach(v => v.checked = !allChecked)
    // 重新计算底栏
    this.getFooterData(cart)
  },

  // 减少商品数量
  numReduce(e) {
    // 获取购物车数据
    const { cart } = this.data;
    // 获取被选中的商品id
    const { goods_id } = e.currentTarget.dataset;
    // 获取被选中的商品index
    const index = this.data.cart.findIndex(v => goods_id === v.goods_id);
    // 减少购物车商品数量
    cart[index].num--;
    // 如果数量为0则删除该商品
    if (cart[index].num === 0) {
      cart.splice(index, 1)
    };
    // 重新计算底栏数据
    this.getFooterData(cart);
  },

  // 增加商品数量
  numAdd(e) {
    // console.log(e)
    // 获取购物车数据
    const { cart } = this.data;
    // 获取被选中的商品id
    const { goods_id } = e.currentTarget.dataset;
    // 获取被选中的商品index
    const index = this.data.cart.findIndex(v => goods_id === v.goods_id);
    // 商品数量增加
    cart[index].num++;
    // 重新计算底栏数据
    this.getFooterData(cart);
  },

  // 获取底部全选状态，总金额，总数量
  getFooterData(cart) {
    let allChecked = true
    // 定义总金额和总数量
    let totalNum = 0;
    let totalPrice = 0;
    // 遍历购物车数组，计算总金额和数量
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
      } else {
        // 如果存在未选中状态，则全选状态为false
        allChecked = false;
      }
    })
    // 如果数组为空，allChecked = false,否则不变
    cart.length === 0 ? allChecked = false : allChecked;
    // 将数据保存到data
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    });
    // 将数据保存至缓存
    wx.setStorageSync("cart", cart);
  }
})