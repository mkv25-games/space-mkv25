<template>
  <SidebarNav>
    <router-link to="/omniscience/home">
      <icon icon="dot-circle" />
      <span>Omniscience</span>
    </router-link>
    <router-link to="/omniscience/regions">
      <icon icon="border-all" />
      <span>Regions</span>
    </router-link>
    <router-link to="/omniscience/systems">
      <icon icon="circle" />
      <span>Systems</span>
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
