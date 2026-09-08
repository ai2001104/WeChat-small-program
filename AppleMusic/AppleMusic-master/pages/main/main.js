var user = require('../../utils/user.js')

Page({
  data: {
    motto: 'Hello WeApp',
    userInfo: {}
  },
  onButtonTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//登录
    user.login(function (userInfo) {
      that.setData({userInfo: userInfo})
      that.update()
    })
  }
})
