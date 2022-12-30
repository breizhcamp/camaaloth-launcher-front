<template>
  <stepper :step="2"/>
  <talk-header :talk="currentTalk" @back="patchStep('CHOICE')" />
</template>

<script>
import Stepper from '@/components/Stepper.vue'
import TalkHeader from '@/components/TalkHeader.vue'
import {useRecordStateStore} from '@/stores/recordState'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'TalkRecord',
  components: {TalkHeader, Stepper },
  computed: {
    ...mapState(useRecordStateStore, ['currentTalk'])
  },

  methods: {
    ...mapActions(useRecordStateStore, ['patchStep'])
  }
}
</script>

<style scoped>

</style>