<template>
  <div v-if="highlightedQuadrant" style="display: inline-block; text-align: left;">
    <h3 :style="`border-bottom: 5px solid ${quadrantColour(highlightedQuadrant)};`">Highlighted Quadrant</h3>
    <property label="Location">
      {{ highlightedQuadrant.key }}
    </property>
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
</template>

<script>
import quadrantColourMethods from '@/utils/quadrantColourMethods'
import Property from '@/components/ui/Property.vue'

export default {
  components: {
    Property
  },
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
