<template>
  <div class="questionComp">

   

<h3 style="margin:10vh">{{answer.label}}</h3>
        <div v-if="question.url">
          <img :src="question.url">
        </div>        
      
<button :disabled="countdown === 0"
class="custom-btn" v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject" style="margin:5vh; font-size: 1vh">
  {{answerObject.label}}                  
</button>
<div class="CountDown">
  {{countdown}}
 
  
  

</div>


</div>
</template>
<script>

export default {
  name: 'QuestionComponent',
  props: {
    question: Object,
  },
  data: function() {
    return {
      countdown: 0,
    }

  },

  created: function () {
    this.countdown = 11;
    //console.log("new question")

    this.updateCountdown()

    /*socket.on("resetTimer",() => {
      console.log("-----i QuestionComponent resetTimer()----")
      this.updateCountdown()
    })*/

  }, 
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    },

    resetCountdown() {
      console.log("------i QuestionComponent resetCountDown()-----")
      this.countdown = 10;
      this.updateCountdown()

    },

    //nedräkningsfunktion
    updateCountdown(){
        this.countdown--;
        if (this.countdown > 0) {
            setTimeout(this.updateCountdown,1000);
        }

        if (this.countdown === -1) {
          this.countdown = 10;
          setTimeout(this.updateCountdown,1000);
        }  


    },
   
  }

}
</script>

<style scoped>
  @import '@/assets/css/style.css';

  .custom-btn:focus{
    background-color: green;
    transition-duration: 0.4s;
  }
  

  img{
    max-height: 50vh;
    max-width: 50vh;
  }

  .questionImage {
    background-color: white;
    border: 0.1px solid grey;

  }

  .questionComp button {
    justify-content: space-evenly;
    margin: 10%;

  }
  .CountDown
  {
    font-size:5vh
  }

</style>

