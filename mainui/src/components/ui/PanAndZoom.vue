<template>
  <div class="pan-and-zoom">
    <div ref="slot-content" class="slot-content"
      v-on:mouseover="gainKeyFocus"
      v-on:mouseout="loseKeyFocus"
      v-on:mousedown="startOffset"
      v-on:mouseup="endOffset"
      v-on:mousemove="trackOffset"
      v-on:wheel="scrollZoom">
      <grid-fill :viewx="gridX" :viewy="gridY" :offsetx="gridOffsetX" :offsety="gridOffsetY" :zoom="zoom" />
      <div ref="offset-container" :class="offsetClass()" :style="offsetStyle()">
        <div ref="zoom-container" class="zoom-container" :style="zoomStyle()">
          <slot :zoom="zoom" :offsetX="offsetX" :offsetY="offsetY">

          </slot>
        </div>
      </div>
    </div>
    <div class="slot-controls" v-on:mouseover="clearCursor">
      <icon-button icon="chevron-circle-left" v-on:click="scrollLeft()" />
      <icon-button icon="chevron-circle-right" v-on:click="scrollRight()"  />
      <icon-button icon="chevron-circle-down" v-on:click="scrollDown()"  />
      <icon-button icon="chevron-circle-up" v-on:click="scrollUp()"  />
      <icon-button icon="plus-circle" v-on:click="zoomIn()"  />
      <icon-button icon="minus-circle" v-on:click="zoomOut()"  />
      <div v-if="showLabels">
        <b>X: {{ offsetX }}, Y: {{ offsetY }}, Z: {{ zoom.toPrecision(2) }}</b><br />
        <b>CX: {{ cursorX }}, CY: {{ cursorY }} </b>
      </div>
    </div>
  </div>
</template>

<script>
function size(el) {
  if (el) {
    const width = el.scrollWidth
    const height = el.scrollHeight
    const x = el.offsetX
    const y = el.offsetY
    return {
      width,
      height,
      x,
      y
    }
  } else {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
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
      zoom: 1.0,
      cursorX: 0,
      cursorY: 0,
      moveOffsetX: 0,
      moveOffsetY: 0,
      trackOffsetX: 0,
      trackOffsetY: 0,
      trackMoveOffset: false
    }
  },
  props: {
    centerContent: {
      type: Boolean,
      default: true
    },
    showLabels: {
      type: Boolean,
      default: false
    },
    maxZoom: {
      type: Number,
      default: 0.1
    },
    minZoom: {
      type: Number,
      default: 50
    }
  },
  computed: {
    gridX() {
      const { offsetX, trackOffsetX } = this
      return offsetX - trackOffsetX
    },
    gridY() {
      const { offsetY, trackOffsetY } = this
      return offsetY - trackOffsetY
    },
    gridOffsetX() {
      const { centerContent, hw } = this
      return centerContent ? hw : 0
    },
    gridOffsetY() {
      const { centerContent, hh } = this
      return centerContent ? hh : 0
    },
    hw() {
      const { viewSizeX } = this
      return viewSizeX / 2
    },
    hh() {
      const { viewSizeY } = this
      return viewSizeY / 2
    },
    hzw() {
      const { zoomWidth, zoom } = this
      return zoomWidth / 2 / zoom
    },
    hzh() {
      const { zoomHeight, zoom } = this
      return zoomHeight / 2 / zoom
    }
  },
  methods: {
    offsetStyle() {
      const { centerContent, offsetX, offsetY, hw, hh, trackOffsetX, trackOffsetY } = this
      let x, y
      if (centerContent) {
        x = offsetX - trackOffsetX + hw
        y = offsetY - trackOffsetY + hh
      } else {
        x = offsetX - trackOffsetX
        y = offsetY - trackOffsetY
      }
      return `left: ${x}px; top: ${y}px; width: 1px; height: 1px;`
    },
    offsetClass() {
      const state = this.trackMoveOffset ? 'moving' : 'static'
      return ['offset-container', state].join(' ')
    },
    zoomStyle() {
      const { zoom, hzw, hzh, centerContent } = this
      if (centerContent) {
        return `zoom: ${zoom}; left: ${-hzw}px; top: ${-hzh}px;`
      } else {
        return `zoom: ${zoom}; left: 0; top: 0;`
      }
    },
    scrollLeft() {
      this.scrollDirection(100, 0)
    },
    scrollRight() {
      this.scrollDirection(-100, 0)
    },
    scrollUp() {
      this.scrollDirection(0, 100)
    },
    scrollDown() {
      this.scrollDirection(0, -100)
    },
    scrollZoom(ev) {
      ev.preventDefault()
      const { zoom } = this
      const newZoom = zoom + (ev.deltaY * -0.005 * zoom)
      this.setZoom(newZoom)
    },
    scrollDirection(x, y, newZoom) {
      const { zoom, offsetX, offsetY, maxZoom, minZoom } = this
      const newX = Math.round(offsetX + x)
      const newY = Math.round(offsetY + y)
      this.offsetX = newX
      this.offsetY = newY
      this.zoom = Math.min(Math.max(newZoom || zoom, maxZoom), minZoom)
      this.recaculateSizes('scrollDirection')
    },
    setZoom(newZoom) {
      const { zoom, cursorX, cursorY, offsetX, offsetY, maxZoom, minZoom } = this
      const constrainedZoom = Math.min(Math.max(newZoom, maxZoom), minZoom)
      const delta = zoom - constrainedZoom
      const cursorXOffset = cursorX - offsetX
      const cursorYOffset = cursorY - offsetY
      const deltaX = (cursorXOffset * delta / zoom)
      const deltaY = (cursorYOffset * delta / zoom)
      this.scrollDirection(deltaX, deltaY, constrainedZoom)
      this.recaculateSizes('setZoom')
    },
    zoomIn() {
      const { zoom } = this
      const baseZoom = Math.round(zoom * 2 * 1000) / 1000;
      this.setZoom(baseZoom)
    },
    zoomOut() {
      const { zoom } = this
      const baseZoom = Math.round(zoom / 2 * 1000) / 1000;
      this.setZoom(baseZoom)
    },
    gainKeyFocus() {
      document.addEventListener('keydown', this.checkKeyboardKeys)
    },
    loseKeyFocus() {
      document.removeEventListener('keydown', this.checkKeyboardKeys)
    },
    clearCursor() {
      this.cursorX = 0
      this.cursorY = 0
    },
    checkKeyboardKeys(ev) {
      console.log('Check Keyboard Keys', ev)
      const delta = (ev.shiftKey || ev.altKey) ? 100 : 50 
      const map = {
        ArrowUp: () => this.scrollDirection(0, delta),
        ArrowDown: () => this.scrollDirection(0, -delta),
        ArrowLeft: () => this.scrollDirection(delta, 0),
        ArrowRight: () => this.scrollDirection(-delta, 0)
      }
      const noop = () => {}
      const fn = map[ev.code] || noop
      fn()
    },
    startOffset(ev) {
      const { x, y } = ev
      this.moveOffsetX = x
      this.moveOffsetY = y
      this.trackMoveOffset = true
      document.addEventListener('mouseup', this.endOffset)
    },
    trackOffset(ev) {
      const { x, y } = ev
      const { centerContent, trackMoveOffset, moveOffsetX, moveOffsetY, hw, hh } = this
      const { top, left } = this.$el.getBoundingClientRect()
      if (trackMoveOffset) {
        this.trackOffsetX = moveOffsetX - x
        this.trackOffsetY = moveOffsetY - y
      } else {
        this.trackOffsetX = 0
        this.trackOffsetY = 0
      }
      if (centerContent) {
        this.cursorX = ev.clientX - left - hw
        this.cursorY = ev.clientY - top - hh
      } else {
        this.cursorX = ev.clientX - left
        this.cursorY = ev.clientY - top
      }
    },
    endOffset() {
      const { trackOffsetX, trackOffsetY } = this
      this.trackMoveOffset = false
      this.trackOffsetX = 0
      this.trackOffsetY = 0
      this.scrollDirection(-trackOffsetX, -trackOffsetY)
      document.removeEventListener('mouseup', this.endOffset)
    },
    recaculateSizes(source) {
      // console.log('Recalc', source)
      const self = this
      const offsetSize = size(this.$refs['offset-content'])
      self.offsetWidth = offsetSize.width
      self.offsetHeight = offsetSize.height

      const zoomSize = size(this.$refs['zoom-container'])
      self.zoomWidth = zoomSize.width * self.zoom
      self.zoomHeight = zoomSize.height * self.zoom

      self.viewSizeX = self.$el.offsetWidth
      self.viewSizeY = self.$el.offsetHeight

      if (self.zoom === 1.0) {
        const slotSize = size(this.$refs['slot-content'])
        self.slotWidth = slotSize.width
        self.slotHeight = slotSize.height
      }
    }
  },
  mounted() {
    const self = this
    self.resizeObserver = new ResizeObserver(() => {
      self.recaculateSizes()
    })
    if (self.$el) {
      self.resizeObserver.observe(self.$el)
    }
  },
  destroyed() {
    this.resizeObserver.disconnect()
  }
}
</script>

<style>
.pan-and-zoom {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
}
.pan-and-zoom.darkmode {
  background: black;
}

.slot-content {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.offset-container {
  display: inline-block;
  position: absolute;
  overflow: visible;
}
.offset-container.moving > zoom.container {
  outline: 2px solid white;
  outline-offset: -2px;
  background: rgba(0,0,0,0.5);
}
.offset-container.moving * {
  pointer-events: none;
}
.zoom-container {
  display: inline-block;
  position: absolute;
  overflow: visible;
  font-size: 0;
}
.slot-controls {
  display: inline-block;
  position: absolute;
  bottom: 1em;
  left: 1em;
  font-size: 2em;
  color: black;
}
.darkmode .slot-controls {
  color: #eee;
}
</style>
