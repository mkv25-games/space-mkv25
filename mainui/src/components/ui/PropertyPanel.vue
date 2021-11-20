<template>
  <div class="property-panel">
    <vertical-tile-grid :tiles="kvps" :columns="1" :rows="rows" :tileWidth="300" :tileHeight="30">
      <template v-slot:default="{ tile }">
        <property :label="tile.key" class="borderless">
          <span>{{ tile.value }}</span>
          <icon v-if="isColor(tile.value)" icon="square" :style="`color: ${tile.value}`" />
        </property>
      </template>
    </vertical-tile-grid>
  </div>
</template>

<script>
import flattenObject from '../../utils/flattenObject'

export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
    rows: {
      type: Number,
      default: 6
    }
  },
  computed: {
    flattened() {
      return flattenObject(this.item)
    },
    kvps() {
      return Object.entries(this.flattened).map(([key,value]) => {
        return { key, value }
      })
    }
  },
  methods: {
    isColor(str) {
      return (str + '').charAt(0) === '#'
    }
  }
}
</script>
