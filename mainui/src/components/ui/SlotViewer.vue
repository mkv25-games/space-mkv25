<template>
  <div class="slot-viewer">
    <property label="Zoom">
      <input type="number" min="0.1" max="10.0" step="0.1" v-model="zoom">
      <icon icon="moon" />
    </property>
    <div ref="slot-content" class="slot-content">
      <div class="offset-container" :style="offsetStyle">
        <div class="zoom-container" :style="zoomStyle">
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

export default {
  data() {
    return {
      resizeObserver: false,
      viewSizeX: 0,
      viewSizeY: 0,
      slotWidth: 0,
      slotHeight: 0,
      zoom: 0
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
      const x = Math.floor(cx - this.slotWidth / 2)
      const y = Math.floor(cy - this.slotHeight / 2)
      return {
        x,
        y 
      }
    },
    zoomToFit() {
      const scaleX = this.viewSizeX / this.slotWidth
      const scaleY = this.viewSizeY / this.slotHeight
      return Math.min(scaleX, scaleY)
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
    self.zoom = this.zoomToFit
    self.resizeObserver = new ResizeObserver(() => {
      const slotContent = this.$refs['slot-content']
      self.viewSizeX = self.$el.clientWidth
      self.viewSizeY = self.$el.clientHeight
      self.slotWidth = slotContent.scrollWidth
      self.slotHeight = slotContent.scrollHeight
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
}
.offset-container {
  display: block;
}
.zoom-container {
  display: block;
}
</style>
