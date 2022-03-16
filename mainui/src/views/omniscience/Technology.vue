<template>
  <omniscience class="technology">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom>
          <technology-diagram />
        </pan-and-zoom>
      </template>
      <template v-slot:right>
        <h2>Technologies</h2>
        <property-panel :item="technologies" :rows="8" />
      </template>
    </column-layout>
  </omniscience>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    technologies() {
      return this.$store.state.gamedata.Technology || []
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
