<!-- Kopplat till pollvyn som deltagare ser -->

<template>
  <div>
    PollID: {{pollId}}
    <br />
    Username: {{username}}
    <br />
    <br />

    {{question}}
    Question:
    <QuestionComponent v-bind:question="question"
              v-on:answer="submitAnswer($event)"/>

              <span>{{submittedAnswers}}</span>
              <br />
              <br />
    <!-- <button v-on:click="updateData">Update data button </button>   -->        

  </div>
      <button  
      @click="navigate"
      role="link"
      >
      {{ uiLabels.showResults }}
    </button>
</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();
//const appDivId = 'app'

export default {
  name: 'PollView',
  components: {
    QuestionComponent
  },
  data: function () {
    return {
      uiLabels: {},
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      submittedAnswers: {},
      username: ""
      //username: document.getElementById(appDivId).__vue__,

      //answers = [ {user: this.username, question: this.question.q, answer: this.question.a}]
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.username
    console.log("------ in PollView created function ------ ")
    console.log("username in pollview created func: ", this.username)
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("dataUpdate", data  =>
      this.submittedAnswers = data.answers,

      //egenskrivet
      //this.username = data.username
      
    )

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    
    //egenskrivet
    socket.on("createdUser", username => 
      this.username = username
    )
  },
  methods: {

    //egenskriven
    submitAnswer: function (answer) {
      console.log("------in PollView submitAnswer() -----")
      //console.log("Question?: ", this.question.q)
      socket.emit("submitAnswer", {pollId: this.pollId, question: this.question.q, answer: answer, username: this.username})
    },



    //mikaels orginal
    /*submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },*/

    navigate: function() {
      this.$router.push("'/result/'+'/'+this.pollId+'/'+lang")
    },




    updateData: function () {
      console.log("----- i pollView updateData() ------")
      console.log("username: ", this. username)
      console.log("pollID: ", this.pollId)

      socket.emit('dataUpdate', {pollId: this.pollId, username: this.username} )


    }
  }
}
</script>
