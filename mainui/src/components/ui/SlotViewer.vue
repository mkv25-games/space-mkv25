<template>
  <div class="slot-viewer">
    <property label="VSX">{{ viewSizeX }}</property>
    <property label="VSY">{{ viewSizeY }}</property>
    <property label="SW">{{ slotWidth }}</property>
    <property label="SH">{{ slotHeight }}</property>
    <div ref="slot-content">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
import Property from './Property.vue'

export default {
  data() {
    return {
      resizeObserver: false,
      viewSizeX: 0,
      viewSizeY: 0,
      slotWidth: 0,
      slotHeight: 0
    }
  },
  components: {
    Property
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
    }
  },
  mounted() {
    const self = this
    self.resizeObserver = new ResizeObserver(() => {
      const slotContent = this.$refs['slot-content']
      self.viewSizeX = self.$el.clientWidth
      self.viewSizeY = self.$el.clientHeight
      self.slotWidth = slotContent.clientWidth
      self.slotHeight = slotContent.clientHeight
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
</style>
