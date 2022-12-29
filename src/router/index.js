import TalkChoice from '@/views/TalkChoice.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/talk-choice',
      name: 'talkChoice',
      component: TalkChoice
    }
  ]
})

export default router
