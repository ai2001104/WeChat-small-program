//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    try {
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    } catch (e) {
      console.error('write logs to storage failed: ', e)
    }
  },
  //errCb在登录或获取用户信息失败时被调用，参数为错误信息
  getUserInfo:function(cb, errCb){
    var that = this
    var onError = function (err) {
      console.error('getUserInfo failed: ', err)
      if (typeof errCb == "function") {
        errCb(err)
      } else {
        wx.showToast({ title: '获取用户信息失败', icon: 'none' })
      }
    }
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: onError
          })
        },
        fail: onError
      })
    }
  },
  globalData:{
    userInfo:null
  }
})