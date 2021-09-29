<template>
  <div class="home">
    <GameTitle msg="Space : Infinite" />
    <br />
    <div class="icons" v-on:click="selectIcons">
      <font-awesome-icon v-for="icon in icons" :icon="['fas', icon]" class="title-icon" :title="icon" :key="icon" />
    </div>
    <TileGrid :tiles="iconTiles" :columns="12" :rows="4" :tileWidth="60" :tileHeight="60" style="font-size: 2em;" />
  </div>
</template>

<script>
import GameTitle from '@/components/GameTitle.vue'
import TileGrid from '@/components/ui/TileGrid.vue'
import icons from '@/models/icons'

export default {
  name: 'Home',
  components: {
    GameTitle, TileGrid
  },
  data() {
    return { icons: [] }
  },
  async mounted() {
    await this.$store.dispatch('refreshContactList')
    this.selectIcons()
  },
  computed: {
    iconTiles() {
      return icons().map((icon) => {
        return {
          id: icon,
          icon: icon
        }
      })
    }
  },
  methods: {
    pickRandomIcon() {
      const iconList = icons()
      const index = Math.floor(iconList.length * Math.random())
      return iconList[index]
    },
    selectIcons() {
      this.icons = [
        this.pickRandomIcon(),
        this.pickRandomIcon(),
        this.pickRandomIcon(),
        this.pickRandomIcon(),
        this.pickRandomIcon()
      ]
    }
  }
}
</script>

<style scoped>
.title-icon {
  color: black;
  margin: 0.1em;
  vertical-align: middle;
  width: 1.5em;
}
.title-icon:nth-child(1) {
  font-size: 2em;
  opacity: 0.4;
  color: blue;
}
.title-icon:nth-child(2) {
  font-size: 3em;
  opacity: 0.8;
  color: red;
}
.title-icon:nth-child(3) {
  font-size: 5em;
}
.title-icon:nth-child(4) {
  font-size: 3em;
  opacity: 0.8;
  color: red;
}
.title-icon:nth-child(5) {
  font-size: 2em;
  opacity: 0.4;
  color: blue;
}
</style>