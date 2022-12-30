import {useRecordStateStore} from '@/stores/recordState'
import io from 'socket.io-client'

export default {
  install: (app) => {
    const socket = io()
    app.config.globalProperties.$socket = socket

    const recordStateStore = useRecordStateStore()
    socket.on('state', (recordState) => recordStateStore.setCurrent(recordState))
  }
}