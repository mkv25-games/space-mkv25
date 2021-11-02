const { expect } = require('chai')
const flatten = require('../../src/utils/flattenObject.js')

describe('Flatten Object', () => {
  it('flattens multi-depth objects into single level objects', () => {
    const input = {
      a: 1,
      b: {
        c: '2',
        d: [{
          e: '3',
          f: 4
        }]
      },
      g: {},
      h: []
    }
    const expected = {
      a: 1,
      'b.c': '2',
      'b.d.0.e': '3',
      'b.d.0.f': 4
    }
    const actual = flatten(input)
    expect(actual).to.deep.equal(expected)
  })
})
