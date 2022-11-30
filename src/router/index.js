import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },
    {
    path: '/poll/:id/:username',
    name: 'PollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
  },
  {
    path: '/create/:lang',
    name: 'CreateView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },
  {
    path: '/result/:id',
    name: 'ResultView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
  },
  {
    path: '/connect/',
    name: 'ConnectView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConnectView.vue')
    // ska leda till pollView så smånignom. Är mellansteget
  },
  {
    path: '/waiting/:username',
    name: 'WaitingView',
    component: () => import(/* webpackChunkName: "about" */ '../views/WaitingView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
