let ajaxTimes = 0;
// 暴露请求
export const request = (params) => {
  // 判断 url中是否带有 /my/ 请求的是私有路径，带上header token
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
    // 拼接header 带上token
    header["Authorization"] = wx.getStorageSync("token");
  }
  ajaxTimes++
  // 显示加载图标
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  // 定义公共接口路径
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  // 返回Promise实例
  return new Promise((resolve, reject) => {
    // 请求数据
    wx.request({
      // 解构params,为URL
      ...params,
      header: header,
      // 拼接请求路径
      url: baseUrl + params.url,
      success: (result) => {
        // 成功之后接收的参数
        resolve(result.data.message)
      },
      fail: (err) => {
        // 失败后接收参数
        reject(err)
      },
      // 无论请求成功与否都会触发
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          // 隐藏加载图标
          wx.hideLoading();
        }
      }
    });
  })
}