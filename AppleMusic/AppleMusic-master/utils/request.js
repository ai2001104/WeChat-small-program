var DEFAULT_HEADER = {
  'Content-Type': 'text/html;charset=utf-8'
}

function request(options) {
  wx.request({
    url: options.url,
    data: options.data || {},
    header: options.header || DEFAULT_HEADER,
    success: options.success || function () {},
    fail: options.fail || function () {}
  })
}

module.exports = {
  request: request
}
