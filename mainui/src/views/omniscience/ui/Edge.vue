<template>
  <g>
    <path v-for="section in edge.sections" :key="section.id"
      :d="drawPath(section)"
      stroke="black"
      stroke-width="3"
      stroke-opacity="0.5"
      fill="none" />
  </g>
</template>

<script>
export default {
  props: {
    edge: {
      type: Object,
      default: {
        sections: []
      }
    }
  },
  methods: {
    drawPath(section) {
      const { moveto, lineto } = this
      const { startPoint, bendPoints, endPoint } = section
      const bends = bendPoints || []
      return [
        moveto(startPoint),
        ...bends.map(lineto),
        lineto(endPoint)
      ].join(' ')
    },
    moveto({x, y}) {
      return `M${x} ${y}`
    },
    lineto({x, y}) {
      return `L${x} ${y}`
    },
    closepath() {
      return 'Z'
    }
  }
}
</script>