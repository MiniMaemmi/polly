<template>
<div class="fileComponentWrapper" v-bind:key="question">

  QuestionObject:
  {{questionObject}}

  <div id="app">
      <input id="fileinput" type="file" @change="onFileChange"/>
      <div id="preview">
        <img v-if="question.url" :src="url" />
      </div>
  </div>

</div>
</template>
<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },

  data() {
    return {
      questionObject: this.question,
    }
    
  },
    methods: { 
    onFileChange(e) {
      const file = e.target.files[0];
      this.questionObject.url  = URL.createObjectURL(file);
      this.$emit("questionObjectWithUrl", this.questionObject);




    },
  }
}
</script>

<style scoped>
  @import '@/assets/css/style.css';

.fileComponentWrapper {
  height: 50vh;
  width: 20vw;
  background-color: yellow;
}

</style>