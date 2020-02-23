// import post_content from "../../data/post-data"
var postData = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      '/imgs/swiper-img/lb1.jpg',
      '/imgs/swiper-img/lb2.jpeg',
      '/imgs/swiper-img/lb3.jpg',
      '/imgs/swiper-img/lb4.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_key: postData.post_List //名字和变量名相同的话直接post_content
    }) //把所有数据拷贝到data对象里
    console.log(this.data.post_key, '0000000')
  },
  // 点击详情
  onPostDetail: function(event) {
    // 获取postid
    let {postid} = event.currentTarget.dataset
     wx.navigateTo({
       url: '../post-detail/post-detail?id=' + postid,
     })
      },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton({ //屏蔽重定向后出现首页按钮
      complete: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 即将离开页面时执行
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  }
})