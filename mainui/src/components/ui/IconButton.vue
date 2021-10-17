<template>
  <icon :icon="icon" class="button" />
</template>

<script>
import Icon from './Icon.vue'
export default {
  components: {
    Icon
  },
  props: {
    icon: {
      type: String,
      default: 'sun',
    }
  }
}
</script>
