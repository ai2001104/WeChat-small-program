//app.js
App({
  onLaunch: function() {
    var _this = this;
    //读取缓存
    try{
      var data = wx.getStorageSync('cache')
      if (data) {
        _this.cache = data;
        _this.processData(data);
      }
    }catch(e){
      //缓存损坏时清除，避免每次启动都读到坏数据
      console.error('read cache failed: ', e);
      wx.removeStorage({ key: 'cache' });
      _this.cache = '';
    }
  },
  //后台切换至前台时
  onShow: function(){

  },
  //getUser函数，在index中调用
  getUser: function(update_cb, bind) {
    var _this = this;
    wx.login({
      success: function(res){
        if(res.code){
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info){
            _this._user.wx = info.userInfo;
            //发送code与微信用户信息，获取学生数据
            wx.request({
              method: 'POST',
              url: _this._server + '/api/users/get_info.php',
              data: {
                code: res.code,
                key: info.encryptedData,
                iv: info.iv
              },
              success: function(res){
                if(res.data && res.data.status >= 200 && res.data.status < 400){
                  var status = false;
                  //判断缓存是否有更新
                  if(!_this.cache || _this.cache != res.data.data){
                    wx.setStorage({
                      key: "cache",
                      data: res.data.data
                    });
                    status = true;
                    _this.processData(res.data.data);
                  }
                  if(!_this._user.is_bind){
                    wx.navigateTo({
                      url: '/pages/more/login'
                    });
                  }
                  //如果缓存有更新，则执行回调函数
                  if(status){
                    typeof update_cb == "function" && update_cb();
                  }
                }else{
                  //清除缓存
                  if(_this.cache){
                    wx.removeStorage({ key: 'cache' });
                    _this.cache = '';
                  }
                  console.error('get_info returned error: ', res.data);
                  _this.showErrorModal(res.data && res.data.msg ? res.data.msg : '获取用户数据失败，请重试');
                }
              },
              fail: function(res){
                //清除缓存
                if(_this.cache){
                  wx.removeStorage({ key: 'cache' });
                  _this.cache = '';
                }
                console.error('get_info request failed: ', res && res.errMsg);
                _this.showErrorModal('网络异常，请稍后重试');
              }
            });
          }, function(err){
            _this.showErrorModal('获取微信用户信息失败，请重试');
          });
        }else{
          console.error('wx.login returned no code: ', res);
          _this.showErrorModal('微信登录失败，请重试');
        }
      },
      fail: function(err){
        console.error('wx.login failed: ', err);
        _this.showErrorModal('微信登录失败，请重试');
      }
    });
  },
  processData: function(key){
    var _this = this;
    var data = JSON.parse(_this.util.base64.decode(key));
    _this._user.is_bind = data.is_bind;
    _this._user.openid = data.user.openid;
    _this._user.teacher = data.user.type == '教职工';
    _this._user.we = data.user;
    _this._time = data.time;
    _this._t = data['\x74\x6f\x6b\x65\x6e'];
    return data;
  },
  //errCb在获取微信用户信息失败时被调用，参数为错误信息
  getUserInfo: function(cb, errCb){
    var _this = this;
    //获取微信用户信息
    wx.getUserInfo({
      success: function(res){
        typeof cb == "function" && cb(res);
      },
      fail: function(err){
        console.error('getUserInfo failed: ', err);
        if(typeof errCb == "function"){
          errCb(err);
        }else{
          _this.showErrorModal('获取微信用户信息失败，请重试');
        }
      }
    });
  },
  //完善信息
  appendInfo: function(data){
    var _this = this;
    wx.removeStorage({ key: 'cache' });
    _this._user.we.build = data.build || '';
    _this._user.we.room = data.room || '';
  },
  showErrorModal: function(content, title){
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration){
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  util: require('./utils/util'),
  key: function(data){ return this.util.key(data) },
  _server: 'https://we.cqu.pt',
  _user: {
    //微信数据
    wx: {},
    //学生\老师数据
    we: {}
  },
  _time: {} //当前学期周数
});