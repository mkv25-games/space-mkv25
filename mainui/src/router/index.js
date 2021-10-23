import { createRouter, createWebHashHistory } from 'vue-router'
import Designer from '../views/Designer.vue'
import EstablishContact from '../views/EstablishContact.vue'
import GalaxyView from '../views/GalaxyView.vue'
import Home from '../views/Home.vue'
import LocationView from '../views/LocationView.vue'
import ContactManagement from '../views/ContactManagement.vue'
import SystemView from '../views/SystemView.vue'
import Template from '../views/Template.vue'
import Universe from '../views/Universe.vue'

import Diplomacy from '../views/galaxy/Diplomacy.vue'
import Fleets from '../views/galaxy/Fleets.vue'
import History from '../views/galaxy/History.vue'
import Intelligence from '../views/galaxy/Intelligence.vue'
import KnownLifeforms from '../views/galaxy/KnownLifeforms.vue'
import Outposts from '../views/galaxy/Outposts.vue'
import Planets from '../views/galaxy/Planets.vue'
import Research from '../views/galaxy/Research.vue'
import Statistics from '../views/galaxy/Statistics.vue'
import Threats from '../views/galaxy/Threats.vue'
import Trade from '../views/galaxy/Trade.vue'

import Omniscience from '../views/omniscience/Omniscience.vue'
import Regions from '../views/omniscience/Regions.vue'
import Systems from '../views/omniscience/Systems.vue'

import Settings from '../views/settings/Settings.vue'
import Mods from '../views/settings/Mods.vue'
import Debug from '../views/settings/debug/Debug.vue'
import ComponentTests from '../views/settings/debug/ComponentTests.vue'

const primaryRoutes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/designer',
  name: 'Designer',
  component: Designer
}, {
  path: '/establish-contact',
  name: 'Establish Contact',
  component: EstablishContact
}, {
  path: '/galaxy-view',
  name: 'Galaxy View',
  component: GalaxyView
}, {
  path: '/location-view',
  name: 'Location View',
  component: LocationView
}, {
  path: '/contact-management',
  name: 'Contact Management',
  component: ContactManagement
}, {
  path: '/system-view',
  name: 'System View',
  component: SystemView
}, {
  path: '/template',
  name: 'Template',
  component: Template
}, {
  path: '/universe',
  name: 'Universe',
  component: Universe
}]

const galaxyRoutes = [{
  path: '/galaxy/diplomacy',
  name: 'Diplomacy',
  component: Diplomacy
}, {
  path: '/galaxy/fleets',
  name: 'Fleets',
  component: Fleets
}, {
  path: '/galaxy/history',
  name: 'History',
  component: History
}, {
  path: '/galaxy/intelligence',
  name: 'Intelligence',
  component: Intelligence
}, {
  path: '/galaxy/known-lifeforms',
  name: 'Known Lifeforms',
  component: KnownLifeforms
}, {
  path: '/galaxy/outposts',
  name: 'Outposts',
  component: Outposts
}, {
  path: '/galaxy/planets',
  name: 'Planets',
  component: Planets
}, {
  path: '/galaxy/research',
  name: 'Research',
  component: Research
}, {
  path: '/galaxy/statistics',
  name: 'Statistics',
  component: Statistics
}, {
  path: '/galaxy/threats',
  name: 'Threats',
  component: Threats
}, {
  path: '/galaxy/trade',
  name: 'Trade',
  component: Trade
}]

const omniscienceRoutes = [{
  path: '/omniscience/home',
  name: 'Omniscience',
  component: Omniscience
}, {
  path: '/omniscience/regions',
  name: 'Regions',
  component: Regions
}, {
  path: '/omniscience/systems',
  name: 'Systems',
  component: Systems
}]

const settingsRoutes = [{
  path: '/settings/home',
  name: 'Settings',
  component: Settings
}, {
  path: '/settings/mods',
  name: 'Mods',
  component: Mods
}, {
  path: '/settings/debug',
  name: 'Debug Tools',
  component: Debug
}, {
  path: '/settings/debug/component-tests',
  name: 'Component Tests',
  component: ComponentTests
}]

const routes = [].concat(primaryRoutes, galaxyRoutes, omniscienceRoutes, settingsRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
