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
          <label>Galaxy Seed:</label>
          <input v-model="createGalaxySeed" type="number" min="0" max="65536" >
          <font-awesome-icon :icon="['fas', 'dice']" class="title-icon" v-on:click="randomizeSeed" />
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
              :x="q.x * tile.size" :y="q.y * tile.size" v-on:mouseover="showQuadrantInfo(q)" />
          </g>
        </svg>
        <div v-if="highlightedQuadrant">
          <h3>Highlighted Quadrant</h3>
          <p>
            <label>Quadrant Mass:</label>
            <b>{{ highlightedQuadrant.mass }}</b>
          </p>
          <p>
            <label>Quadrant Density:</label>
            <b>{{ highlightedQuadrant.density }}</b>
          </p>
          <p>
            <label>Quadrant Composition:</label>
            <b>{{ highlightedQuadrant.composition }}</b>
          </p>
        </div>
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
      createGalaxySeed: 0,
      createGalaxyWidth: 10,
      createGalaxyHeight: 10,
      tileSize: 40,
      highlightedQuadrant: false
    }
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    }, 
    galaxy() {
      let galaxy = this.$store.state.galaxy || newGalaxy()
      const seedDifference = galaxy.seed !== this.createGalaxySeed
      const heightDifference = galaxy.size.h !== this.createGalaxyHeight
      const widthDifference = galaxy.size.w !== this.createGalaxyWidth
      const sizeDifference = widthDifference || heightDifference || seedDifference
      if (sizeDifference) {
        galaxy = newGalaxy({ 
          size: {
            w: Math.min(this.createGalaxyWidth, 50),
            h: Math.min(this.createGalaxyHeight, 50)
          },
          seed: Math.min(this.createGalaxySeed, 65536)
        })
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
      return `rgba(${mass},${composition},${density},${density})`
    },
    randomizeSeed() {
      this.createGalaxySeed = Math.round(Math.random() * 65536)
    },
    showQuadrantInfo(quadrant) {
      this.highlightedQuadrant = quadrant
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