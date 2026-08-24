/**
 * /me/index
 * 个人首页
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    pageInfo: {
      'title': '我'
    }
  },
  onLoad: function () {
    var that = this

    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        var token = res.data.token
        var uid = res.data.uid
        that.fetchData(token, uid)
      },
      fail: function(e) {
        console.error('getStorage loginInfo failed: ', e)
      }
    })
  },
  
  fetchData: function(token, uid) {
    // 发起一个网络请求
    wx.request({
      url:app.api.baseUrl + 'me/index',
      data:{
        uid: uid
      },
      header:{
        'Content-Type': 'application/json',
        'appId': app.api.appId,
        'appSecret': app.api.appSecret,
        'token': token
      },
      success:function(res) {
        if (res.statusCode != 200) {
          console.error('fetch me/index failed: ', res.statusCode, res.data)
          wx.showToast({ title: '加载失败，请重试', icon: 'none' })
          return
        }
        console.log(res.data)
      },
      fail:function(e) {
        console.error('fetch me/index request failed: ', e)
        wx.showToast({ title: '网络异常，请重试', icon: 'none' })
      },
      complete:function() {
        console.log('request complete')
      }
    })
  }
})