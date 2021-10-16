<template>
  <OmniscienceView class="regions">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <slot-viewer>
          <RegionsSVG />
        </slot-viewer>
      </template>
      <template v-slot:right>
        <h2>Regions</h2>
        <p>Analyze regions</p>
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

import RegionsSVG from '@/models/visual/regions.drawio.svg'

export default {
  components: {
    OmniscienceView, ColumnLayout, Icon, RegionsSVG, SlotViewer
  },
  computed: {
    galaxy () {
      return this.contact.galaxy || newGalaxy()
    }
  }
}
</script>
