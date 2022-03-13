import clone from './clone'
import { parseNumberString, parseQuantityUnit } from './numbers'

export function convert (quantity, toUnit, ratioMap, unitIndex) {
  const quantityUnit = parseQuantityUnit(quantity, unitIndex)
  const targetRatio = findRatio(quantityUnit.unit.suffix, toUnit, ratioMap)
  if (!quantityUnit.quantity) {
    return { error: 'No quantity provided' }
  }
  if (!quantityUnit.unit.suffix) {
    return { error: 'Quantity provided without unit' }
  }
  if (!toUnit) {
    return { error: 'No target unit provided' }
  }
  if (quantityUnit.unit.suffix === toUnit) {
    return {
      quantity: quantityUnit.quantity,
      targetRatio
    }
  }
  if (!targetRatio) {
    return { error: `Conversion ratio from ${quantityUnit.unit.suffix} to ${toUnit} not found` }
  }
  const conversionQuantity = targetRatio.ratioAsNumber * quantityUnit.quantity
  return {
    quantity: conversionQuantity,
    targetRatio
  }
}

export function findRatio (startUnit, targetUnit, ratioMap) {
  const targetRatio = [startUnit, targetUnit].join(':')
  const target = ratioMap[targetRatio]
  if (target && !target.ratioAsNumber) {
    target.ratioAsNumber = parseRatioToNumber(target.ratio)
  }
  return target
}

export function mapRatios (ratios) {
  const map = {}
  ratios.reduce((acc, item) => {
    const index = [item.from, item.to].join(':')
    acc[index] = item
    return acc
  }, map)
  ratios.reduce((acc, item) => {
    const index = [item.to, item.from].join(':')
    acc[index] = reverseRatio(item)
    return acc
  }, map)
  return map
}

export function parseRatioToNumber (ratioString) {
  const [left, right] = ratioString.split(':').map(parseNumberString)
  return right / left
}

export function reverseRatio (item) {
  const name = item.name.split(' to ').reverse().join(' to ')
  const ratio = item.ratio.split(':').reverse().join(':')
  const ratioAsNumber = item.ratioAsNumber ? 1 / item.ratioAsNumber : undefined
  return Object.assign(clone(item), {
    name,
    ratio,
    ratioAsNumber,
    from: item.to,
    to: item.from
  })
}

export default {
  convert,
  findRatio,
  mapRatios,
  parseRatioToNumber,
  reverseRatio
}
