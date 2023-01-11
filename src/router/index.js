import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/:lang?',
    name: 'Start',
    component: StartView
  },
  
  {
    path: '/poll/:id/:lang/:quizName/:username',
    name: 'PollView',
    component: () => import('../views/PollView.vue')
  },

  {
    path: '/create/:lang',
    name: 'CreateView',
    component: () => import('../views/CreateView.vue')
  },

  {
    path: '/result/:id/:lang/:username',
    name: 'ResultView',
    component: () => import('../views/ResultView.vue')
  },

  {
    path: '/connect/:lang',
    name: 'ConnectView',
    component: () => import('../views/ConnectView.vue')
  },
  
  {
    path: '/waiting/:pollId/:lang/:username',
    name: 'WaitingView',
    component: () => import('../views/WaitingView.vue')
  },

  {
    path: '/quizleaderStartView/:lang/:pollId/:quizName',
    name: 'quizleaderStartView',
    component: () => import('../views/QuizleaderStartView.vue')
  },

  {
    path: '/EmptyQuizView/:lang/:pollId/:quizName',
    name: 'EmptyQuizView',
    component: () => import('../views/EmptyQuizView.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
