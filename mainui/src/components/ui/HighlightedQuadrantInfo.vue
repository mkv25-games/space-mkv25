<template>
  <div>
    <div v-if="highlightedQuadrant">
      <h3>Quadrant {{ highlightedQuadrant.key }}</h3>
      <property :style="`background: ${massColour(highlightedQuadrant, 0.4)};`" label="Mass">
        {{ highlightedQuadrant.mass.toFixed(3) }}
      </property>
      <property :style="`background: ${densityColour(highlightedQuadrant, 0.4)};`" label="Density">
        {{ highlightedQuadrant.density.toFixed(3) }}
      </property>
      <property :style="`background: ${compositionColour(highlightedQuadrant, 0.4)};`" label="Composition">
        {{ highlightedQuadrant.composition.toFixed(3) }}
      </property>
    </div>
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
