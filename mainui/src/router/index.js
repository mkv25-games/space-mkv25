import { createRouter, createWebHashHistory } from 'vue-router'
import Debug from '../views/Debug.vue'
import Designer from '../views/Designer.vue'
import EstablishContact from '../views/EstablishContact.vue'
import GalaxyView from '../views/GalaxyView.vue'
import Home from '../views/Home.vue'
import LocationView from '../views/LocationView.vue'
import SaveGameManagement from '../views/SaveGameManagement.vue'
import Settings from '../views/Settings.vue'
import SystemView from '../views/SystemView.vue'
import Template from '../views/Template.vue'
import Universe from '../views/Universe.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/debug',
  name: 'Debug Tools',
  component: Debug
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
  path: '/save-game-management',
  name: 'Save Game Management',
  component: SaveGameManagement
}, {
  path: '/settings',
  name: 'Settings',
  component: Settings
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
