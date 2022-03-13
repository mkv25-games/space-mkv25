import clone from './clone'

export function parseNumberString (numberString) {
  numberString = numberString.replace(/[,\s]+/g, '')
  const [quantityString, exponentString] = numberString.split('^')
  const quantity = Number.parseFloat(quantityString)
  const exponent = Number.parseInt(exponentString) || 1
  return Math.pow(quantity, exponent)
}

export function parseQuantityUnit (input, unitIndex) {
  const [quantity, suffix] = (input + '').trim().split(' ')
  const unit = clone(unitIndex[suffix] || { suffix })
  return {
    quantity: parseNumberString(quantity),
    unit
  }
}