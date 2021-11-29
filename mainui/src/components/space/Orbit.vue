<template>
  <g class="orbit group">
    <circle class="orbit ring" :cx="cx + ox" :cy="cy + oy" :r="radius"
      fill="none" :stroke="orbitColor" :stroke-width="strokeWidth * 2" />
    <g class="orbit position" :transform="`translate(${ix + ox} ${iy + oy})`">
      <slot>
        <circle class="orbit symbol" :r="Math.min(symbolSize / zoom, objectRadiusInLightMinutes)" :fill="symbolColor" />
        <text class="orbit label" fill="white" :x="labelFont.x" :font-size="labelFont.fontSize / zoom">{{ label }}</text>
      </slot>
      <circle v-if="highlighted" cx="0" cy="0" :r="Math.max(2, symbolSize * 2 / zoom)"
        fill="none" :stroke="orbitColor" :stroke-width="strokeWidth" :stroke-dasharray="`${5 / zoom},${5 / zoom}`" />
    </g>
  </g>
</template>

<script>
const orbits = {}

export default {
  data() {
    return {
      time: 0,
      timerId: false
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    radius: {
      type: Number,
      default: 100
    },
    label: {
      type: String,
      default: ''
    },
    orbitColor: {
      type: String,
      default: 'orange'
    },
    symbolColor: {
      type: String,
      default: 'orange'
    },
    symbolSize: {
      type: Number,
      default: 10
    },
    cx: {
      type: Number,
      default: 0
    },
    cy: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    highlighted: {
      type: Boolean,
      default: false
    },
    zoom: {
      type: Number,
      default: 1.0
    },
    parent: {
      type: String,
      default: ''
    }
  },
  computed: {
    ix() {
      const { radius, theta } = this
      return radius * Math.sin(theta) || 0
    },
    iy() {
      const { radius, theta } = this
      return radius * Math.cos(theta) || 0
    },
    ox() {
      const { parentOrbit } = this
      const { cx, ix } = parentOrbit
      return (cx || 0) + (ix || 0)
    },
    oy() {
      const { parentOrbit } = this
      const { cy, iy } = parentOrbit
      return (cy || 0) + (iy || 0)
    },
    parentOrbit() {
      const { parent } = this
      this.highlighted ? console.log(parent, '????', orbits[parent]) : ''
      return orbits[parent] || { ix: 0, iy : 0, cx: 0, cy: 0 }
    },
    theta() {
      const { startAngle, time, radius } = this
      const timeAngle = time / 100 / radius
      return startAngle + timeAngle
    },
    labelFont() {
      return this.radius < 20 ? {
        fontSize: '2px',
        x: 2,
      } : {
        fontSize: '5px',
        x: 5
      }
    },
    strokeWidth() {
      const { zoom } = this
      return 2 / zoom
    }, 
    objectRadiusInLightMinutes() {
      return 0.0007084
    }
  },
  methods: {
    advanceTime() {
      clearTimeout(this.timerId)
      this.timerId = setTimeout(this.advanceTime, 5)
      this.time = this.time + 0.0001
    }
  },
  mounted() {
    const { id, advanceTime } = this
    advanceTime()
    orbits[id] = this
  }
}
</script>

<style scoped>
.orbit.group {

}
.orbit.ring {
  fill: none;
  opacity: 0.5;
}
.orbit.position {

}
.orbit.symbol {

}
.orbit.label {
  color: white;
  text-anchor: start;
  dominant-baseline: middle;
}
</style>
