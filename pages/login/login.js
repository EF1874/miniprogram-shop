// pages/login/login.js
Page({
  getUserInfo(e) {
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})