<template>
  <div class="questionComp">
    <!--
    <h3 style="margin:10vh">{{answer.label}}</h3>
    <div v-for="answerObject in question.questions" v-bind:key="answerObject"> 
      {{answerObject}}
      {{question}}
      {{question.questions}}
      <div>Picture:
        <img v-if="question.url" :src="answerObject.image" >
      </div>
      
    </div>
    <div style="margin:25px" v-for="url in question" v-bind:key="url">
          Question: {{question}}
          BILD: <img v-if="question.url!== null" :src="url" >
    </div>-->
      <div class="wrapper" style="margin-top:20%">
        <div class="contentArea">
          <img class="questionImage" v-if="question.url" :src="question.url">
        </div>
      </div>
      <button class="custom-btn" v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject">
      {{answerObject.label}}                  
      </button>
  </div>
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

  img{
    max-height: 80vh;
    max-width: 80vh;
  }

  .questionImage {
    background-color: white;
    border: 0.1px solid grey;

  }

  .questionComp button {
    justify-content: space-evenly;
    margin: 10%;

  }

</style>

