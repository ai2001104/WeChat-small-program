var DEFAULT_COVER_IMG_URL = 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg'
var STREAM_URL_PREFIX = 'http://stream.qqmusic.tc.qq.com/'

function streamUrl(song) {
  return song.dataUrl || STREAM_URL_PREFIX + song.id + '.mp3'
}

function play(song, cb) {
  wx.playBackgroundAudio({
    dataUrl: streamUrl(song),
    title: song.name,
    singer: song.singer,
    coverImgUrl: song.coverImgUrl || DEFAULT_COVER_IMG_URL,
    complete: function (res) {
      typeof cb == 'function' && cb(res)
    }
  })
}

function pause(cb) {
  wx.pauseBackgroundAudio({
    success: function (res) {
      typeof cb == 'function' && cb(res)
    }
  })
}

module.exports = {
  DEFAULT_COVER_IMG_URL: DEFAULT_COVER_IMG_URL,
  streamUrl: streamUrl,
  play: play,
  pause: pause
}
