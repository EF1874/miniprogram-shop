// 暴露请求
export const request = (params) => {
  // 返回Promise实例
  return new Promise((resolve, reject) => {
    // 请求数据
    wx.request({
      // 解构params,为URL
      ...params,
      success: (result) => {
        // 成功之后接收的参数
        resolve(result)
      },
      fail: (err) => {
        // 失败后接收参数
        reject(err)
      }
    });
  })
}