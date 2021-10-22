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
            <p>Generate a specific type of system based on mass, density, and composition.</p>
            <p><icon icon="adjust" /> A navigable breakdown of different generatable systems</p>
          </template>
        </column-layout>
      </slot>
    </div>
  </div>
</template>

<script>
import newGalaxy from '@/models/galaxy'
import OmniscienceNav from './ui/OmniscienceNav.vue'
import ColumnLayout from '@/components/ui/ColumnLayout.vue'
import Icon from '@/components/ui/Icon.vue'
import SlotViewer from '@/components/ui/SlotViewer.vue'
import SystemTemplate from '@/models/visual/system-template.inkscape.svg'

export default {
  components: {
    OmniscienceNav, ColumnLayout, Icon, SlotViewer, SystemTemplate
  },
  computed: {
    galaxy () {
      return this.contact.galaxy || newGalaxy()
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
