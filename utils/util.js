// 公共方法
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function startArry(stars) {
  // 根据分数决定有几个1和几个0 1为星星 0为空星星
  var num = stars.toString().substring(0, 1);
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (i < num) {
      arr.push(1)
    } else {
      arr.push(0);
    }
  }
  return arr
}

function http(url, method, callBack) {
  wx.request({
    url: url,
    data: {},
    method: method,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
module.exports = {
  formatTime: formatTime,
  http: http,
  startArry: startArry
}