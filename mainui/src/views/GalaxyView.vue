<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <column-layout class="fixed-width-right overflow-hidden">
          <template v-slot:left>
            <galaxy-svg :galaxy="galaxy" :tileSize="40" v-on:quadrantHover="showQuadrantInfo" />
          </template>
          <template v-slot:right>
            <h2>{{ contact.name }}</h2>
            <p>Last Updated: {{ contact.lastUpdated.toISOString().slice(0, 19).replace('T', ' ') }}</p>
          </template>
        </column-layout>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact'
import newGalaxy from '@/models/galaxy'
import GalaxyNav from '@/components/GalaxyNav.vue'
import ColumnLayout from '@/components/ui/ColumnLayout.vue'
import GalaxySvg from '@/components/ui/GalaxySVG.vue'
import Property from '@/components/ui/Property.vue'
import Icon from '@/components/ui/Icon.vue'

export default {
  components: {
    GalaxyNav, ColumnLayout,
    GalaxySvg, Property, Icon
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    },
    galaxy() {
      return this.$store.state.galaxy || newGalaxy()
    },
  }
}
</script>

<style scoped>
.galaxy-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
  overflow: hidden;
}

</style>