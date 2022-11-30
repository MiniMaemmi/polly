<template>
  <div>
    <div id="Quizzname">
    Poll ID: 
    <input type="text" v-model="pollId">
    
    </div>

    <div id="questionAnswer">
      {{uiLabels.question}}:
      <input type="text" v-model="question">
      Question number:
      <input type="number" v-model="questionNumber">
      <br />      
      
      
      
      <div class="ANSWER">
        Answers:
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i">
        <button v-on:click="addAnswer">
          Add answer alternative
        </button>

        <button v-on:click="removeAnswer">
          Remove an answer alternative
        </button>


      </div>

    </div>

    <div id="addQuestion">
    <button v-on:click="addQuestion">
      Add question
    </button>
    <br />
  </div>
    
    <button v-on:click="createPoll">
      Create/Save Quizz
    </button>
    
    <button v-on:click="runQuestion">
      Start quizz
    </button>
    <br />
    {{data}}
    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>

  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },
    addAnswer: function () {
      this.answers.push("");
    },
    //Den här skall vid tillfälle skrivas om så att den funkar för att ta bort ett specifikt svar.
    removeAnswer: function(){
      if (this.answers.length > 1){
        this.answers.pop("");
        console.log("jag pop")
      }
      else {
        console.log("nejnej aja baja")
      }

    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>



<style>


/* # för id . för klass */
#Quizzname
{
  color:green;
  

}
#OverallStructure
{


}
#questionAnswer{
  margin:30px;
}
.ANSWER{
  margin:30px;
}
#addQuestion{
  margin:30px;
}





</style>