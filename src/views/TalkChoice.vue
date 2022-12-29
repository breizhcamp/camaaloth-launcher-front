<template>
  <stepper :step="1"/>

  <div class="row">
    <div class="col-sm jumbotron jumbo-light">
      <p class="text-center">
        Veuillez brancher une clé usb <i class="fab fa-usb"></i> contenant au moins un fichier xxx.<strong>ug.zip</strong>
        et sélectionnez le talk voulu.
      </p>
    </div>
  </div>


  <div class="cards">
    <div class="row" v-for="i in Math.ceil(files.length / 4)">
      <div class="col-sm-3" v-for="(f, idx) in files.slice((i - 1) * 4, i * 4)">
        <div class="card">
          <div v-if="f.talk">
            <div class="logo">
              <img :src="'data:image/jpeg;base64,' + f.talk.logo" :alt="f.talk.name" v-if="f.talk.logo">
            </div>
            <div class="card-body">
              <h5 class="card-title" v-if="!f.talk.logo">{{f.talk.name}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{f.talk.date}}</h6>
              <p class="card-text">{{f.talk.talk}}</p>

              <ul class="list-unstyled">
                <li v-for="speaker in f.talk.speakers">{{speaker.name}}</li>
              </ul>

              <button @click="select(f)" class="btn btn-primary" :disabled="loading">
                Filmer ce talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import Stepper from '@/components/Stepper.vue'
import axios from 'axios'
import {reactive} from 'vue'

export default {
  name: 'TalkChoice',
  components: {Stepper},

  data() {
    return {
      files: [],
      loading: false,
      timeout: null,
    }
  },

  created() {
    this.loadFiles()
  },

  unmounted() {
    if (this.timeout) clearTimeout(this.timeout)
  },

  methods: {
    loadFiles() {
      this.timeout = null

      axios.get('/files').then(res => {
        this.files = this.updateOnlyNewFiles(this.files, reactive(res.data), this.updateFile)
        this.timeout = setTimeout(() => this.loadFiles(), 1000)
      })
    },

    select(file) {
      this.loading = true
      axios.patch('/files/talk', { path: file.path, name: file.name })
          .then(() => this.$router.push('/record'))
          .finally(() => this.loading = false)
    },

    updateFile(file, newFile) {
      if (newFile) {
        file.lastModified = newFile.lastModified
      }

      axios.get('/files/talk', { params: { file: file.path + '/' + file.name }}).then(res => {
        file.talk = res.data
      })
    },

    updateOnlyNewFiles(existingFiles, newFiles, updateFct) {
      //update existing files
      for (let file of existingFiles) {
        let newFile = newFiles.find(f => f.name === file.name && f.path === file.path);

        if (newFile) {
          newFile.processed = true
          if (file.lastModified !== newFile.lastModified) {
            updateFct(file, newFile)
          }

        } else {
          file.delete = true
        }
      }

      //remove file
      existingFiles = existingFiles.filter(f => !f.delete)

      //add new files
      newFiles.filter(f => !f.processed).forEach(f => {
        existingFiles.push(f)
        updateFct(f)
      })

      return existingFiles
    }
  }
}
</script>

<style scoped>
.cards li {
  font-style: italic;
}

.logo {
  margin-top: 10px;
  text-align: center;
}

.logo img {
  max-height: 120px;
}

.cards .card-text {
  font-weight: bold;
}

.cards .card-subtitle {
  font-size: 80%;
}
</style>