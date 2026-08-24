const Provider = require('../../redux绑定/wechat-weapp-redux-master/src/Provider.js')

function createStore() {
  return { subscribe: jest.fn(), dispatch: jest.fn(), getState: jest.fn() }
}

describe('Provider', () => {
  let consoleError

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
  })

  it('adds the store to the app config without mutating it', () => {
    const store = createStore()
    const appConfig = { onLaunch: jest.fn() }

    const enhanced = Provider(store)(appConfig)

    expect(enhanced.store).toBe(store)
    expect(enhanced.onLaunch).toBe(appConfig.onLaunch)
    expect(appConfig.store).toBeUndefined()
    expect(consoleError).not.toHaveBeenCalled()
  })

  it('warns about every missing store method', () => {
    Provider({ dispatch: jest.fn() })

    expect(consoleError).toHaveBeenCalledTimes(1)
    expect(consoleError.mock.calls[0][0]).toContain('subscribe, getState')
  })

  it('still returns a usable enhancer for an invalid store', () => {
    const store = {}

    expect(Provider(store)({ a: 1 })).toEqual({ a: 1, store })
  })
})
