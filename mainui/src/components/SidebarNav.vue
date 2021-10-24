<template>
  <div :class="['sidebar-nav', stateClass]">
    <div class="sidebar-contents">
      <slot />
      <a v-if="expanded" v-on:click="collapse">
        <icon icon="angle-double-left" />
        <span>Collapse</span>
      </a>
      <a v-else v-on:click="expand">
        <icon icon="angle-double-right" />
        <span>Expand</span>
      </a>
    </div>
  </div>
</template>

<script>
import Icon from './ui/Icon.vue'

export default {
  data() {
    return {
      stateClass: 'expand'
    }
  },
  components: {
    Icon
  },
  computed: {
    expanded() {
      return this.stateClass === 'expand'
    }
  },
  methods: {
    expand() {
      this.stateClass = 'expand'
    },
    collapse() {
      this.stateClass = 'collapse'
    }
  }
}
</script>

<style>
.sidebar-nav {
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  background: #222;
  text-align: left;
  overflow: hidden;
}

.sidebar-nav.collapse {
  width: 45px;
  transition: width 250ms ease-in-out;
}

.sidebar-nav.expand {
  width: 200px;
  transition: width 250ms ease-in-out;
}

.sidebar-contents {
  width: 200px;
}

.sidebar-nav a {
  display: flex;
  justify-items: flex-end;
  align-items: flex-end;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px 10px 10px;
}

.sidebar-nav a.router-link-exact-active {
  background: #333;
  color: #42b983;
}

.sidebar-nav a:hover {
  background: #111;
  color: #62c993;
}
a {
  cursor: pointer;
}
a > span {
  margin-left: 11px;
  flex: 1 1;
}
</style>
