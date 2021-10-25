<template>
  <OmniscienceView class="regions">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <slot-viewer>
          <div ref="region-svg">
            <svg style="width: 540px; height: 540px; display: block;" :viewBox="`-20 -20 ${scale + 40} ${scale + 40}`">
              <g>
                <g
                  :transform="`translate(${region.density.lower * scale} ${region.mass.lower * scale})`"
                  v-for="region in regions" :key="region.id" :class="activeRegionClass(region)">
                  <rect
                    :width="(region.density.upper - region.density.lower) * scale"
                    :height="(region.mass.upper - region.mass.lower) * scale"
                    :fill="region.color" :class="activeRegionClass(region)"
                    v-on:mouseover="highlightRegion(region)">
                  </rect>
                  <text
                    x="5" y="15"
                    :width="(region.density.upper - region.density.lower) * scale">
                    {{ region.label }}
                  </text>
                </g>

                <text x="0" y="-5">(0.0) Low Density</text>
                <text x="0" y="512">(0.0) Low Density</text>

                <text x="5" y="12" transform="rotate(90)">(0.0) Low Mass</text>
                <text x="5" y="-505" transform="rotate(90)">(0.0) Low Mass</text>

                <text x="500" y="512" text-anchor="end">High Density (1.0)</text>
                <text x="500" y="-5" text-anchor="end">High Density (1.0)</text>

                <text x="500" y="-505" text-anchor="end" transform="rotate(90)">High Mass (1.0)</text>
                <text x="500" y="12" text-anchor="end" transform="rotate(90)">High Mass (1.0)</text>
              </g>
            </svg>
          </div>
        </slot-viewer>
      </template>
      <template v-slot:right>
        <h2>Regions</h2>
        <div class="region info" v-for="region in sortRegions(regions)" :key="region.id" v-on:mouseover="highlightRegion(region)">
          <icon icon="expand" :style="`color: ${region.color}`" /> {{ region.label }}
        </div>
        <div v-if="activeRegion" class="active region">
          <h3>{{ activeRegion.label }}</h3>
          <p>
            <property label="Mass:Lower">
              {{ activeRegion.mass.lower }}
              <icon icon="truck-loading" /> </property>
            <property label="Mass:Upper">
              {{ activeRegion.mass.upper }}
              <icon icon="weight-hanging" /> </property>
            <property label="Density:Lower">
              {{ activeRegion.density.lower }}
              <icon icon="feather" /> </property>
            <property label="Density:Upper">
              {{ activeRegion.density.upper }}
              <icon icon="weight-hanging" /> </property>
            <property label="Color">
              {{ activeRegion.color }}
              <icon icon="square" :style="`color: ${activeRegion.color}`" /> 
            </property>
            <property label="Frequency">
              {{ pc(expectedFrequency(activeRegion)) }}
              <icon icon="circle" /> </property>
          </p>
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
import Property from '@/components/ui/Property.vue'

export default {
  data() {
    return {
      visualModel: false,
      activeRegion: {
        mass: {},
        density: {}
      },
      scale: 500
    }
  },
  components: {
    OmniscienceView, ColumnLayout, Icon, RegionsSVG, SlotViewer, Icon, Property
  },
  computed: {
    galaxy() {
      return this.contact.galaxy || newGalaxy()
    },
    regions() {
      return this.$store.state.allRegionTypes || []
    },
    analysis() {
      return this.regions
    }
  },
  methods: {
    activeRegionClass(region) {
      const activeRegion = this.activeRegion || {}
      return region.id === activeRegion.id ? 'region active' : 'region'
    },
    highlightRegion(region) {
      this.activeRegion = region
    },
    expectedFrequency(region) {
      const density = region.density.upper - region.density.lower
      const mass = region.mass.upper - region.mass.lower
      return density * mass
    },
    pc(num) {
      return `${(num * 100).toPrecision(4)}%`
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
.region.info {
  text-align: left;
  background: #222;
  color: white;
  padding: 0.2em;
  margin: 0.1em 0;
  vertical-align: middle;
  cursor: pointer;
}
.region.info:hover {
  background: #111;
  transition: background 250ms ease-in-out;
}
rect {
  opacity: 0.5;
  transition: opacity 1s ease-in-out;
}
g.active > rect {
  opacity: 1.0;
  transition: opacity 250ms ease-in-out;
}
text {
  font: bold 12px sans-serif;
}
g.region > text {
  opacity: 0.5;
}
g.active > text {
  opacity: 1.0;
  transition: opacity 500ms ease-in-out;
}
</style>
