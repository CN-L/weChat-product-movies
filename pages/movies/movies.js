// pages/movie/movie.js
var until = require('../../utils/util')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  // template模板中的点击事件 在这可调用
 onMoreTap: function(event) {
   var sorttitle = event.currentTarget.dataset.sorttitle
   wx.navigateTo({
     url: '/pages/movies/more-movie/more-movie?sorttitle='+ sorttitle
   })
   console.log(event, 'onMoreTap')
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaters = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3"
    this.movieListGet(inTheaters, 'inTheaters', "正在热映")
    this.movieListGet(comingSoonUrl, 'comingSoon', "即将上映")
    this.movieListGet(top250Url, 'top250', "top250")
  },
  movieListGet: function (url, key, sortTitle) {
    var that = this
    wx.request({
      url: url, //需要勾选不校验合法域名
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {},
      success: (res) => {
        that.processDoubanData(res.data, key, sortTitle)
      }
    })
  },
  // 请求结果处理
  processDoubanData: function (movieList, keySet, sortTitle) {
    console.log(keySet)
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
        stars: until.startArry(subject.rating.stars),
        average: subject.rating.average
      }
      movies.push(result) //数据
    }
    dataList[keySet] = {
      sortTitle: sortTitle,
      movies: movies
    }
    // this.setData(dataList) //相当于平铺这个对象
    this.setData({
      [keySet]: dataList[keySet]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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