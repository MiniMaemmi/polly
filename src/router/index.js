import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
//På något sätt måste vi kunna ta in språkvalet

const routes = [
  {
    //path '/'Start/:lang',
    //fungerar om man skriver http://localhost:8080/#/en *--- 
    path: '/:lang?',
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
    path: '/result/:id/:lang',
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
    path: '/waiting/:id',
    name: 'WaitingView',
    component: () => import(/* webpackChunkName: "about" */ '../views/WaitingView.vue')
  },

  {
    path: '/quizleaderStartView/:lang/:pollId/:quizName',
    name: 'quizleaderStartView',
    component: () => import(/* webpackChunkName: "about" */ '../views/quizleaderStartView.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
