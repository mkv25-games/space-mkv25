<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <h1>Galaxy</h1>
        <h2>{{ contact.name }}</h2>
        <pre>{{ contact.lastUpdated }}</pre>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact.js'
import GalaxyNav from '@/components/GalaxyNav.vue'

export default {
  components: { GalaxyNav },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
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
}

</style>