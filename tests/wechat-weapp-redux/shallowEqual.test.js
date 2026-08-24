const shallowEqual = require('../../redux绑定/wechat-weapp-redux-master/src/shallowEqual.js')

describe('shallowEqual', () => {
  it('treats identical references as equal', () => {
    const obj = { a: 1 }
    expect(shallowEqual(obj, obj)).toBe(true)
  })

  it('compares own enumerable keys by strict equality', () => {
    expect(shallowEqual({ a: 1, b: 'x' }, { a: 1, b: 'x' })).toBe(true)
    expect(shallowEqual({ a: 1 }, { a: '1' })).toBe(false)
  })

  it('is not deep', () => {
    expect(shallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(false)
  })

  it('detects a differing number of keys', () => {
    expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(shallowEqual({}, {})).toBe(true)
  })

  it('detects keys present in one object only', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false)
  })

  it('treats an undefined value and a missing key as different', () => {
    expect(shallowEqual({ a: undefined }, {})).toBe(false)
  })
})
