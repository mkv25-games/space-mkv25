<template>
  <div v-if="highlightedQuadrant" style="display: inline-block; text-align: left;">
    <h3 :style="`border-bottom: 5px solid ${quadrantColour(highlightedQuadrant)};`">Highlighted Quadrant</h3>
    <p :style="`background: ${massColour(highlightedQuadrant, 0.4)};`">
      <label style="padding: 5px;">Quadrant Mass:</label>
      <b>{{ highlightedQuadrant.mass.toFixed(3) }}</b>
    </p>
    <p :style="`background: ${densityColour(highlightedQuadrant, 0.4)};`">
      <label style="padding: 5px;`">Quadrant Density:</label>
      <b>{{ highlightedQuadrant.density.toFixed(3) }}</b>
    </p>
    <p :style="`background: ${compositionColour(highlightedQuadrant, 0.4)};`">
      <label style="padding: 5px;`">Quadrant Composition:</label>
      <b>{{ highlightedQuadrant.composition.toFixed(3) }}</b>
    </p>
  </div>
</template>

<script>
import quadrantColourMethods from '@/utils/quadrantColourMethods'

export default {
  props: {
    quadrant: Object
  },
  computed: {
    highlightedQuadrant() {
      return this.quadrant
    }
  },
  methods: Object.assign({}, quadrantColourMethods)
}
</script>
