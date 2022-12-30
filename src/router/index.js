import {useRecordStateStore} from '@/stores/recordState'
import TalkChoice from '@/views/TalkChoice.vue'
import TalkRecord from '@/views/TalkRecord.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

let routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { step: 'HOME' },
  },
  {
    path: '/talk-choice',
    name: 'talkChoice',
    component: TalkChoice,
    meta: { step: 'CHOICE' },
  },
  {
    path: '/record',
    name: 'talkRecord',
    component: TalkRecord,
    meta: { steps: ['SELECTED', 'PREPARE', 'RECORD'] },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const initStateWatch = () => {
  const recordStateStore = useRecordStateStore()
  recordStateStore.$subscribe((mutation, state) => {
    const step = state.step
    const route = routes.find((r) => r.meta.step === step || r.meta.steps && r.meta.steps.indexOf(step) !== -1)

    if (route.name !== router.currentRoute.value.name) {
      router.replace({ name: route.name })
    }
  })
}

router.isReady().then(() => initStateWatch())

export default router