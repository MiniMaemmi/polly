<!-- Kopplat till pollvyn som deltagare ser -->

<template>
  <div>
    PollID: {{pollId}}
    <br />
    Username: {{username}}
    <br />
    <br />

    Poll:
    {{poll}}
    <br />
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

    <button @click="getQuestionFromArray">
      Show poll
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
      username: "",
      poll: {},
      //pollLength: this.getQuestionFromArray(this.poll),
      pollLength: 0,
      pollQuestionIterator:0,


      //username: document.getElementById(appDivId).__vue__,

      //answers = [ {user: this.username, question: this.question.q, answer: this.question.a}]
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.username
    console.log("------ in PollView created function ------ ")
    console.log("username in pollview created func: ", this.username)

    //socket.emit('joinPoll', this.pollId)
    socket.emit('getPoll', this.pollId)
    socket.on('sendQuestion', poll => 
    {
      this.poll = poll
      this.pollLength = this.poll.questions.length
      }
    )



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

    getQuestionFromArray: function() {
      console.log("this.poll.questions.length:", this.poll.questions.length)


    },
/*getQuestionFromArray: function(poll) {
      console.log("this.poll.questions.length:", this.poll.questions.length)
      if (poll === {}){
        this.pollLength=0

      }
      else {
        this.pollLength = this.poll.questions.length

      }


    },*/

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
