const { expect } = require('chai')

describe('Example', () => {
  it('tests for something', () => {
    const expected = '2021'
    const date = new Date()
    const actual = date.toISOString().slice(0, 4)
    expect(actual).to.deep.equal(expected)
  })
})
