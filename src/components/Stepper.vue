<template>
  <div class="stepwizard row">
    <div class="col">
      <router-link to="/talk-choice" class="btn btn-circle" :class="{'btn-primary': step === 1, 'btn-info': step !== 1}">1</router-link>
      <p>Talk</p>
    </div>
    <div class="col">
      <router-link to="/record" class="btn btn-circle" :class="{'btn-primary': step === 2, 'btn-info': step !== 2}">2</router-link>
      <p>Record</p>
    </div>
    <div class="col">
      <router-link to="/export" class="btn btn-circle" :class="{'btn-primary': step === 3, 'btn-info': step !== 3}">3</router-link>
      <p>Export</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  props: {
    step: Number
  }
}
</script>

<style scoped>
.stepwizard {
  margin-bottom: 5px;
}

.stepwizard:before {
  top: 16px;
  position: relative;
  content: " ";
  width: 100%;
  height: 1px;
  background-color: #ccc;
  z-index: -1;
}
.stepwizard p {
  margin: 3px 0 0 0;
}
.stepwizard .col {
  text-align: center;
}
.stepwizard .btn-circle {
  width: 31px;
  height: 31px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
</style>