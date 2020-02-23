// pages/movies/more-movie/more-movie.js
var utils = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sorttitle = options.sorttitle
    this.setData({
      sorttitle: sorttitle
    })
    var url = app.globalData.doubanBase
    switch (sorttitle) {
      case "正在热映":
        url += "/v2/movie/in_theaters"
        break
      case "即将上映":
        url += "/v2/movie/coming_soon"
        break
      case "top250":
        url += "/v2/movie/top250"
        break
    }
    utils.http(url, "GET", this.processDoubanData)
  },
  callBack: function(data) {
   console.log(data, '222')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.sorttitle
    })
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
// 请求结果处理
processDoubanData: function (movieList) {
  console.log(movieList)
  var movies = []
  var dataList = {}
  for(var idx in movieList.subjects) {
    var subject = movieList.subjects[idx]
    var title1 = subject.title
    if(title1.length > 5) {
      title1 = title1.substring(0, 5)  + '...'
    }
    var result = {
      title: title1,
      images: subject.images.large,
      movieId: subject.id,
      stars: utils.startArry(subject.rating.stars),
      average: subject.rating.average
    }
    movies.push(result) //数据
  }
  // this.setData(dataList) //相当于平铺这个对象
  this.setData({
    movies: movies
  })
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