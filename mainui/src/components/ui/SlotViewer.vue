<template>
  <div class="slot-viewer">
    <div ref="slot-content" class="slot-content"
      v-on:mouseover="gainKeyFocus"
      v-on:mouseout="loseKeyFocus"
      v-on:mousedown="startOffset"
      v-on:mouseup="endOffset"
      v-on:mousemove="trackOffset"
      v-on:wheel="scrollZoom">
      <div ref="offset-container" :class="offsetClass()" :style="offsetStyle()">
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
      <br />
      <b>XY: {{ offsetX }}, {{ offsetY }}, Z: {{ zoom.toPrecision(2) }}</b>
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
      zoom: 1.0,
      moveOffsetX: 0,
      moveOffsetY: 0,
      trackOffsetX: 0,
      trackOffsetY: 0,
      trackMoveOffset: false
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
  methods: {
    offsetStyle() {
      const hw = this.viewSizeX / 2
      const hh = this.viewSizeY / 2
      const x = this.offsetX - this.trackOffsetX + hw
      const y = this.offsetY - this.trackOffsetY + hh
      return `left: ${x}px; top: ${y}px; width: 1px; height: 1px;`
    },
    offsetClass() {
      const state = this.trackMoveOffset ? 'moving' : 'static'
      return ['offset-container', state].join(' ')
    },
    zoomStyle() {
      const zoomScale = this.zoom
      const hw = Math.round(this.zoomWidth / 2 / this.zoom)
      const hh = Math.round(this.zoomHeight / 2 / this.zoom)
      return `zoom: ${zoomScale}; left: ${-hw}px; top: ${-hh}px;`
    },
    scrollLeft() {
      this.scrollDirection(-100, 0)
    },
    scrollRight() {
      this.scrollDirection(100, 0)
    },
    scrollUp() {
      this.scrollDirection(0, -100)
    },
    scrollDown() {
      this.scrollDirection(0, 100)
    },
    scrollZoom(ev) {
      ev.preventDefault()
      this.zoom += ev.deltaY * -0.005
      this.recaculateSizes('scrollZoom')
    },
    scrollDirection(x, y) {
      let newX = this.offsetX + x
      let newY = this.offsetY + y
      this.offsetX = newX
      this.offsetY = newY
      this.recaculateSizes('scrollDirection')
    },
    zoomIn() {
      const baseZoom = Math.round(this.zoom * 2 * 1000) / 1000;
      this.zoom = Math.min(Math.max(baseZoom, 0.1), 10)
      this.recaculateSizes('zoomIn')
    },
    zoomOut() {
      const baseZoom = Math.round(this.zoom / 2 * 1000) / 1000;
      this.zoom = Math.min(Math.max(baseZoom, 0.1), 10)
      this.recaculateSizes('zoomOut')
    },
    gainKeyFocus() {
      document.addEventListener('keydown', this.checkKeyboardKeys)
    },
    loseKeyFocus() {
      document.removeEventListener('keydown', this.checkKeyboardKeys)
    },
    checkKeyboardKeys(ev) {
      console.log('Check Keyboard Keys', ev)
      const delta = (ev.shiftKey || ev.altKey) ? 100 : 20 
      const map = {
        ArrowUp: () => this.scrollDirection(0, -delta),
        ArrowDown: () => this.scrollDirection(0, delta),
        ArrowLeft: () => this.scrollDirection(-delta, 0),
        ArrowRight: () => this.scrollDirection(delta, 0)
      }
      const noop = () => {}
      const fn = map[ev.code] || noop
      fn()
    },
    startOffset(ev) {
      // console.log('Start offset:', ev)
      this.moveOffsetX = ev.x
      this.moveOffsetY = ev.y
      this.trackMoveOffset = true
      const self = this
      document.addEventListener('mouseup', this.endOffset)
    },
    trackOffset(ev) {
      if (this.trackMoveOffset) {
        const x = this.moveOffsetX - ev.x
        const y = this.moveOffsetY - ev.y
        this.trackOffsetX = x
        this.trackOffsetY = y
      } else {
        this.trackOffsetX = 0
        this.trackOffsetY = 0
      }
    },
    endOffset() {
      // console.log('End offset:', ev)
      this.trackMoveOffset = false
      const x = this.trackOffsetX
      const y = this.trackOffsetY
      this.trackOffsetX = 0
      this.trackOffsetY = 0
      this.scrollDirection(-x, -y)
      document.removeEventListener('mouseup', this.endOffset)
    },
    limitBoundaries() {
      if (this.zoom > 10) {
        this.zoom = 10
      }
      if (this.zoom < 0.1) {
        this.zoom = 0.1
      }
    },
    recaculateSizes(source) {
      console.log('Recalc', source)
      this.limitBoundaries()
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
  user-select: none;
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
.offset-container.static > .zoom-container {
  outline: 2px solid black;
  outline-offset: -2px;
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
}
.slot-controls {
  display: inline-block;
  position: absolute;
  bottom: 2em;
  left: 2em;
  font-size: 2em;
}
</style>
