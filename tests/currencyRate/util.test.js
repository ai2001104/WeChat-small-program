const util = require('../../货币汇率/currencyRate-master/utils/util.js')

describe('formatTime', () => {
  it('formats a date down to minutes', () => {
    expect(util.formatTime(new Date(2017, 0, 2, 3, 4, 5))).toBe('2017-01-02 03:04')
  })
})

describe('json2Form', () => {
  it('serializes a flat object as a query string', () => {
    expect(util.json2Form({ from: 'CNY', to: 'USD' })).toBe('from=CNY&to=USD')
  })

  it('encodes keys and values', () => {
    expect(util.json2Form({ 'a b': 'c&d' })).toBe('a%20b=c%26d')
  })

  it('returns an empty string for an empty object', () => {
    expect(util.json2Form({})).toBe('')
  })
})

describe('removeByValue', () => {
  it('removes the first entry with a matching name', () => {
    const arr = [{ name: 'CNY' }, { name: 'USD' }, { name: 'USD' }]

    util.removeByValue(arr, 'USD')

    expect(arr).toEqual([{ name: 'CNY' }, { name: 'USD' }])
  })

  it('leaves the array untouched when there is no match', () => {
    const arr = [{ name: 'CNY' }]

    util.removeByValue(arr, 'JPY')

    expect(arr).toEqual([{ name: 'CNY' }])
  })

  it('handles an empty array', () => {
    const arr = []

    expect(() => util.removeByValue(arr, 'CNY')).not.toThrow()
    expect(arr).toHaveLength(0)
  })
})
