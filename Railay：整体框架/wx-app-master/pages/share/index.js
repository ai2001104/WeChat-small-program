/**
 * /share/index
 * 分享首页，获取活动列表
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    hideLoading: false,
    hideToast: true,
    title: 'Share Index',
    motto: 'Hello World',
    pageInfo: {
      'title': '分享首页'
    },
    noData: true,
    items:[],
    hasNext: false,
    location: {
      latitude: 0.0,
      longitude: 0.0
    }
  },
  tappedImage: function(event) {
    var id = event.target.dataset.id
    this.saveCacheData('lastPage', {'pageUrl':'/pages/share/detail', 'id':id})
    wx.navigateTo({
      url: 'detail?id=' + id
    })
  },
  tappedLove: function() {
    this.setData({
      hideToast: false
    })
  },
  tappedComment: function() {
    this.setData({
      hideToast: false
    })
  },
  hideToast: function() {
    this.setData({
      hideToast: true
    })
  },
  onLoad: function () {
    var that = this
    // 获取经纬度
    wx.getLocation({
      type: 'gcj02', // 火星坐标gcj02,GPS坐标wgs84
      success: function(loc) {
        if (loc.errMsg == 'getLocation:ok') {
          var locData = {
            latitude: loc.latitude,
            longitude: loc.longitude
          }
          that.setData({
            location: locData
          })
          that.saveCacheData('location', locData)
        }
      },
      fail: function(e) {
        console.error('getLocation failed: ', e)
        wx.showToast({ title: '获取位置失败', icon: 'none' })
      }
    })

    // 发起一个网络请求
    wx.request({
      url:app.api.baseUrl + 'Room/GetNewRoomOnline',
      data:{
        page: 1
      },
      header:{
        'Content-Type': 'application/json',
        'appId': app.api.appId,
        'appSecret': app.api.appSecret,
      },
      success:function(res) {
        if (res.statusCode != 200) {
          console.error('GetNewRoomOnline failed: ', res.statusCode, res.data)
          wx.showToast({ title: '加载失败，请重试', icon: 'none' })
        } else {
          var resposneData = res.data;
          if (resposneData.code != 100) {
            console.error('GetNewRoomOnline returned error: ', resposneData)
            wx.showToast({ title: resposneData.msg || '加载失败，请重试', icon: 'none' })
          } else {
            var dataLength = resposneData.data.list.length;
            if (dataLength > 0) {
              console.log(resposneData.data.list)
              that.setData({
                noData: false,
                items: resposneData.data.list
              })
            }
          }
        }
      },
      fail:function(e) {
        console.error('GetNewRoomOnline request failed: ', e)
        wx.showToast({ title: '网络异常，请重试', icon: 'none' })
      },
      complete:function() {
        that.setData({
          hideLoading: true
        })
      }
    })
  },

  // 存储数据
  saveCacheData:function(key, data) {
    wx.setStorage({
      key: key,
      data: data,
      fail: function(e) {
        console.error('setStorage failed: ', key, e)
      }
    })
  },

  // 读取数据，cb(err, data)
  getCachedData: function(key, cb) {
    wx.getStorage({
      key: key,
      success: function(res) {
        typeof cb == 'function' && cb(null, res.data)
      },
      fail: function(e) {
        console.error('getStorage failed: ', key, e)
        typeof cb == 'function' && cb(e, null)
      }
    })
  }
})