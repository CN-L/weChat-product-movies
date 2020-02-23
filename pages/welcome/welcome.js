var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log('nice')
      console.log(app.globalData.userInfo)
      wx.switchTab({
        url: '/pages/home/home',
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.navigateTo({
          url: '/pages/home/home',
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  tapName: function(e) {
    wx.switchTab({
      url: '/pages/home/home',
      success: function() {}
    })
    // wx.redirectTo离开后不返回，触发了卸载页面。而navigateTo触发了页面隐藏
  },
  getUserInfo: function(e) {
    console.log('rrr')
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if(app.globalData.userInfo) {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
    
  }
})