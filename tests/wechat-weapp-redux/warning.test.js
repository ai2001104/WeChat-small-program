const warning = require('../../redux绑定/wechat-weapp-redux-master/src/warning.js')

describe('warning', () => {
  it('logs the message to console.error without throwing', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => warning('boom')).not.toThrow()
    expect(spy).toHaveBeenCalledWith('boom')

    spy.mockRestore()
  })
})
