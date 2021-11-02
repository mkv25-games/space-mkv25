<template>
  <omniscience class="stellar-archetypes">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom class="darkmode">
          <svg viewBox="-500 -500 1000 1000" width="1000" height="1000" style="position: absolute; left: 0; right: 0;">
            <circle cx="0" cy="0" r="200" fill="transparent" stroke="orange" stroke-width="2" opacity="0.5" />
            <circle cx="-200" cy="0" r="10" fill="orange" />
            <circle cx="0" cy="0" r="60" fill="transparent" stroke="white" stroke-width="2" opacity="0.5" />
            <circle cx="60" cy="0" r="15" fill="white" />
            <circle cx="0" cy="0" r="20" fill="transparent" stroke="grey" stroke-width="4" opacity="0.5" />
            <circle cx="0" cy="0" r="20" fill="black" />
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
