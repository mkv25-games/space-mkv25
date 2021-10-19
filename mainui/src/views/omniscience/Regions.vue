<template>
  <OmniscienceView class="regions">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <slot-viewer>
          <div ref="region-svg">
            <RegionsSVG style="width: 500px; height: 500px; display: block;" />
          </div>
        </slot-viewer>
      </template>
      <template v-slot:right>
        <h2>Regions</h2>
        <p>Analyze regions</p>
        <div>{{ analysis }}</div>
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

export default {
  data() {
    return {
      visualModel: false
    }
  },
  components: {
    OmniscienceView, ColumnLayout, Icon, RegionsSVG, SlotViewer
  },
  computed: {
    galaxy() {
      return this.contact.galaxy || newGalaxy()
    },
    analysis() {
      const model = this.visualModel
      if (model) {
        const paths = [...model.getElementsByTagName('path')].map(p => p.getAttribute('d'))
        const labels = [...model.getElementsByTagName('text')].map(l => l.textContent)
        const data = paths.map((path, i) => {
          const label = labels[i]
          return { label, path }
        })
        return data
      }
      return []
    }
  },
  mounted() {
    const self = this
    this.$nextTick(() => {
      self.visualModel = self.$refs['region-svg']
    })
  }
}
</script>
