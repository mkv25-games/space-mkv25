<template>
  <OmniscienceView class="regions">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <slot-viewer>
          <SystemSVG />
          <icon icon="moon" />
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

import SystemSVG from '@/models/visual/system.drawio.svg'

export default {
  components: {
    OmniscienceView, ColumnLayout, Icon, SystemSVG, SlotViewer
  },
  computed: {
    galaxy () {
      return this.contact.galaxy || newGalaxy()
    }
  }
}
</script>
