// pages/cart/cart.js
Page({
  // 获取收货地址
  chooseAddress() {
    // 先获取授权状态
    wx.getSetting({
      success: (res1) => {
        console.log(res1)
        // 如果状态为已经授权过或者是第一次点击授权，则直接调用获取地址API
        const scopeAddress = res1.authSetting["scope.address"]
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (res2) => {
              console.log(res2)
            }
          });
        } else {
          // 如果用户不小心点击了取消授权，则打开重新获取授权界面，授权完毕后再调用获取地址API
          wx.openSetting({
            success: (res3) => {
              wx.chooseAddress({
                success: (res2) => {
                  console.log(res2)
                }
              });
            }
          });
        }
      }
    });
  }
})