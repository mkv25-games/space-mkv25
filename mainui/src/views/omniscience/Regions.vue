<template>
  <OmniscienceView class="regions">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <slot-viewer>
          <div ref="region-svg">
            <svg style="width: 500px; height: 500px; display: block;" :viewBox="`0 0 ${scale} ${scale}`">
              <g>
                <rect v-for="region in regions" :key="region.id"
                  :x="region.density.lower * scale" :y="region.mass.lower * scale"
                  :width="region.density.upper * scale" :height="region.mass.upper * scale"
                  :fill="region.color" :class="activeRegionClass(region)" />
              </g>
            </svg>
          </div>
        </slot-viewer>
      </template>
      <template v-slot:right>
        <h2>Regions</h2>
        <div class="region info" v-for="region in regions" :key="region.id" v-on:mouseover="highlightRegion(region)">
          <icon icon="expand" :style="`color: ${region.color}`" /> {{ region.label }}
        </div>
      </template>
    </column-layout>
  </OmniscienceView>
</template>

<script>
import newGalaxy from '@/models/galaxy'
import OmniscienceView from './Omniscience.vue'
import ColumnLayout from '@/components/ui/ColumnLayout.vue'
import Icon from '@/components/ui/Icon.vue'
import SlotViewer from '@/components/ui/SlotViewer.vue'
import RegionsSVG from '@/models/visual/regions.inkscape.svg'

const regions = require('../../../../data/regions.json')

export default {
  data() {
    return {
      visualModel: false,
      activeRegion: {},
      scale: 500
    }
  },
  components: {
    OmniscienceView, ColumnLayout, Icon, RegionsSVG, SlotViewer, Icon
  },
  computed: {
    galaxy() {
      return this.contact.galaxy || newGalaxy()
    },
    regions() {
      return regions.regions
    },
    analysis() {
      return this.regions
    }
  },
  methods: {
    activeRegionClass(region) {
      const activeRegion = this.activeRegion || {}
      return region.id === activeRegion.id ? 'active' : ''
    },
    highlightRegion(region) {
      this.activeRegion = region
    }
  }
}
</script>

<style scoped>
.region.info {
  text-align: left;
  background: #222;
  color: white;
  padding: 0.2em;
  margin: 0.1em 0;
  vertical-align: middle;
}
rect {
  opacity: 0.5;
  transition: opacity 1s ease-in-out;
}
rect.active {
  opacity: 1.0;
  transition: opacity 500ms ease-in-out;
}
</style>
