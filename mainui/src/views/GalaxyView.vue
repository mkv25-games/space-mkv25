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
            <pattern id="smallGrid" :width="tile.divider" :height="tile.divider" patternUnits="userSpaceOnUse">
              <path :d="`M ${tile.divider} 0 L 0 0 0 ${tile.divider}`" fill="none" stroke="gray" stroke-width="0.5"/>
            </pattern>
            <pattern id="grid" :width="tile.size" :height="tile.size" patternUnits="userSpaceOnUse">
              <rect :width="tile.size" :height="tile.size" fill="url(#smallGrid)"/>
              <path :d="`M ${tile.size} 0 L 0 0 0 ${tile.size}`" fill="none" stroke="gray" stroke-width="1"/>
            </pattern>
          </defs>
          <g>
            <rect v-for="q in galaxy.quadrants"
              :width="tile.size" :height="tile.size"
              :fill="quadrantColour(q)"
              :key="q.key"
              :x="q.x * tile.size" :y="q.y * tile.size" v-on:mouseover="showQuadrantInfo(q)" />
          </g>
          <rect width="100%" height="100%" fill="url(#grid)" style="pointer-events: none;" />
        </svg>
        <div></div>
        <div v-if="highlightedQuadrant" style="display: inline-block; text-align: left;">
          <h3 :style="`border-bottom: 5px solid ${quadrantColour(highlightedQuadrant)};`">Highlighted Quadrant</h3>
          <p :style="`background: ${massColour(highlightedQuadrant, 0.4)};`">
            <label style="padding: 5px;">Quadrant Mass:</label>
            <b>{{ highlightedQuadrant.mass.toFixed(3) }}</b>
          </p>
          <p :style="`background: ${densityColour(highlightedQuadrant, 0.4)};`">
            <label style="padding: 5px;`">Quadrant Density:</label>
            <b>{{ highlightedQuadrant.density.toFixed(3) }}</b>
          </p>
          <p :style="`background: ${compositionColour(highlightedQuadrant, 0.4)};`">
            <label style="padding: 5px;`">Quadrant Composition:</label>
            <b>{{ highlightedQuadrant.composition.toFixed(3) }}</b>
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
      return { size: this.tileSize, divider: this.tileSize / 5 }
    }
  },
  methods: {
    quadrantColour(quadrant) {
      const mass = Math.round(255 * quadrant.mass)
      const density = Math.round(255 * quadrant.density)
      const composition = Math.round(255 * quadrant.composition)
      const alpha = 1.0 - (quadrant.density / 2)
      return `rgba(${mass},${composition},${density},${alpha})`
    },
    massColour(quadrant, alpha=1.0) {
      const mass = Math.round(255 * quadrant.mass)
      return `rgba(${mass},0,0,${alpha})`
    },
    compositionColour(quadrant, alpha=1.0) {
      const composition = Math.round(255 * quadrant.composition)
      return `rgba(0,${composition},0,${alpha})`
    },
    densityColour(quadrant, alpha=1.0) {
      const density = Math.round(255 * quadrant.density)
      return `rgba(0,0,${density},${alpha})`
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