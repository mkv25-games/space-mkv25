<template>
  <SidebarNav>
    <router-link to="/settings/home">
      <icon icon="object-group" />
      <span>Interface</span>
    </router-link>
    <router-link to="/settings/mods">
      <icon icon="puzzle-piece" />
      <span>Mods</span>
    </router-link>
    <router-link to="/settings/debug">
      <icon icon="cogs" />
      <span>Debug</span>
    </router-link>
    <router-link to="/settings/debug/component-tests">
      <icon icon="boxes" />
      <span>Component Tests</span>
    </router-link>
  </SidebarNav>
</template>

<script>
import SidebarNav from '../../../components/SidebarNav.vue'
import Icon from '../../../components/ui/Icon.vue'

export default {
  components: { SidebarNav, Icon }
}
</script>
