<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <column-layout class="fixed-width-right overflow-hidden">
          <template v-slot:left>
            <slot-viewer>
              <galaxy-svg :galaxy="galaxy" :tileSize="40" style="width: 500px; height: 500px;" />
            </slot-viewer>
          </template>
          <template v-slot:right>
            <h2>{{ contact.name }}</h2>
            <p>Last Updated: {{ lastUpdated }}</p>
          </template>
        </column-layout>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact'
import newGalaxy from '@/models/galaxy'
import GalaxyNav from '@/views/galaxy/ui/GalaxyNav.vue'
import GalaxySvg from '@/views/galaxy/ui/GalaxySVG.vue'

export default {
  components: {
    GalaxyNav, GalaxySvg
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    },
    galaxy() {
      return this.contact.galaxy || newGalaxy()
    },
    lastUpdated() {
      const date = new Date(this.contact.lastUpdated)
      return date.toISOString().slice(0, 19).replace('T', ' ')
    }
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
