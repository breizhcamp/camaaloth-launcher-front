<template>
  <stepper :step="2"/>
  <talk-header :talk="currentTalk" @back="patchStep('CHOICE')" :disabled="step !== 'RECORD'" />

  <div class="alert alert-warning d-flex align-items-center justify-content-center" v-if="step !== 'RECORD'">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
    </svg>
    <div class="ms-2">
      L'enregistrement est en cours de préparation, merci de patientez avant de lancer celui-ci
    </div>
  </div>

  <div class="alert alert-info d-flex align-items-center justify-content-center" v-if="step === 'RECORD'">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
    </svg>
    <div class="ms-2">
      Tout est prêt, vous pouvez lancer l'enregistrement
    </div>
  </div>

  <div class="row mb-3" v-if="log.length > 0 && step !== 'RECORD'">
    <div class="col-sm-12">
				<pre class="pre-scrollable stdlog" ref="logPre">
{{log.join('\n')}}
				</pre>
    </div>
  </div>

</template>

<script>
import Stepper from '@/components/Stepper.vue'
import TalkHeader from '@/components/TalkHeader.vue'
import {useRecordStateStore} from '@/stores/recordState'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'TalkRecord',
  components: {TalkHeader, Stepper },

  data() {
    return {
      log: []
    }
  },

  mounted() {
    this.$socket.on('prepare', (msg) => this.addLog(msg))
  },

  unmounted() {
    this.$socket.off('prepare')
  },

  computed: {
    ...mapState(useRecordStateStore, ['currentTalk', 'step'])
  },

  methods: {
    ...mapActions(useRecordStateStore, ['patchStep']),

    addLog(msg) {
      this.log.push(msg)

      //limit number of lines
      if (this.log.length > 100) {
        this.log.splice(0, this.log.length - 100)
      }

      //scroll log at bottom
      let log = this.$refs.logPre;
      if (log) log.scrollTop = log.scrollHeight;
    }
  },
}
</script>

<style scoped>

</style>