<template>
  <div class="omniscience-view">
    <OmniscienceNav />
    <div class="frame">
      <slot>
        <column-layout class="fixed-width-right overflow-hidden">
          <template v-slot:left>
            <p>A navigable breakdown of different generatable systems</p>
            <icon icon="adjust" />
          </template>
          <template v-slot:right>
            <h2>Systems</h2>
            <p>Generate a specific type of system based on mass, density, and composition.</p>
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
