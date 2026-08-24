const { formatNumber } = require('../../高仿苹果计算器/weixin_calculate-master/utils/StringUtil.js')

describe('formatNumber', () => {
  it('groups digits in thousands', () => {
    expect(formatNumber('1234')).toBe('1,234')
    expect(formatNumber('1234567')).toBe('1,234,567')
  })

  it('leaves short numbers alone', () => {
    expect(formatNumber('123')).toBe('123')
  })

  it('is idempotent for already grouped input', () => {
    expect(formatNumber('1,234,567')).toBe('1,234,567')
  })

  it('keeps the sign of negative numbers', () => {
    expect(formatNumber('-1234')).toBe('-1,234')
  })

  it('drops the fractional part', () => {
    expect(formatNumber('1234.99')).toBe('1,234')
  })

  it('falls back to 0 for empty or non-numeric input', () => {
    expect(formatNumber('')).toBe('0')
    expect(formatNumber(undefined)).toBe('0')
    expect(formatNumber('abc')).toBe('0')
  })
})
