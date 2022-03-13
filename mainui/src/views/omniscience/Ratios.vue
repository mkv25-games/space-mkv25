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

import { convert, mapRatios } from '../../utils/ratios'

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
      const { ratios } = this
      return mapRatios(ratios)
    },
    units () {
      return this.gamedata.Unit || []
    },
    unitIndex () {
      return this.$store.getGamedataIndex('Unit', 'suffix')
    },
    result () {
      const { quantity, targetUnit, ratioMap, unitIndex } = this
      const result = convert(quantity, targetUnit, ratioMap, unitIndex)
      return result.error || [result.quantity.toPrecision(5), result.targetRatio.to].join(' ')
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
