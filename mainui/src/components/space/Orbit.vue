<template>
  <g class="orbit group">
    <circle class="orbit ring" :cx="cx" :cy="cy" :r="radius" :stroke="orbitColor" fill="none" />
    <g class="orbit position" :transform="`translate(${ix} ${iy})`">
      <slot>
        <circle class="orbit symbol" :r="symbolSize" :fill="symbolColor" />
        <text class="orbit label" fill="white" :x="labelFont.x" :font-size="labelFont.fontSize">{{ label }}</text>
      </slot>
    </g>
  </g>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      timerId: false
    }
  },
  props: {
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
    }
  },
  computed: {
    ix() {
      const { radius, time } = this
      return radius * Math.sin(time / 100 / radius)
    },
    iy() {
      const { radius, time } = this
      return radius * Math.cos(time / 100 / radius)
    },
    labelFont() {
      return this.radius < 20 ? {
        fontSize: '2px',
        x: 2,
      } : {
        fontSize: '5px',
        x: 5
      }
    }
  },
  methods: {
    advanceTime() {
      clearTimeout(this.timerId)
      this.timerId = setTimeout(this.advanceTime, 5)
      this.time = this.time + 1
    }
  },
  mounted() {
    this.advanceTime()
  }
}
</script>

<style scoped>
.orbit.group {

}
.orbit.ring {
  fill: none;
  stroke-width: 1;
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
