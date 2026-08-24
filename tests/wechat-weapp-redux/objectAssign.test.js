const { assign } = require('../../redux绑定/wechat-weapp-redux-master/src/utils/Object.js')

describe('assign', () => {
  it('copies own properties of the sources onto the target', () => {
    const target = { a: 1 }

    const result = assign(target, { b: 2 }, { c: 3 })

    expect(result).toBe(target)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('lets later sources win', () => {
    expect(assign({}, { a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })

  it('ignores null and undefined sources', () => {
    expect(assign({ a: 1 }, null, undefined, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('ignores inherited properties', () => {
    const source = Object.create({ inherited: true })
    source.own = 1

    expect(assign({}, source)).toEqual({ own: 1 })
  })

  it('throws when the target is null or undefined', () => {
    expect(() => assign(null)).toThrow(TypeError)
    expect(() => assign(undefined)).toThrow(TypeError)
  })

  it('boxes a primitive target', () => {
    expect(typeof assign('str')).toBe('object')
  })
})
