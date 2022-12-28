<!-- Kopplat till pollvyn som deltagare ser -->

<template>
  <div>
    PollID: {{pollId}}
    <br />
    Username: {{username}}
    <br />
    <br />


    Question:
    <QuestionComponent v-bind:question="questionObject"
              v-on:answer="logUserAnswer($event)"/>
              <!--
              v-on:answer="submitAnswer($event)"/>
              <br />
              Submitted Answers:
              <span>{{submittedAnswers}}</span>-->
              <!-- <br />
              <br />-->
    <!-- <button v-on:click="updateData">Update data button </button>   -->        
    <br />
    <br />
    Answers given:
    {{userObject.answers}}
    <br />
  </div>
    

    <button v-if="this.lastQuestionReached===false" @click="getQuestionFromArray()">
      Nästa fråga
    </button>
    <!--<button v-else> 
      {{uiLabels.showResults}}
    </button>-->
    <router-link
      v-bind:to="'/result/'+this.pollId+ '/' + lang"
      custom
      v-slot="{ navigate }" v-else>
      <button @click="submitAnswer();navigate()" role="link">
        {{uiLabels.showResults}}
      </button>
    </router-link>
    <!--<button @click="submitAnswer">
      Submit Answer
    </button>-->
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

      questionObject: {},
      
      pollId: "inactive poll",
      submittedAnswers: {},
      username: "",
      poll: {},
      //pollLength: this.getQuestionFromArray(this.poll),
      pollLength: 0,
      pollQuestionIterator:0,
      lastQuestionReached: false,
      userObject: 
                {
                    username: '',
                    totalScore: 0,
                    answers: [
                        /* { questionID: 0, answerId: 0, score: 0}*/
                    ],
                },
      AllPollParticipants: [],
              
            



      //username: document.getElementById(appDivId).__vue__,

      //answers = [ {user: this.username, question: this.question.q, answer: this.question.a}]
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.username
    console.log("------ in PollView created function ------ ")
    console.log("username in pollview created func: ", this.username)
    this.userObject.username = this.username

    //socket.emit('joinPoll', this.pollId)
    socket.emit('getPoll', this.pollId)
    socket.on('sendQuestion', poll => 
    {
      this.poll = poll
      this.pollLength = this.poll.questions.length
      this.getQuestionFromArray()
      }
    )



    socket.on("newQuestion", q =>
      this.question = q
    )

    socket.on("dataUpdate", data  => {
      console.log("pollview dataupdate")
      //Vi har märkt att denna ej funkar men den behövs också inte
      this.submittedAnswers = data.answers

    }
      
      //egenskrivet
      //this.username = data.username
      
    )

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    
    //egenskrivet
    socket.on("createdUser", username => 
    {
      this.username = username
      this.userObject.username = username
      console.log("------- i PollView createdUser() --------")
      console.log("this.userObject ", this.userObject)
    }
      
    )
  },


  methods: {
    //denna bör nog egentligen vara på resultView, så att vi där tar in alla pollParticipants och räknar fram resultatet på created-delen av ResultView
  

    getQuestionFromArray: function() {
      let questionObject = this.poll.questions[this.pollQuestionIterator]
      console.log("-----i getQuestionFromArray()----")
      if (typeof questionObject !== 'undefined') {
        this.questionObject = questionObject
        
        this.question.q = questionObject.label
        this.question.a = []
        questionObject.answers.forEach(answer => {
            this.question.a.push(answer.label);
        })
        this.pollQuestionIterator += 1

      }
      else if (typeof questionObject === 'undefined'){
        //Delete "Next fråga button"
        this.lastQuestionReached = true
      }
      
    },

//gammal
/*
    getQuestionFromArray: function() {
      let questionObject = this.poll.questions[this.pollQuestionIterator]
      this.question.q = questionObject.label
      this.question.a = []
      questionObject.answers.forEach(answer => {
          this.question.a.push(answer.label);
      })
      this.pollQuestionIterator += 1
    },*/



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
    /*
    submitAnswer: function (answer) {
      console.log("------in PollView submitAnswer() -----")
      //console.log("Question?: ", this.question.q)
      socket.emit("submitAnswer", {pollId: this.pollId, question: this.question.q, answer: answer, username: this.username})
    },*/



    //mikaels orginal
  /*
    submitAnswer: function (answer) {
      console.log("i PollView submitAnswer där answer är: ", answer)
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },*/

    submitAnswer: function () {
      console.log("------i PollView submitAnswer------")
      //socket.emit("submitAnswer", {pollId: this.pollId, questionId: this.userObject.answers.questionID )

      //let lastAnswerGiven = this.userObject.answers[this.userObject.answers.length - 1]  
      //console.log("lastElementOfArray: ", lastAnswerGiven)
      //min tanke är att skicka hela userobjektet, så att vi sparar det i data och sedan kan loopa igenom det
      //en idé är att också skicka vid varje svar, så att quizleaderview vet att 18/20 har svarat på den frågan. Detta kan göras från QuestionComponent
      console.log("answer submitted:", {pollId: this.pollId, userObject: this.userObject})
      socket.emit("submitAnswer", {pollId: this.pollId, userObject: this.userObject} )
    },

    //egenskriven
    logUserAnswer: function (answer) {
      console.log("----i PollView logUserAnswer---- ")
      let questionAnswered  = false
      questionAnswered = this.checkIfQuestionIsAnswered(this.questionObject.id)
      
      if (questionAnswered===false) {
        this.userObject.answers.push({ questionID: this.questionObject.id, answerId: answer.id, score: 0})
        console.log("Answer added")

      }
      else if (questionAnswered===true){
        console.log("Question & answer has already been added, replacing")
        //här borde man ha så att man kollar om det är samma svar som redan blivit tillagt. Hade varit
        //mer effektivt än att bara replace:a oavsett
        let indexToReplace = this.replacePreviousAnswerOnQuestion(this.questionObject.id)
        this.userObject.answers[indexToReplace] = {questionID: this.questionObject.id, answerId: answer.id, score: 0}
      }
      
      else {
        console.log("Error in adding answer")
      }
    },

    checkIfQuestionIsAnswered: function (questionId) {
      for (let answerObject of this.userObject.answers) {
        if (answerObject.questionID === questionId) {
          return true
        }
      }
      return false
    },

    replacePreviousAnswerOnQuestion: function (questionId ) {
      let i = 0
      for (let answerObject of this.userObject.answers) {
        if (answerObject.questionID === questionId) {
          return i
        }
        i += 1
      }
    },

    /*

    checkIfQuestionIsAnswered: function (answerId) {
      console.log("---- i checkIfQuestionIsAnswered() -----")
      console.log("answerId", answerId)

      this.userObject.answers.forEach(answerObject => {
        if (answerObject.answerId === answerId) {
          console.log("i for-loop i if")
          //return questionAnswered 
          return true
        }
        else {
          console.log("continue to loop")
        }
      })
    },

    navigate: function() {
      this.$router.push("'/result/'+'/'+this.pollId+'/'+lang")
    },*/




    /*updateData: function () {
      console.log("----- i pollView updateData() ------")
      console.log("username: ", this. username)
      console.log("pollID: ", this.pollId)

      socket.emit('dataUpdate', {pollId: this.pollId, username: this.username} )


    }*/

  }
}
</script>
