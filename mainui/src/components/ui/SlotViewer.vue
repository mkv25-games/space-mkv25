<template>
  <div class="slot-viewer">
    <div ref="slot-content" class="slot-content">
      <div ref="offset-container" class="offset-container" :style="offsetStyle()">
        <div ref="zoom-container" class="zoom-container" :style="zoomStyle()">
          <slot>

          </slot>
        </div>
      </div>
    </div>
    <div class="slot-controls">
      <icon icon="chevron-circle-left" v-on:click="scrollLeft()" />
      <icon icon="chevron-circle-right" v-on:click="scrollRight()"  />
      <icon icon="plus-circle" v-on:click="zoomIn()"  />
      <icon icon="minus-circle" v-on:click="zoomOut()"  />
      <icon icon="chevron-circle-down" v-on:click="scrollDown()"  />
      <icon icon="chevron-circle-up" v-on:click="scrollUp()"  />
    </div>
  </div>
</template>

<script>
import Property from './Property.vue'
import Icon from './IconButton.vue'

function size(el) {
  if (el) {
    const width = el.scrollWidth
    const height = el.scrollHeight
    return {
      width,
      height
    }
  } else {
    return {
      width: 0,
      height: 0
    }
  }
}

export default {
  data() {
    return {
      resizeObserver: false,
      viewSizeX: 0,
      viewSizeY: 0,
      slotWidth: 0,
      slotHeight: 0,
      offsetX: 0,
      offsetY: 0,
      offsetWidth: 0,
      offsetHeight: 0,
      zoomWidth: 0,
      zoomHeight: 0,
      zoom: 1.0
    }
  },
  components: {
    Icon, Property
  },
  props: {
    galaxy: Object,
    tileSize: {
      type: Number,
      default: 10
    },
  },
  computed: {
    centerOffset() {
      const cx = this.viewSizeX / 2
      const cy = this.viewSizeY / 2
      const x = Math.floor(cx - (this.zoomWidth * this.zoom / 2))
      const y = Math.floor(cy - (this.zoomHeight * this.zoom / 2))
      return {
        x,
        y 
      }
    }
  },
  methods: {
    offsetStyle() {
      const co = this.centerOffset
      const x = co.x + this.offsetX
      const y = co.y + this.offsetY
      return `left: ${x}px; top: ${y}px;`
    },
    zoomStyle() {
      const zoomScale = this.zoom
      return `zoom: ${zoomScale};`
    },
    scrollLeft() {
      this.offsetX = this.offsetX - 100
    },
    scrollRight() {
      this.offsetX = this.offsetX + 100
    },
    scrollUp() {
      this.offsetY = this.offsetY - 100
    },
    scrollDown() {
      this.offsetY = this.offsetY + 100
    },
    zoomIn() {
      this.zoom = Math.round(this.zoom * 2 * 1000) / 1000;
    },
    zoomOut() {
      this.zoom = Math.round(this.zoom / 2 * 1000) / 1000;
    }
  },
  mounted() {
    const self = this
    self.resizeObserver = new ResizeObserver(() => {
      const slotSize = size(this.$refs['slot-content'])
      self.slotWidth = slotSize.width
      self.slotHeight = slotSize.height

      const offsetSize = size(this.$refs['offset-content'])
      self.offsetWidth = offsetSize.width
      self.offsetHeight = offsetSize.height

      const zoomSize = size(this.$refs['zoom-container'])
      self.zoomWidth = zoomSize.width
      self.zoomHeight = zoomSize.height

      console.log('Resize:', {
        slotWidth: self.slotWidth,
        slotHeight: self.slotHeight,
        offsetWidth: self.offsetWidth,
        offsetHeight: self.offsetHeight,
        zoomWidth: self.zoomWidth,
        zoomHeight: self.zoomHeight
      })

      self.viewSizeX = self.$el.clientWidth
      self.viewSizeY = self.$el.clientHeight
      if (self.zoom === 1.0) {
        self.slotWidth = self.zoomWidth
        self.slotHeight = self.zoomHeight
      }
    })
    self.resizeObserver.observe(self.$el)
  },
  destroyed() {
    this.resizeObserver.disconnect()
  }
}
</script>

<style>
.slot-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.slot-content {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 2px solid green;
  outline-offset: -2px;
}
.offset-container {
  display: inline-block;
  position: absolute;
  overflow: visible;
}
.zoom-container {
  display: inline-block;
  overflow: visible;
}
.slot-controls {
  display: inline-block;
  position: absolute;
  bottom: 2em;
  left: 2em;
  font-size: 2em;
}
</style>
