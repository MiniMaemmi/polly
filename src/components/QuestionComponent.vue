<template>
  <div class="questionComp">

    {{countdown}}

    {{username}}
<h3 style="margin:10vh">{{answer.label}}</h3>
        <div v-if="question.url">
          <img :src="question.url">
        </div>        
      
<button :disabled="countdown === 0"
class="custom-btn" v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject" style="margin:50px">
  {{answerObject.label}}                  
</button>

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
    this.countdown = 10;
    console.log("new question")

    this.updateCountdown()

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

    //nedräkningsfunktion
    updateCountdown(){
        
        this.countdown--;
        if (this.countdown > 0) {
            setTimeout(this.updateCountdown,1000);
            
        } else {
            //this.showButton = true;
            // visa rätt svar
            console.log("Time is up, emitta här")
            
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

