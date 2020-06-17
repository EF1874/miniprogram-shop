//Page Object
Page({
  data: {
    // 轮播图片列表
    swiperList: {}
  },
  //options(Object)
  onLoad: function(options){
    // 发送异步请求获取轮播图数据
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      // 默认值可以省略
      // data: {},
      // header: {'content-type':'application/json'},
      // method: 'GET',
      // dataType: 'json',
      // responseType: 'text',
      success: (result)=>{
        // 为轮播图列表赋值
        this.setData({
          swiperList: result.data.message
        })
        // console.log('swiperList', this.data.swiperList)
      }
    });
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});

// pages/home/home.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     swiperList: {}
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })