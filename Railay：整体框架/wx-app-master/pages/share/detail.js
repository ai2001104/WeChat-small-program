/**
 * /share/detail
 * 分享详情页
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    hideLoading: false,
    detail: ''
  },
  onLoad: function (options) {
    console.log(options.id)
    var that = this

    wx.getStorage({
      key: 'lastPage',
      success: function(res) {
        var data = res.data
        var pageUrl = data.pageUrl
        var id = data.id
        if (pageUrl == '/pages/share/detail') {
          that.fetchData(id)
        }
      },
      fail: function(e) {
        console.error('getStorage lastPage failed: ', e)
      }
    })
  },
  fetchData: function(id) {
    var that = this
    // 发起一个网络请求
    wx.request({
      url:app.api.baseUrl + 'share/' + id,
      header:{
        'Content-Type': 'application/json',
        'appId': app.api.appId,
        'appSecret': app.api.appSecret,
      },
      success:function(res) {
        if (res.statusCode != 200) {
          console.error('fetch share detail failed: ', res.statusCode, res.data)
          wx.showToast({ title: '加载失败，请重试', icon: 'none' })
        } else {
          var resposneData = res.data;
          if (resposneData.errorCode != 0) {
            console.error('fetch share detail returned error: ', resposneData)
            wx.showToast({ title: resposneData.errorMessage || '加载失败，请重试', icon: 'none' })
          } else {
            that.setData({
              detail: resposneData.results
            })
          }
        }
      },
      fail:function(e) {
        console.error('fetch share detail request failed: ', e)
        wx.showToast({ title: '网络异常，请重试', icon: 'none' })
      },
      complete:function() {
        that.setData({
          hideLoading: true
        })
      }
    })
  }
})