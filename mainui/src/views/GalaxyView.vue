<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <h1>Galaxy</h1>
        <h2>{{ contact.name }}</h2>
        <pre>{{ contact.lastUpdated }}</pre>
        <p>
          <label>Galaxy width:</label>
          <input v-model="createGalaxyWidth" type="number" min="5" max="50" >
        </p>
        <p>
          <label>Galaxy Height:</label>
          <input v-model="createGalaxyHeight" type="number" min="5" max="50" >
        </p>
        <p>
          <label>Tile Size:</label>
          <input v-model="tileSize" type="number" min="5" max="50" >
        </p>
        <svg :width="galaxyWidth" :height="galaxyHeight" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
            </pattern>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="url(#smallGrid)"/>
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="gray" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <g>
            <rect v-for="q in galaxy.quadrants"
              :width="tile.size" :height="tile.size"
              :fill="quadrantColour(q)"
              :key="q.key"
              :x="q.x * tile.size" :y="q.y * tile.size" />
          </g>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact.js'
import newGalaxy from '@/models/galaxy.js'
import GalaxyNav from '@/components/GalaxyNav.vue'

export default {
  components: { GalaxyNav },
  data() {
    return {
      createGalaxyWidth: 10,
      createGalaxyHeight: 10,
      tileSize: 10
    }
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    }, 
    galaxy() {
      let galaxy = this.$store.state.galaxy || newGalaxy()
      const heightDifference = galaxy.size.h !== this.createGalaxyHeight
      const widthDifference = galaxy.size.w !== this.createGalaxyWidth
      const sizeDifference = widthDifference || heightDifference
      if (sizeDifference) {
        galaxy = newGalaxy({ size: {
          w: this.createGalaxyWidth,
          h: this.createGalaxyHeight
        }})
      }
      return galaxy
    },
    galaxyWidth() {
      return (this.galaxy.size.w * this.tile.size) + 1
    },
    galaxyHeight() {
      return (this.galaxy.size.h * this.tile.size) + 1
    },
    tile() {
      return { size: this.tileSize }
    }
  },
  methods: {
    quadrantColour(quadrant) {
      const mass = Math.round(125 + (125 * quadrant.mass))
      const density = Math.round(125 + (125 * quadrant.density))
      const composition = Math.round(125 + (125 * quadrant.composition))
      return `rgba(${mass},${composition},${composition},${density})`
    }
  },
}
</script>

<style scoped>
.galaxy-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
  overflow-y: scroll;
}

</style>