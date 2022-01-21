<template>
  <omniscience class="ratio-converter">
    <h2>Ratio Converter</h2>
    <div class="converter">
      <property label="Quantity"><input type="text" placeholder="Conversion amount?" v-model="quantity" /></property>
      <property label="Target unit"><input type="text" placeholder="Conversion unit?" v-model="targetUnit" /></property>
      <property label="Result">{{ result }}</property>
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

function findRatio(input, ratios) {
  const [value,suffix] = input.split('')
  const ratio = ratios.filter(ratio => ratio.from === suffix)[0] || {}
  return ratio.name
}

function findQuantity(input, units) {
  return 5
}

function calculateConversion(inputRatio, targetRatio) {

}

export default {
  data() {
    return {
      quantity: '',
      targetUnit: ''
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
    result() {
      const { quantity, targetUnit, ratios, units } = this
      const quantityUnit = findQuantity(quantity, units)
      const targetRatio = findRatio(targetUnit, ratios)
      if (!quantityUnit) {
        return 'No quantity unit found'
      }
      if (!targetRatio) {
        return 'No target ratio found'
      }
      return [quantityUnit, targetRatio].join(' needs converting to ')
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