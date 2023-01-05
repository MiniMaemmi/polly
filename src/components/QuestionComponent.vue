<template>
  <body>
<h3>{{answer.label}}</h3>
<div v-for="answerObject in question.questions" v-bind:key="answerObject"> 
  
  <div>Picture:

    <img v-if="question.url" :src="answerObject.image" >
  

  </div>
</div>
<div v-for="url in question" v-bind:key="url">
                    <img v-if="question.url" :src="url" >

                  </div>

<button class="custom-btn" v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject" style="margin:50px">
  {{answerObject.label}}
  {{answerObject.image}}


                  
</button>
</body>
</template>
<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      console.log("----i QuestionComponent----")
      console.log("answer: ", answer)
      this.$emit("answer", answer);
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/style.css';
  body{
    display:grid 1fr 1fr 1fr
  }

</style>

