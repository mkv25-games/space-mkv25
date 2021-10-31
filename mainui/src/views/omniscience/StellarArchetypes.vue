<template>
  <omniscience class="stellar-archetypes">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom>
          <svg>
            <circle r="200" fill="black" />
          </svg>
        </pan-and-zoom>
      </template>
      <template v-slot:right>
        <h2>Stellar Archetypes</h2>
        <p>List of types?</p>
      </template>
    </column-layout>
  </omniscience>
</template>

<script>
import SystemTemplate from '../../models/visual/system-template.inkscape.svg'

export default {
  data() {
    return {
      mass: 0,
      density: 0,
      composition: 0
    }
  },
  components: {
    SystemTemplate
  },
  computed: {
    regions() {
      return this.$store.state.allRegionTypes || []
    },
    system () {
      const systemData = {
        mass: this.mass,
        density: this.density,
        composition: this.composition
      }

      systemData.regions = this.regions.filter(region => {
        const inDensity = systemData.density >= region.density.lower && systemData.density <= region.density.upper 
        const inMass = systemData.mass >= region.mass.lower && systemData.mass <= region.mass.upper 
        return inDensity && inMass
      })

      return systemData
    }
  },
  methods: {
    limitNumber(num) {
      return Number.parseFloat(num.toFixed(3))
    },
    randomiseMass() {
      this.mass = this.limitNumber(Math.random())
    },
    randomiseDensity() {
      this.density = this.limitNumber(Math.random())
    },
    randomiseComposition() {
      this.composition = this.limitNumber(Math.random())
    },
    sortRegions(regions) {
      return regions.sort((a, b) => {
        return a.label.localeCompare(b.label)
      })
    }
  }
}
</script>

<style scoped>
.omniscience-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
  overflow: hidden;
}
</style>
