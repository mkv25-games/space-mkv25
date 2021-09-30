<template>
  <SidebarNav>
    <router-link to="/galaxy-view">
      <font-awesome-icon :icon="['fas', 'sun']" class="title-icon" />
      <span>Solar Systems</span>
    </router-link>
    <router-link to="/galaxy/history">
      <font-awesome-icon :icon="['fas', 'book-open']" class="title-icon" />
      <span>History</span>
    </router-link>
    <router-link to="/galaxy/known-lifeforms">
      <font-awesome-icon :icon="['fas', 'cat']" class="title-icon" />
      <span>Known Lifeforms</span>
    </router-link>
    <router-link to="/galaxy/diplomacy">
      <font-awesome-icon :icon="['fas', 'feather-alt']" class="title-icon" />
      <span>Diplomacy</span>
    </router-link>
    <router-link to="/galaxy/trade">
      <font-awesome-icon :icon="['fas', 'hands-helping']" class="title-icon" />
      <span>Trade</span>
    </router-link>
    <router-link to="/galaxy/statistics">
      <font-awesome-icon :icon="['fas', 'heartbeat']" class="title-icon" />
      <span>Statistics</span>
    </router-link>
    <router-link to="/galaxy/planets">
      <font-awesome-icon :icon="['fas', 'globe-europe']" class="title-icon" />
      <span>Planets</span>
    </router-link>
    <router-link to="/galaxy/outposts">
      <font-awesome-icon :icon="['fas', 'shield-alt']" class="title-icon" />
      <span>Outposts</span>
    </router-link>
    <router-link to="/galaxy/fleets">
      <font-awesome-icon :icon="['fas', 'sitemap']" class="title-icon" />
      <span>Fleets</span>
    </router-link>
    <router-link to="/galaxy/threats">
      <font-awesome-icon :icon="['fas', 'biohazard']" class="title-icon" />
      <span>Threats</span>
    </router-link>
    <router-link to="/galaxy/intelligence">
      <font-awesome-icon :icon="['fas', 'eye']" class="title-icon" />
      <span>Intelligence</span>
    </router-link>
    <router-link to="/galaxy/research">
      <font-awesome-icon :icon="['fas', 'flask']" class="title-icon" />
      <span>Research</span>
    </router-link>
  </SidebarNav>
</template>

<script>
import SidebarNav from './SidebarNav.vue'

export default {
  components: { SidebarNav }
}
</script>

<style scoped>
a span {
  margin-left: 0.5em;
}
</style>