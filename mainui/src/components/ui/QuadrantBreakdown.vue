<template>
  <div class="quadrant-breakdown">
    <h2>Quadrant Breakdown</h2>
    <div v-for="q in sortedQuadrants" :key="q.key" class="breakdown-row">
      <div class="box" :style="`background: ${quadrantColour(q)};`"></div>
      <property label="Location">{{ q.key }}</property>
      <property label="Mass">{{ q.mass.toFixed(2) }}</property>
      <property label="Density">{{ q.density.toFixed(2) }}</property>
      <property label="Composition">{{ q.composition.toFixed(2) }}</property>
    </div>
  </div>
</template>

<script>
import quadrantColourMethods from '@/utils/quadrantColourMethods'

export default {
  props: {
    galaxy: Object
  },
  computed: {
    sortedQuadrants() {
      const sort = this.galaxy.quadrants.sort((a, b) => {
        const ad = a.mass
        const bd = b.mass
        return bd - ad
      })
      return sort.slice(0, 5)
    }
  },
  methods: Object.assign({}, quadrantColourMethods),
}
</script>

<style scoped>
.quadrant-breakdown {
  margin: 1em;
}
.breakdown-row {
  display: flex;
}
.box {
  display: inline-block;
  width: 2em;
  height: 2em;
  margin: 0 0.5em 0 0;
}
</style>
