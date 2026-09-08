function login(cb) {
  wx.login({
    success: function () {
      wx.getUserInfo({
        success: function (res) {
          typeof cb == 'function' && cb(res.userInfo)
        }
      })
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

module.exports = {
  login: login
}
