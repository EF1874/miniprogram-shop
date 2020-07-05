// pages/auth/auth.js
import { login } from "../../utils/asyncWx.js"
// import { request } from "../../request/request.js"

Page({
  // 点击授权事件
  async getUserInfo(e) {
    try {// 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 获取code
      const { code } = await login();
      // console.log(code);
      // 将请求参数保存到对象
      const loginParams = { encryptedData, rawData, iv, signature, code };
      // request({ url: "/users/wxlogin", data: loginParams, method: "post" });
      // // 把token 存入缓存中，同时跳转回上一个页面
      // wx.setStorageSync("token", token);
      // wx.navigateBack({
      //   delta: 1
      // });
      console.log("没有企业号，无法获取token")
      wx.navigateBack({
          delta: 1
        });
    }
    catch (err) {
      console.log(err)
    }
  }
})