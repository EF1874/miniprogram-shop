// 获取授权状态
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => { reject(err) },
      complete: () => { }
    });
  })
}

// 获取收货地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => { reject(err) },
      complete: () => { }
    });
  })
}

// 重新打开授权页面
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => { reject(err) },
      complete: () => { }
    });
  })
}

// Promise形式的show MOdel
// @param {project} param0参数
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => { reject(err) },
      complete: () => { }
    });
  })
}

// Promise形式的showToast
// @param {project} param0参数
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: "none",
      success: (result) => {
        resolve(result);
      },
      fail: (err) => { reject(err) },
      complete: () => { }
    });
  })
}

// Promise形式的wx-login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => { reject(console.log(err)) },
      complete: () => { }
    });
  })
}

// Promise形式的微信小程序支付
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => { reject(console.log(err)) },
      complete: () => { }
    });
  })
}