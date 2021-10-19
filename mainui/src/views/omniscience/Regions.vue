<template>
  <OmniscienceView class="regions">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <slot-viewer>
          <div ref="region-svg">
            <svg style="width: 500px; height: 500px; display: block;" viewBox="0 0 1 1">
              <g>
                <rect v-for="region in regions" :key="region.id"
                  :x="region.density.lower" :y="region.mass.lower"
                  :width="region.density.upper" :height="region.mass.upper"
                  :fill="region.color" opacity="0.5" />
              </g>
            </svg>
          </div>
        </slot-viewer>
      </template>
      <template v-slot:right>
        <h2>Regions</h2>
        <div class="region info" v-for="region in regions" :key="region.id">
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
      visualModel: false
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
</style>
