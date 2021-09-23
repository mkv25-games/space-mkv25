<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <GameTitle msg="Space: MKV25"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameTitle from '@/components/GameTitle.vue'

export default {
  name: 'Home',
  components: {
    GameTitle
  }
}
</script>
