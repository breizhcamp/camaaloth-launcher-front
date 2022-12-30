import axios from 'axios'
import { defineStore } from 'pinia'

export const useRecordStateStore = defineStore('recordState', {
  state: () => {
    return {
      step: '',
      currentTalk: undefined
    }
  },

  actions: {
    load() {
      axios.get('/state').then((res) => this.setCurrent(res.data))
    },

    patchStep(newStep) {
      return axios.patch('/state', { step: newStep })
    },

    setCurrent(recordState) {
      this.$patch(recordState)
    }
  }
})