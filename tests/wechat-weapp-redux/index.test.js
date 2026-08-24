const weappRedux = require('../../redux绑定/wechat-weapp-redux-master/src/index.js')
const Provider = require('../../redux绑定/wechat-weapp-redux-master/src/Provider.js')
const connect = require('../../redux绑定/wechat-weapp-redux-master/src/connect.js')

describe('index', () => {
  it('exposes Provider and connect', () => {
    expect(weappRedux).toEqual({ Provider, connect })
  })
})
