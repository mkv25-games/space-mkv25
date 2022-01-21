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
    <h4>To:</h4>
    <pre>{{ ratiosTo }}</pre>
    <h4>From:</h4>
    <pre>{{ ratiosFrom }}</pre>
  </omniscience>
</template>

<script>

function parseNumberString(numberString) {
  return Number.parseFloat(numberString)
}

function parseRatioToNumber(ratioString) {
  const [left,right] = ratioString.split(':').map(parseNumberString)
  return left / right
}

function findRatio(targetUnit, ratiosFrom, ratiosTo) {
  let target = ratiosTo[targetUnit]
  if (target) {
    target.ratioAsNumber = parseRatioToNumber(target.ratio)
  }
  return target
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function parseQuantityUnit(input, unitIndex) {
  const [quantity, suffix] = input.split(' ')
  const unit = clone(unitIndex[suffix] || { suffix })
  return {
    quantity,
    unit
  }
}

function calculateConversion(inputRatio, targetRatio) {

}

export default {
  data() {
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
    ratios() {
      return this.gamedata.Ratio || []
    },
    ratiosFrom() {
      return this.$store.getGamedataIndex('Ratio', 'from')
    },
    ratiosTo() {
      return this.$store.getGamedataIndex('Ratio', 'to')
    },
    units() {
      return this.gamedata.Unit || []
    },
    unitIndex() {
      return this.$store.getGamedataIndex('Unit', 'suffix')
    },
    result() {
      const { quantity, targetUnit, ratiosFrom, ratiosTo, unitIndex } = this
      const quantityUnit = parseQuantityUnit(quantity, unitIndex)
      const targetRatio = findRatio(targetUnit, ratiosFrom, ratiosTo)
      if (!quantityUnit) {
        return 'No quantity unit found'
      }
      if (!targetRatio) {
        return 'No target ratio found'
      }
      this.debug = [quantityUnit, targetRatio].map(JSON.stringify).join(' needs converting to ')
      return [targetRatio.ratioAsNumber * quantityUnit.quantity, targetRatio.to].join(' ')
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
