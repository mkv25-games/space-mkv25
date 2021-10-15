<template>
  <div class="omniscience-view">
    <OmniscienceNav />
    <div class="frame">
      <slot>
        <column-layout class="fixed-width-right overflow-hidden">
          <template v-slot:left>
            <p>Map of the universe goes here?</p>
            <icon icon="moon" />
          </template>
          <template v-slot:right>
            <h2>Omniscience</h2>
            <p>Gaze upon the universe in all its glory.</p>
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

export default {
  components: {
    OmniscienceNav, ColumnLayout, Icon
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
