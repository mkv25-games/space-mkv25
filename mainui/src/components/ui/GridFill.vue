<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern :id="smallGridId" :width="tile.divider" :height="tile.divider" patternUnits="userSpaceOnUse">
        <path :d="`M ${tile.divider} 0 L 0 0 0 ${tile.divider}`" fill="none" stroke="rgba(100,100,100,0.8)" stroke-width="0.5"/>
      </pattern>
      <pattern :id="gridId" :width="tile.size" :height="tile.size" patternUnits="userSpaceOnUse"
        :x="tile.x % tile.size" :y="tile.y % tile.size">
        <rect :width="tile.size" :height="tile.size" :fill="`url(#${smallGridId})`"/>
        <path :d="`M ${tile.size} 0 L 0 0 0 ${tile.size}`" fill="none" stroke="rgba(100,100,100,0.5)" stroke-width="1"/>
      </pattern>
      <pattern :id="largeGridId" :width="tile.size" :height="tile.size" patternUnits="userSpaceOnUse"
        :x="tile.x % tile.size" :y="tile.y % tile.size">
        <rect :width="tile.size" :height="tile.size" fill="none" />
        <path :d="`M ${tile.size} 0 L 0 0 0 ${tile.size}`" fill="none" stroke="rgba(50,50,50,0.5)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="gridBasedOnZoom" style="pointer-events: none;" />
    <text x="10" y="20" :style="`display: none;`">
      VXY: {{ viewx.toFixed(2) }}, {{ viewy.toFixed(2) }}
      Z: {{ zoom.toFixed(2) }}
      OXY: {{ offsetx.toFixed(2) }}, {{ offsety.toFixed(2) }}
      S: {{ tile.size.toFixed(2) }}
      D: {{ tile.divider.toFixed(2) }}
    </text>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      id: Math.random().toFixed(16)
    }
  },
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
        x: viewx + offsetx,
        y: viewy + offsety,
        size: size * zoom,
        divider: divider * zoom,
        multiplier: 10
      }
    },
    smallGridId() {
      const { id } = this
      return `g${id}-smallGrid` 
    },
    gridId() {
      const { id } = this
      return `g${id}-grid` 
    },
    largeGridId() {
      const { id } = this
      return `g${id}-largeGrid` 
    },
    gridBasedOnZoom() {
      const { gridId, largeGridId } = this
      const fillId = this.zoom > 0.5 ? gridId : largeGridId
      return `url(#${fillId})`
    }
  }
}
</script>
