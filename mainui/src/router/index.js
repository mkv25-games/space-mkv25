import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import routes from './routes.js'

const homeRoute = {
  path: '/',
  name: 'Home',
  component: Home
}

const allRoutes = [...routes, homeRoute]

 console.log('Routes:', allRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})

export default router
