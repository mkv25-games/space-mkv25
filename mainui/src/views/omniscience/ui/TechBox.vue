<template>
  <g :transform="`translate(${tech.x} ${tech.y})`">
    <rect
      :width="tech.width" :height="tech.height"
      stroke="black"
      stroke-width="2"
      fill="gray" />
    <text 
      fill="black" stroke="none"
      font-family="Avenir, Helvetica, Arial, sans-serif"
      :x="hw" :y="`${hh + 5}`"
      font-size="20"
      text-anchor="middle">{{ tech.label || 'No label' }}</text>
  </g>
</template>

<script>
export default {
  props: {
    tech: {
      type: Object,
      default: {}
    }
  },
  computed: {
    hw() {
      return (this.tech.width || 0) / 2
    },
    hh() {
      return (this.tech.height || 0) / 2
    }
  }
}
</script>