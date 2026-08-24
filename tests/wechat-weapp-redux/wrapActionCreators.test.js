const wrapActionCreators = require('../../redux绑定/wechat-weapp-redux-master/src/wrapActionCreators.js')

describe('wrapActionCreators', () => {
  it('binds a map of action creators to dispatch', () => {
    const dispatch = jest.fn(action => action)
    const add = jest.fn(amount => ({ type: 'ADD', amount }))

    const bound = wrapActionCreators({ add })(dispatch)

    expect(bound.add(3)).toEqual({ type: 'ADD', amount: 3 })
    expect(add).toHaveBeenCalledWith(3)
    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD', amount: 3 })
  })

  it('forwards every argument to the action creator', () => {
    const dispatch = jest.fn()
    const bound = wrapActionCreators({ set: (a, b) => ({ type: 'SET', a, b }) })(dispatch)

    bound.set(1, 2)

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET', a: 1, b: 2 })
  })

  it('binds a single action creator passed as a function', () => {
    const dispatch = jest.fn()
    const bound = wrapActionCreators(() => ({ type: 'PING' }))(dispatch)

    bound()

    expect(dispatch).toHaveBeenCalledWith({ type: 'PING' })
  })

  it('skips non-function properties', () => {
    const bound = wrapActionCreators({ add: () => ({ type: 'ADD' }), nope: 42 })(jest.fn())

    expect(Object.keys(bound)).toEqual(['add'])
  })

  it('throws for non-object action creators', () => {
    expect(() => wrapActionCreators(null)(jest.fn())).toThrow(/expected an object or a function/)
    expect(() => wrapActionCreators('nope')(jest.fn())).toThrow(/instead received string/)
  })
})
