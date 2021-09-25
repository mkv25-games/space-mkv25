<template>
  <div>
    <primary-nav/>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import PrimaryNav from '@/components/PrimaryNav.vue'

export default defineComponent({
  components: {
    PrimaryNav
  },
  mounted () {
    this.$store.dispatch('loadUserPreferences')
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#mainui-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
