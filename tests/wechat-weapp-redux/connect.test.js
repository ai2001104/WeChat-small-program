const connect = require('../../redux绑定/wechat-weapp-redux-master/src/connect.js')

function createStore(state) {
  return {
    getState: jest.fn(() => state),
    dispatch: jest.fn(action => action),
    subscribe: jest.fn(() => jest.fn()),
  }
}

function createPage(pageConfig, overrides) {
  return Object.assign({ setData: jest.fn() }, pageConfig, overrides)
}

describe('connect', () => {
  let store
  let app

  beforeEach(() => {
    store = createStore({ count: 1 })
    app = { store }
    global.getApp = jest.fn(() => app)
  })

  afterEach(() => {
    delete global.getApp
  })

  it('injects dispatch by default', () => {
    const enhanced = connect()({ data: {} })

    expect(typeof enhanced.dispatch).toBe('function')
    expect(enhanced.dispatch({ type: 'PING' })).toEqual({ type: 'PING' })
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'PING' })
  })

  it('binds an action creator map to the store dispatch', () => {
    const enhanced = connect(null, { add: amount => ({ type: 'ADD', amount }) })({})

    enhanced.add(2)

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'ADD', amount: 2 })
  })

  it('uses mapDispatchToProps as-is when it is a function', () => {
    const mapDispatchToProps = jest.fn(dispatch => ({ custom: dispatch }))

    const enhanced = connect(null, mapDispatchToProps)({})

    expect(mapDispatchToProps).toHaveBeenCalledWith(store.dispatch)
    expect(enhanced.custom).toBe(store.dispatch)
  })

  it('keeps the rest of the page config', () => {
    const onShow = jest.fn()

    const enhanced = connect()({ onShow, data: { local: true } })

    expect(enhanced.onShow).toBe(onShow)
    expect(enhanced.data).toEqual({ local: true })
  })

  it('does not subscribe when no mapStateToProps is given', () => {
    const enhanced = connect()({})
    const page = createPage(enhanced)

    page.onLoad({})

    expect(page.store).toBe(store)
    expect(store.subscribe).not.toHaveBeenCalled()
    expect(page.unsubscribe).toBeUndefined()
  })

  it('subscribes on load and calls the wrapped onLoad with the options', () => {
    const _onLoad = jest.fn()
    const enhanced = connect(state => ({ count: state.count }))({ onLoad: _onLoad })
    const page = createPage(enhanced)
    const options = { id: '7' }

    page.onLoad(options)

    expect(store.subscribe).toHaveBeenCalledTimes(1)
    expect(typeof page.unsubscribe).toBe('function')
    expect(_onLoad).toHaveBeenCalledWith(options)
    expect(_onLoad.mock.instances[0]).toBe(page)
  })

  it('pushes the mapped state to setData when it changed', () => {
    const mapStateToProps = jest.fn(state => ({ count: state.count }))
    const enhanced = connect(mapStateToProps)({})
    const page = createPage(enhanced, { data: { count: 0 } })

    page.onLoad({ id: '7' })
    const listener = store.subscribe.mock.calls[0][0]
    listener()

    expect(mapStateToProps).toHaveBeenCalledWith({ count: 1 }, { id: '7' })
    expect(page.setData).toHaveBeenCalledWith({ count: 1 })
  })

  it('does not call setData when the mapped state is unchanged', () => {
    const enhanced = connect(state => ({ count: state.count }))({})
    const page = createPage(enhanced, { data: { count: 1 } })

    page.onLoad({})
    store.subscribe.mock.calls[0][0]()

    expect(page.setData).not.toHaveBeenCalled()
  })

  it('ignores store updates once unsubscribed', () => {
    const enhanced = connect(state => ({ count: state.count }))({})
    const page = createPage(enhanced, { data: { count: 0 } })

    page.onLoad({})
    const listener = store.subscribe.mock.calls[0][0]
    page.setData.mockClear()
    delete page.unsubscribe
    listener()

    expect(page.setData).not.toHaveBeenCalled()
  })

  it('unsubscribes on unload and calls the wrapped onUnload', () => {
    const unsubscribe = jest.fn()
    store.subscribe.mockReturnValue(unsubscribe)
    const _onUnload = jest.fn()
    const enhanced = connect(state => state)({ onUnload: _onUnload })
    const page = createPage(enhanced)

    page.onLoad({})
    page.onUnload()

    expect(_onUnload).toHaveBeenCalledTimes(1)
    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('warns on load when the app has no store', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    const enhanced = connect()({})
    const page = createPage(enhanced)
    app.store = undefined

    page.onLoad({})

    expect(consoleError).toHaveBeenCalledWith('Store对象不存在!')
    consoleError.mockRestore()
  })

  it('tolerates unload without a subscription', () => {
    const enhanced = connect()({})
    const page = createPage(enhanced)

    page.onLoad({})

    expect(() => page.onUnload()).not.toThrow()
  })
})
