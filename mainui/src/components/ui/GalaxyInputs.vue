<template>
  <div class="galaxy-input">
    <property label="Galaxy width">
      <input v-model="createGalaxyWidth" type="number" min="5" max="50" v-on:change="checkForm">
      <icon icon="arrows-alt-h" />
    </property>
    <property label="Galaxy height">
      <input v-model="createGalaxyHeight" type="number" min="5" max="50" v-on:change="checkForm">
     <icon icon="arrows-alt-v" />
    </property>
    <property label="Galaxy seed">
      <input v-model="createGalaxySeed" type="number" min="0" max="65536" v-on:change="checkForm">
      <icon icon="dice" v-on:click="randomizeSeed" class="hoverable" />
    </property>
  </div>
</template>

<script>
import Property from '@/components/ui/Property.vue'
import Icon from '@/components/ui/Icon.vue'

export default {
  components: {
    Property, Icon
  },
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

<style scoped>
.galaxy-input {
  display: block;
}
</style>