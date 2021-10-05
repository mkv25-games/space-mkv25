<template>
  <div class="galaxy-input">
    <p>
      <label>Galaxy width:</label>
      <input v-model="createGalaxyWidth" type="number" min="5" max="50" v-on:change="checkForm">
    </p>
    <p>
      <label>Galaxy Height:</label>
      <input v-model="createGalaxyHeight" type="number" min="5" max="50" v-on:change="checkForm">
    </p>
    <p>
      <label>Galaxy Seed:</label>
      <input v-model="createGalaxySeed" type="number" min="0" max="65536" v-on:change="checkForm">
      <font-awesome-icon :icon="['fas', 'dice']" class="title-icon" v-on:click="randomizeSeed" />
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      createGalaxySeed: 0,
      createGalaxyWidth: 10,
      createGalaxyHeight: 10
    }
  },
  methods: Object.assign({
    randomizeSeed() {
      this.createGalaxySeed = Math.round(Math.random() * 65536)
      this.checkForm()
    },    
    checkForm() {
      this.$emit('inputsChanged', {
        size: {
          w: Math.min(this.createGalaxyWidth, 50),
          h: Math.min(this.createGalaxyHeight, 50)
        },
        seed: Math.min(this.createGalaxySeed, 65536)
      })
    },
  })
}
</script>