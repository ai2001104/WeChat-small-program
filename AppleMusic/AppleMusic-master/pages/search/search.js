var audio = require('../../utils/audio.js')
var http = require('../../utils/request.js')

var pageObject = {
        data:{

        },
        search:function(e){
            var that = this
            console.log('搜索')
            http.request({
                url: 'http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
                data: {
                    is_xml:0,
                    format:'jsonp',
                    key:e.detail.value,
                    g_tk:5381,
                    jsonpCallback:'SmartboxKeysCallbackmod_top_search463',
                    loginUin:0,
                    hostUin:0,
                    format:'jsonp',
                    inCharset:'utf8',
                    outCharset:'utf-8',
                    notice:0,
                    platform:'yqq',
                    needNewCode:0,
                },
                success: function(res) {
                    // var pattern =new RegExp("\\((.*?)\\)","igm");
                    that.setData({
                        searchRes:JSON.parse(res.data.substring(38,res.data.length-1)).data
                    })
                }
            })
        },
        play: function (event) {
            var num=event.currentTarget.dataset.num
            var res=this.data.searchRes.song.itemlist[num]
            var appInstance = getApp()
            appInstance.globalData.playing = res
            // that.setData({
            //     playBar:res,
            //     playingSongsNum:event.currentTarget.dataset.num
            // })
            console.log(audio.streamUrl(res))
            audio.play(res)
        }
}

Page(pageObject)