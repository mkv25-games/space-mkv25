<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <column-layout>
          <template v-slot:left>
            <galaxy-svg :galaxy="galaxy" v-on:quadrantHover="showQuadrantInfo" />
          </template>
          <template v-slot:right>
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
          </template>
        </column-layout>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact'
import newGalaxy from '@/models/galaxy'
import GalaxyNav from '@/components/GalaxyNav.vue'
import GalaxySvg from '@/components/ui/GalaxySVG.vue'
import ColumnLayout from '@/components/ui/ColumnLayout.vue'
import quadrantColourMethods from '@/utils/quadrantColourMethods'

export default {
  components: { GalaxyNav, GalaxySvg, ColumnLayout },
  data() {
    return {
      tileSize: 40,
      createGalaxySeed: 0,
      createGalaxyWidth: 10,
      createGalaxyHeight: 10,
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
  }, 
  methods: Object.assign({
    randomizeSeed() {
      this.createGalaxySeed = Math.round(Math.random() * 65536)
    },
    showQuadrantInfo(quadrant) {
      this.highlightedQuadrant = quadrant
    }
  }, quadrantColourMethods),
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