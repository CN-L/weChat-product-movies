// pages/movies/more-movie/more-movie.js
var utils = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    movies: []
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
    this.setData({
      requestUrl: url
    })
    utils.http(url, "GET").then(res => {
      this.processDoubanData(res)
    })
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
    var movies = []
    // var dataList = {}
    for (var idx in movieList.subjects) {
      var subject = movieList.subjects[idx]
      var title1 = subject.title
      if (title1.length > 5) {
        title1 = title1.substring(0, 5) + '...'
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
    var totalMovies = this.data.movies
    let totalCount = this.data.totalCount
    totalMovies = totalMovies.concat(movies)
    this.setData({
      movies: totalMovies,
      totalCount: totalCount + 20
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function (event) {
    console.log('触发下拉')
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.http(nextUrl, "GET").then(res => {
      this.processDoubanData(res)
    })
    wx.showNavigationBarLoading() //加载lading 在导航栏
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onPullDownRefresh: function () {
    console.log('触发上拉')
    this.setData({
      totalCount: 0,
      movies: []
    })
    var refresUrl = this.data.requestUrl + "?star=0cunt=20"
    
    utils.http(refresUrl, "GET").then((res)=>{
      console.log(res, 'fan')
      this.processDoubanData(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})