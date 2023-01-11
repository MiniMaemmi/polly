<template>
  <div class="questionComp">

   

<h3 style="margin:10vh; font: inter">{{answer.label}}</h3>
        <div v-if="question.url">
          <img :src="question.url">
        </div>        
      
<button :disabled="countdown === 0 || this.username ==='undefined'"
class="custom-btn"

 v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject" style="margin:5vh; font: 2em inter">
  {{answerObject.label}}                  
</button>
<div class="CountDown">
<div v-if="this.countdown >0">{{countdown}}</div>
 <div v-if="this.countdown ===0">
  <img src="../../img/clock.png">
</div>

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
    this.username=this.$route.params.username;
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
    background-color: #1CC970;
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
    font-family: inter;

  }
  .CountDown
  {
    font: 5vh inter;
  }
  .leaderDisable{
    
  }

</style>

