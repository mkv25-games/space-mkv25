<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <column-layout class="fixed-width-right overflow-hidden">
          <template v-slot:left>
            <slot-viewer class="darkmode">
              <GalaxySVG :galaxy="galaxy" :tileSize="40" v-on:quadrantHover="showQuadrantInfo" />
            </slot-viewer>
          </template>
          <template v-slot:right>
            <h2>{{ contact.name }}</h2>
            <p>Last Updated: {{ lastUpdated }}</p>
            <region-types :regions="quadrantWithAnalysis.regions" />
            <icon icon="star" />
          </template>
        </column-layout>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact'
import newGalaxy from '@/models/galaxy'

export default {
  data() {
    return {
      highlightedQuadrant: {
        regions: []
      }
    }
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    },
    galaxy() {
      return this.contact.galaxy || newGalaxy()
    },
    lastUpdated() {
      const date = new Date(this.contact.lastUpdated)
      return date.toISOString().slice(0, 19).replace('T', ' ')
    },
    regions() {
      return this.$store.state.allRegionTypes || []
    },
    quadrantWithAnalysis () {
      const quad = this.highlightedQuadrant || {}
      const quadrantData = {
        mass: quad.mass,
        density: quad.density,
        composition: quad.composition
      }

      quadrantData.regions = this.regions.filter(region => {
        const inDensity = quadrantData.density >= region.density.lower && quadrantData.density <= region.density.upper 
        const inMass = quadrantData.mass >= region.mass.lower && quadrantData.mass <= region.mass.upper 
        return inDensity && inMass
      })

      return quadrantData
    }
  },
  methods: {
    showQuadrantInfo(quadrant) {
      this.highlightedQuadrant = quadrant
    }
  }
}
</script>

<style scoped>
.galaxy-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
  overflow: hidden;
}

</style>
