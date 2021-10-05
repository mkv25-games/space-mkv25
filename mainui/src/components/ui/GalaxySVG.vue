<template>
  <svg :width="galaxyWidth" :height="galaxyHeight" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="smallGrid" :width="tile.divider" :height="tile.divider" patternUnits="userSpaceOnUse">
        <path :d="`M ${tile.divider} 0 L 0 0 0 ${tile.divider}`" fill="none" stroke="gray" stroke-width="0.5"/>
      </pattern>
      <pattern id="grid" :width="tile.size" :height="tile.size" patternUnits="userSpaceOnUse">
        <rect :width="tile.size" :height="tile.size" fill="url(#smallGrid)"/>
        <path :d="`M ${tile.size} 0 L 0 0 0 ${tile.size}`" fill="none" stroke="gray" stroke-width="1"/>
      </pattern>
    </defs>
    <g>
      <rect v-for="q in galaxy.quadrants"
        :width="tile.size" :height="tile.size"
        :fill="quadrantColour(q)"
        :key="q.key"
        :x="q.x * tile.size" :y="q.y * tile.size" v-on:mouseover="$emit('quadrantHover', q)" />
    </g>
    <rect width="100%" height="100%" fill="url(#grid)" style="pointer-events: none;" />
  </svg>
</template>

<script>
import quadrantColourMethods from '@/utils/quadrantColourMethods'

export default {
  props: {
    galaxy: Object,
    tileSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    },
    galaxyWidth() {
      return (this.galaxy.size.w * this.tile.size) + 1
    },
    galaxyHeight() {
      return (this.galaxy.size.h * this.tile.size) + 1
    },
    tile() {
      return { size: this.tileSize, divider: this.tileSize / 5 }
    }
  },
  methods: Object.assign({}, quadrantColourMethods)
}
</script>
