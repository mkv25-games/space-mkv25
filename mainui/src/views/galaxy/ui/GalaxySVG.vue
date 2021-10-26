<template>
  <svg class="galaxy-svg" xmlns="http://www.w3.org/2000/svg" :width="svgWidth" :height="svgHeight">
    <g :transform="`translate(${galaxyOffset.x}, ${galaxyOffset.y})`">
      <g>
        <rect v-for="q in galaxy.quadrants"
          :width="tile.size" :height="tile.size"
          :fill="quadrantColour(q)"
          :key="q.key"
          :x="q.x * tile.size" :y="q.y * tile.size" v-on:mouseover="$emit('quadrantHover', q)" />
      </g>
      <g>
        <rect :width="galaxyWidth" :height="galaxyHeight"
          stroke="black" stroke-width="4"
          fill="none"
          style="pointer-events: none;" />
        <rect :width="galaxyWidth" :height="galaxyHeight"
          stroke="white" stroke-width="2" stroke-dasharray="5,2"
          fill="none"
          style="pointer-events: none;" />
      </g>
    </g>
  </svg>
</template>

<script>
import quadrantColourMethods from '@/utils/quadrantColourMethods'

export default {
  data() {
    return {
      resizeObserver: false,
      viewSizeX: 0,
      viewSizeY: 0
    }
  },
  props: {
    galaxy: Object,
    tileSize: {
      type: Number,
      default: 10
    },
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
    galaxyOffset() {
      const cx = this.viewSizeX / 2
      const cy = this.viewSizeY / 2
      const x = Math.floor(cx - this.galaxyWidth / 2)
      const y = Math.floor(cy - this.galaxyHeight / 2)
      return {
        x,
        y 
      }
    },
    tile() {
      return { size: this.tileSize, divider: this.tileSize / 5 }
    },
    svgWidth() {
      return this.galaxyWidth
    },
    svgHeight() {
      return this.galaxyHeight
    }
  },
  methods: Object.assign({}, quadrantColourMethods),
  mounted() {
    const self = this
    self.resizeObserver = new ResizeObserver(() => {
      self.viewSizeX = self.$el.clientWidth
      self.viewSizeY = self.$el.clientHeight
    })
    self.resizeObserver.observe(self.$el)
  },
  destroyed() {
    this.resizeObserver.disconnect()
  }
}
</script>

<style>
text.heavy {
  font: bold 16px sans-serif;
  fill: white;
}
</style>
