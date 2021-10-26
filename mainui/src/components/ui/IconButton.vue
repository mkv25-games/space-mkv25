<template>
  <icon :icon="icon" class="button" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'sun',
    }
  }
}
</script>
