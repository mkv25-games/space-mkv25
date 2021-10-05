<template>
  <div class="column-layout">
    <div class="column left">
      <slot name="left"></slot>
    </div>
    <div class="column right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.column-layout {
  display: flex;
}
.column.left {
  flex: 1 1;
}
.column.right {
  flex: 1 1;
}
.fixed-width-right > .column.right {
  flex: auto;
  min-width: 400px;
  max-width: 400px;
  border-left: 2px solid #999;
  margin-left: -2px;
}
</style>