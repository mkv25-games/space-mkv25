<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <GameTitle msg="Space : Infinite"/>
  </div>
</template>

<script>
import GameTitle from '@/components/GameTitle.vue'

export default {
  name: 'Home',
  components: {
    GameTitle
  },
  async mounted() {
    await this.$store.dispatch('refreshContactList')
  }
}
</script>
