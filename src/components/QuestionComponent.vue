<template>
  <div class="questionComp">
<h3 style="margin:10vh">{{answer.label}}</h3>


    <!--<div class="imgDiv" style="margin:5vh" v-for="url in question" v-bind:key="url" >
      Scuffed lösning men-->
        <div v-if="question.url">
          <img :src="question.url">
        </div>        
      
      

  

<button 
class="custom-btn" 
:class="{ active: isActive }"

v-for="answerObject in question.answers" v-on:click="answer(answerObject),ChosenAnswer(this.answer)" v-bind:key="answerObject" style="margin:50px">
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
      //console.log("----i QuestionComponent----")
      //console.log("answer: ", answer)
      this.$emit("answer", answer);
    },
    checkUrl:function(url){
      console.log("checkurl")
      
      if (url.includes("blob")){
        //console.log("blob")
        return(true)
      }

    },
    ChosenAnswer: function(){
      console.log("changed answer")
      this.isActive=false
    }
  },
  data(){
    return {
    isActive: true,
    
  }
  }
}
</script>

<style scoped>
  @import '@/assets/css/style.css';

  .active{
    background-color: green;
    transition-duration: 0.4s;
  }

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

