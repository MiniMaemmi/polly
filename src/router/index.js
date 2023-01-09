import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/:lang?',
    name: 'Start',
    component: StartView
  },
  
  {
    path: '/poll/:id/:lang/:username',
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
    path: '/result/:id/:lang/:username',
    name: 'ResultView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
  },

  {
    path: '/connect/:lang',
    name: 'ConnectView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConnectView.vue')
    // ska leda till pollView så smånignom. Är mellansteget
  },
  
  {
    path: '/waiting/:pollId/:lang',
    name: 'WaitingView',
    component: () => import(/* webpackChunkName: "about" */ '../views/WaitingView.vue')
  },

  {
    path: '/quizleaderStartView/:lang/:pollId/:quizName',
    name: 'quizleaderStartView',
    component: () => import(/* webpackChunkName: "about" */ '../views/quizleaderStartView.vue')
  },

  {
    path:'/poll/:pollID/:lang/:quizName',
    name:'quizleaderPollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/quizleaderPollView.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
