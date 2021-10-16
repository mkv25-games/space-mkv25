<template>
  <div class="slot-viewer">
    <property label="Zoom">
      <input type="number" min="0.1" max="10.0" step="0.1" v-model="zoom">
      <icon icon="expand-alt" v-on:click="setZoomToFit" />
    </property>
    <div ref="slot-content" class="slot-content">
      <div ref="offset-container" class="offset-container" :style="offsetStyle()">
        <div ref="zoom-container" class="zoom-container" :style="zoomStyle()">
          <slot>

          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Property from './Property.vue'
import Icon from './Icon.vue'

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
    setZoomToFit() {
      const scaleX = this.viewSizeX / this.slotWidth
      const scaleY = this.viewSizeY / this.slotHeight
      const scale = Math.min(scaleX, scaleY)
      this.zoom = Math.round(scale * 1000) / 1000
    },
    offsetStyle() {
      const { x, y } = this.centerOffset
      return `left: ${x}px; top: ${y}px;`
    },
    zoomStyle() {
      const zoomScale = this.zoom
      return `zoom: ${zoomScale};`
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
</style>
