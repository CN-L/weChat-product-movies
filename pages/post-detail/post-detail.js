// pages/pst-detail/post-detail.js
var app = getApp()
var postdetals = require("../../data/post-data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //接收参数
    console.log(app.globalData.g_isPlayStatus, '3333333')
    this.initStatus()
    var collect= wx.getStorageSync('collectionStatus')
    var postid = options.id
    this.setData({
      postId: postid,
      collect: collect //获取初始化收藏状态
    })
    var postDetailForm = postdetals.post_details[postid - 1]
    this.setData({
      detailForm: postDetailForm
    })
  },
  initStatus: function() {
    var that = this
    wx.onBackgroundAudioPlay((res) => {
      console.log(this.data.isPlayStatus, 'true')
      that.setData({
        isPlayStatus: true
      })
      app.globalData.g_isPlayStatus = true
    })
    wx.onBackgroundAudioPause((res) => {
      that.setData({
        isPlayStatus: false
      })
      console.log(this.data.isPlayStatus, 'false')
      app.globalData.g_isPlayStatus = false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 音乐播放
  onMusicTap: function() {
    var isPlayStatus = this.data.isPlayStatus
    if(isPlayStatus) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayStatus: false
      })
      app.globalData.g_isPlayStatus = false
      console.log(app.globalData.g_isPlayStatus, '3333333')
    } else {
      wx.playBackgroundAudio({
        title: "世界这么大还是遇见你",
        dataUrl: 'https://webfs.yun.kugou.com/202002211503/e823f302987d890fdd538ef99ae98d17/G180/M07/04/08/9A0DAF3FKAqATsbCACy595OooJM759.mp3',
        coverImgUrl: "http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg",
        // success: function() {
        //   wx.showToast({
        //     title: '播放成功',
        //   })
        //   this.data.isPlayStatus = true
        // },
        // fail: function() {
        //   wx.showToast({
        //     title: '播放失败',
        //   })
        // }
      })
      this.setData({
        isPlayStatus: true
      })
      app.globalData.g_isPlayStatus = true
      console.log(app.globalData.g_isPlayStatus, '3333333')
    }
    
  },
  onCollectionTap: function () {
    var collEctinList = wx.getStorageSync('collectionStatus')
    console.log(collEctinList, '[]')
    var collEctin = collEctinList[this.data.postId - 1] //当前收藏状态
    console.log(collEctin, '单个')
    collEctin = !collEctin
    console.log(collEctin, '改之后的值')
    this.setData({
      collect: collEctin //改变当前收藏状态
    })
    if (collEctin) {
      wx.showToast({
        title: '收藏成功',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '取消收藏',
        duration: 2000
      })
    }
    collEctinList[this.data.postId - 1] = collEctin
    // 存储最新收藏状态
    wx.setStorageSync('collectionStatus', collEctinList)
  },
  getPostCollectionSyc() {
   
  },
  onShareTap() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到微信好友'],
      success (res) {
        wx.showToast({
          title: '播放成功',
          duration: 2000
        })
      },
      fail (res) {
        wx.showToast({
          title: '播放失败',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})