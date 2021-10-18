<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="smallGrid" :width="tile.divider" :height="tile.divider" patternUnits="userSpaceOnUse">
        <path :d="`M ${tile.divider} 0 L 0 0 0 ${tile.divider}`" fill="none" stroke="rgba(100,100,100,0.8)" stroke-width="0.5"/>
      </pattern>
      <pattern id="grid" :width="tile.size" :height="tile.size" patternUnits="userSpaceOnUse"
        :x="tile.x % tile.size" :y="tile.y % tile.size">
        <rect :width="tile.size" :height="tile.size" fill="url(#smallGrid)"/>
        <path :d="`M ${tile.size} 0 L 0 0 0 ${tile.size}`" fill="none" stroke="rgba(100,100,100,0.5)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" style="pointer-events: none;" />
  </svg>
</template>

<script>
export default {
  props: {
    viewx: {
      type: Number,
      default: 0
    },
    viewy: {
      type: Number,
      default: 0
    },
    zoom: {
      type: Number,
      default: 1.0
    },
    offsetx: {
      type: Number,
      default: 0
    },
    offsety: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 100
    },
    divider: {
      type: Number,
      default: 10
    }
  },
  computed: {
    tile() {
      const { viewx, viewy, zoom, offsetx, offsety, size, divider } = this
      return {
        x: Math.round(viewx * zoom) + offsetx,
        y: Math.round(viewy * zoom) + offsety,
        size: size * zoom,
        divider: divider * zoom
      }
    }
  }
}
</script>
