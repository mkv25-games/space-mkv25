<template>
  <div class="galaxy-view">
    <SidebarNav>
      <router-link to="/galaxy/solar-systems">
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
    <div class="frame">
      <h1>Galaxy</h1>

      <h2>{{ contact.name }}</h2>
      <pre>{{ contact.lastUpdated }}</pre>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact.js'
import SidebarNav from '@/components/SidebarNav.vue'

export default {
  components: { SidebarNav },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    }
  }
}
</script>

<style scoped>
.galaxy-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
}
a span {
  margin-left: 0.5em;
}

</style>