<template>
  <div class="omniscience-view">
    <OmniscienceNav />
    <div class="frame">
      <slot>
        <column-layout class="fixed-width-right overflow-hidden">
          <template v-slot:left>
            <slot-viewer>
              <div style="font-size: 0;"><system-template /></div>
            </slot-viewer>
          </template>
          <template v-slot:right>
            <h2>Systems</h2>
            <property label="Mass"><input type="number" v-model="mass" step="0.001" min="0" max="1" /><icon-button icon="dice" v-on:click="randomiseMass" /></property>
            <property label="Density"><input type="number" v-model="density" step="0.001" min="0" max="1" /><icon-button icon="dice" v-on:click="randomiseDensity" /></property>
            <property label="Composition"><input type="number" v-model="composition" step="0.001" min="0" max="1" /><icon-button icon="dice" v-on:click="randomiseComposition" /></property>
            <h3>Region Type</h3>
            <region-types :regions="sortRegions(system.regions)" />
          </template>
        </column-layout> 
      </slot>
    </div>
  </div>
</template>

<script>
import OmniscienceNav from './ui/OmniscienceNav.vue'
import ColumnLayout from '@/components/ui/ColumnLayout.vue'
import Icon from '@/components/ui/Icon.vue'
import IconButton from '@/components/ui/IconButton.vue'
import SlotViewer from '@/components/ui/SlotViewer.vue'
import SystemTemplate from '@/models/visual/system-template.inkscape.svg'
import Property from '@/components/ui/Property.vue'
import RegionTypes from '@/views/omniscience/ui/RegionTypes.vue'

const regions = require('../../../../modpacks/mkv25/official/regions.json')

export default {
  data() {
    return {
      mass: 0,
      density: 0,
      composition: 0
    }
  },
  components: {
    OmniscienceNav, ColumnLayout, Icon, IconButton, SlotViewer, SystemTemplate, Property, RegionTypes
  },
  computed: {
    regions() {
      return regions.regions
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
