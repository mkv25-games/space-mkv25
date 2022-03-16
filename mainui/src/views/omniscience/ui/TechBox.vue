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
      :y="5"
      font-size="15"
      text-anchor="middle">
      <tspan v-for="(line, index) in labelLines" :key="`la_${index}`"
        :x="hw" dy="19px">{{ line }}</tspan>
    </text>
  </g>
</template>

<script>
export default {
  props: {
    tech: {
      type: Object,
      default: {
        label: 'No label'
      }
    }
  },
  computed: {
    hw() {
      return (this.tech.width || 0) / 2
    },
    hh() {
      return (this.tech.height || 0) / 2
    },
    labelLines() {
      return this.tech.label.split(' ')
    }
  }
}
</script>