<template>
  <div class="icon">
     <font-awesome-icon :icon="iconOptions" />
  </div>
</template>

<script>
export default {
  props: {
    icon: String
  },
  computed: {
    iconOptions() {
      const icon = this.icon || 'dice'
      return ['fas', icon]
    }
  }
}
</script>

<style scoped>
.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  vertical-align: middle;
}
.icon.hoverable:hover {
  color: darkslateblue;
}
</style>