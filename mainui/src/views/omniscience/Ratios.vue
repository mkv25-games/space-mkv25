<template>
  <omniscience class="ratio-converter">
    <h2>Ratio Converter</h2>
    <div class="converter">
      <property label="Quantity"><input type="text" placeholder="Conversion amount?" v-model="quantity" /></property>
      <property label="Target unit"><input type="text" placeholder="Conversion unit?" v-model="targetUnit" /></property>
      <property label="Result">{{ result }}</property>
      <p>{{ debug }}</p>
    </div>
    <div class="dataset">
      <h3>Ratios</h3>
      <tabulation :items="ratios" />
    </div>
    <div class="dataset">
      <h3>Units</h3>
      <tabulation :items="units" />
    </div>
    <div class="dataset">
      <h3>Ratio Map</h3>
      <tabulation :items="Object.entries(ratioMap)" />
    </div>
  </omniscience>
</template>

<script>

function parseNumberString (numberString) {
  numberString = numberString.replace(/[,\s]+/g, '')
  const [quantityString, exponentString] = numberString.split('^')
  const quantity = Number.parseFloat(quantityString)
  const exponent = Number.parseInt(exponentString) || 1
  return  Math.pow(quantity, exponent)
}

function parseRatioToNumber (ratioString) {
  const [left, right] = ratioString.split(':').map(parseNumberString)
  return right / left
}

function findRatio (startUnit, targetUnit, ratioMap) {
  const targetRatio = [startUnit, targetUnit].join(':')
  const target = ratioMap[targetRatio]
  if (target && !target.ratioAsNumber) {
    target.ratioAsNumber = parseRatioToNumber(target.ratio)
  }
  return target
}

function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function parseQuantityUnit (input, unitIndex) {
  const [quantity, suffix] = (input + '').trim().split(' ')
  const unit = clone(unitIndex[suffix] || { suffix })
  return {
    quantity,
    unit
  }
}

export default {
  data () {
    return {
      quantity: '',
      targetUnit: '',
      debug: ''
    }
  },
  computed: {
    gamedata () {
      return this.$store.state.gamedata || {}
    },
    ratios () {
      return this.gamedata.Ratio || []
    },
    ratioMap () {
      const map = {}
      const { ratios } = this
      ratios.reduce((acc, item) => {
        const index = [item.from, item.to].join(':')
        acc[index] = item
        return acc
      }, map)
      return map
    },
    units () {
      return this.gamedata.Unit || []
    },
    unitIndex () {
      return this.$store.getGamedataIndex('Unit', 'suffix')
    },
    result () {
      const { quantity, targetUnit, ratioMap, unitIndex } = this
      const quantityUnit = parseQuantityUnit(quantity, unitIndex)
      const targetRatio = findRatio(quantityUnit.unit.suffix, targetUnit, ratioMap)
      if (!quantityUnit.quantity) {
        return 'No quantity provided'
      }
      if (!quantityUnit.unit.suffix) {
        return 'Quantity provided without unit'
      }
      if (!targetUnit) {
        return 'No target unit provided'
      }
      if (quantityUnit.unit.suffix === targetUnit) {
        return [quantityUnit.quantity, quantityUnit.unit.suffix].join(' ')
      }
      if (!targetRatio) {
        return `Conversion ratio from ${quantityUnit.unit.suffix} to ${targetUnit} not found`
      }
      const conversionQuantity = targetRatio.ratioAsNumber * quantityUnit.quantity
      return [conversionQuantity.toPrecision(5), targetRatio.to].join(' ')
    }
  }
}
</script>

<style scoped>
.converter {
  max-width: 500px;
  margin: auto;
}
</style>
