<template>
  <SidebarNav>
    <router-link to="/galaxy-view">
      <icon icon="sun" />
      <span>Solar Systems</span>
    </router-link>
    <router-link to="/galaxy/history">
      <icon icon="book-open" />
      <span>History</span>
    </router-link>
    <router-link to="/galaxy/known-lifeforms">
      <icon icon="cat" />
      <span>Known Lifeforms</span>
    </router-link>
    <router-link to="/galaxy/diplomacy">
      <icon icon="feather-alt" />
      <span>Diplomacy</span>
    </router-link>
    <router-link to="/galaxy/trade">
      <icon icon="hands-helping" />
      <span>Trade</span>
    </router-link>
    <router-link to="/galaxy/statistics">
      <icon icon="heartbeat" />
      <span>Statistics</span>
    </router-link>
    <router-link to="/galaxy/planets">
      <icon icon="globe-europe" />
      <span>Planets</span>
    </router-link>
    <router-link to="/galaxy/outposts">
      <icon icon="shield-alt" />
      <span>Outposts</span>
    </router-link>
    <router-link to="/galaxy/fleets">
      <icon icon="sitemap" />
      <span>Fleets</span>
    </router-link>
    <router-link to="/galaxy/threats">
      <icon icon="biohazard" />
      <span>Threats</span>
    </router-link>
    <router-link to="/galaxy/intelligence">
      <icon icon="eye" />
      <span>Intelligence</span>
    </router-link>
    <router-link to="/galaxy/research">
      <icon icon="flask" />
      <span>Research</span>
    </router-link>
  </SidebarNav>
</template>

<script>
import SidebarNav from './SidebarNav.vue'
import Icon from './ui/Icon.vue'

export default {
  components: { SidebarNav, Icon }
}
</script>
