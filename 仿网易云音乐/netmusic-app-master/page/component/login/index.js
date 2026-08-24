Page({
    data: {
        phone: "",
        pwd: ""
    },
    onLoad: function () {

    },
    textinput: function (event) {
        var type = event.currentTarget.dataset.type;
        if (type == 1) {
            this.setData({
                phone: event.detail.value
            })
        } else {
            this.setData({
                pwd: event.detail.value
            })
        }
    },
    login: function () {
        var that = this;
        wx.request({
            url: 'https://n.sqaiyan.com/login?phone=' + that.data.phone + '&pwd=' + that.data.pwd,
            data: {
                phone: that.data.phone,
                pwd: that.data.pwd
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    console.error('login failed: ', res.statusCode, res.data);
                    wx.showToast({ title: '登录失败，请检查账号密码', icon: 'none' });
                    return;
                }
                try {
                    wx.setStorageSync('logined', res.data);
                } catch (e) {
                    console.error('setStorageSync logined failed: ', e);
                    wx.showToast({ title: '登录信息保存失败', icon: 'none' });
                    return;
                }
                wx.redirectTo({
                    url: '../index',
                    fail: function (err) {
                        console.error('redirectTo index failed: ', err);
                        wx.showToast({ title: '页面跳转失败', icon: 'none' });
                    }
                })
            },
            fail: function (err) {
                console.error('login request failed: ', err);
                wx.showToast({ title: '网络异常，登录失败', icon: 'none' });
            }
        })
    }
})