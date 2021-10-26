<template>
  <div class="galaxy-input">
    <property label="Galaxy width">
      <input v-model="createGalaxyWidth" type="number" min="5" max="50" v-on:change="checkForm">
      <icon icon="long-arrow-alt-right" />
    </property>
    <property label="Galaxy height">
      <input v-model="createGalaxyHeight" type="number" min="5" max="50" v-on:change="checkForm">
     <icon icon="long-arrow-alt-up" />
    </property>
    <property label="X Offset">
      <input v-model="createGalaxyXOffset" type="number" min="-65536" max="65536" v-on:change="checkForm">
      <icon icon="arrows-alt-h" />
    </property>
    <property label="Y Offset">
      <input v-model="createGalaxyYOffset" type="number" min="-65536" max="65536" v-on:change="checkForm">
     <icon icon="arrows-alt-v" />
    </property>
    <property label="Galaxy seed">
      <input v-model="createGalaxySeed" type="number" min="0" max="65536" v-on:change="checkForm">
      <icon icon="dice" v-on:click="randomizeSeed" class="button" />
    </property>
    <property label="Quadrant function">
      <select v-model="quadrantFunction" v-on:change="checkForm">
        <option value="perlin">perlin</option>
        <option value="cartesian">cartesian</option>
      </select>
    </property>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createGalaxySeed: 0,
      createGalaxyWidth: 10,
      createGalaxyHeight: 10,
      createGalaxyXOffset: 0,
      createGalaxyYOffset: 0,
      quadrantFunction: 'perlin'
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
        offset: {
          x: Math.max(-65536, Math.min(65536, this.createGalaxyXOffset)),
          y: Math.max(-65536, Math.min(65536, this.createGalaxyYOffset))
        },
        seed: Math.min(this.createGalaxySeed, 65536),
        qFn: this.quadrantFunction || 'perlin'
      })
    },
  })
}
</script>

<style scoped>
.galaxy-input {
  display: block;
}
</style>
