<template>
  <div class="row" v-if="talk">
    <div class="col-sm-1">
      <button @click="$emit('back')" class="btn btn-info" :disabled="disabled"><i class="fas fa-arrow-left"></i></button>
    </div>
    <div class="col-sm-10 text-center">
      <h2>{{talk.talk}}</h2>
      <p class="text-muted font-italic">
				<span v-for="(speaker, idx) in talk.speakers" :key="speaker.name">
					<span v-if="idx > 0"> - </span>
					<span>{{speaker.name}}</span>
				</span>
      </p>
    </div>
    <div class="col-sm-1">
      <div class="text-muted font-italic font-90">
        <div v-if="startTime">
          <i class="far fa-play-circle"></i> {{startTime}}
        </div>
        <div v-if="endTime">
          <i class="far fa-stop-circle"></i> {{endTime}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'TalkHeader',
  props: ['talk', 'back', 'disabled'],
  emits: ['back'],

  computed: {
    startTime() {
      return this.talk.startTime && dayjs(this.talk.startTime).format('HH:mm')
    },

    endTime() {
      return this.talk.endTime && dayjs(this.talk.endTime).format('HH:mm')
    }
  }
}
</script>

<style scoped>

</style>