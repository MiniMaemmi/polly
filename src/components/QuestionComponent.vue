<template>
  <div class="questionComp">

   

<h3 style="margin:10vh; font: inter">{{answer.label}}</h3>
        <div v-if="question.url">
          <img :src="question.url" style>
        </div>        
      
<button :disabled="countdown === 0 || this.username ==='undefined'"
class="custom-btn"

 v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject" >
  {{answerObject.label}}                  
</button>
<div class="CountDown">
<div style="margin:3vh" v-if="this.countdown >0">{{countdown}}</div>
 <div v-if="this.countdown ===0">
  <img class="clockImage" src="../../img/clock.png">
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
  
 
  .custom-btn{
    /*margin:5vh; */
    font: 1em inter;
    overflow-wrap:break-word;
    

  }
  @media screen and (max-width: 1000px){
    .custom-btn{
      font: 0.7em inter;
      
      
  }
  

  }
  @media screen and (max-width: 700px){
    .custom-btn{
      font-size: 0.5em;
      
      
  }
  
  

  }


  .custom-btn:focus{
    background-color: #1CC970;
    transition-duration: 0.4s;
    
  }
  

  img{
    max-height: 25vh;
    max-width: 25vh;

  }
  .clockImage{
    max-height:10vh;
    max-width:10vh;
  }


  .questionComp{
    max-height: 70vh;
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
  

</style>

