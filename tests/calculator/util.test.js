const util = require('../../科学计算器/wxapp-calculator-master/utils/util.js')

describe('formatTime', () => {
  it('zero-pads every date component', () => {
    expect(util.formatTime(new Date(2017, 0, 2, 3, 4, 5))).toBe('2017/01/02 03:04:05')
  })

  it('leaves two-digit components untouched', () => {
    expect(util.formatTime(new Date(2017, 10, 21, 13, 45, 59))).toBe('2017/11/21 13:45:59')
  })
})

describe('floatAdd', () => {
  it('avoids binary floating point drift', () => {
    expect(util.floatAdd(0.1, 0.2)).toBe(0.3)
    expect(util.floatAdd(1.005, 0.01)).toBe(1.015)
  })

  it('scales by the longest fraction of the two operands', () => {
    expect(util.floatAdd(2.5, 1)).toBe(3.5)
    expect(util.floatAdd(1, 2)).toBe(3)
  })

  it('handles negative operands', () => {
    expect(util.floatAdd(-0.1, 0.3)).toBe(0.2)
  })
})

describe('floatSub', () => {
  it('subtracts without drift and returns a fixed-precision string', () => {
    expect(util.floatSub(0.3, 0.1)).toBe('0.2')
    expect(util.floatSub(1.5, 0.5)).toBe('1.0')
  })

  it('formats integer operands without decimals', () => {
    expect(util.floatSub(5, 3)).toBe('2')
  })

  it('can return a negative result', () => {
    expect(util.floatSub(0.1, 0.3)).toBe('-0.2')
  })
})

describe('floatMul', () => {
  it('multiplies without drift', () => {
    expect(util.floatMul(0.1, 0.2)).toBe(0.02)
    expect(util.floatMul(19.9, 100)).toBe(1990)
  })

  it('handles integers and zero', () => {
    expect(util.floatMul(3, 4)).toBe(12)
    expect(util.floatMul(0.7, 0)).toBe(0)
  })
})

describe('floatDiv', () => {
  it('divides without drift', () => {
    expect(util.floatDiv(0.3, 0.1)).toBe(3)
    expect(util.floatDiv(1.21, 1.1)).toBe(1.1)
  })

  it('handles operands with different fraction lengths', () => {
    expect(util.floatDiv(2.5, 5)).toBe(0.5)
    expect(util.floatDiv(10, 0.5)).toBe(20)
  })

  it('returns Infinity when dividing by zero', () => {
    expect(util.floatDiv(1, 0)).toBe(Infinity)
  })
})
