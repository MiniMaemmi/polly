<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
    <body class="animationGradient" style="animation:  animate 25s ease infinite; margin-top:0vh;">
      <div class="wrapper" style="margin-top:0vh;">
        <button class="custom-btn goBackButtonPosition" @click="this.$router.push('/'+ this.lang)">{{uiLabels.backToStart}}</button>
        <div class="UsernameDisplay" v-if="username!=='undefined'" > {{username}}</div>
        <div class= "PollIdDisplay">PollID: {{pollId}}</div>
       
        <div class="contentArea lightYellowBox shadowIt" style="position:relative; overflow-wrap:break-word;">
          <div style="align-self: center; font-size:5vh; margin-top: 10%">  
             {{question.q}}
          </div>
          <QuestionComponent ref="questionComponent" v-bind:question="questionObject"  v-on:answer="logUserAnswer($event)"/>

        <div v-if="username ==='undefined'" >
          <button style="height:10%" class="nextQuestionButton custom-btn-quadratic" v-if="showNextQuestionButton" 
          @click="getQuestionFromArray(), sendNextQuestion()"> 
            {{uiLabels.nextQuestion}}   
          </button>
         

          <!-- <div v-else-if="showResultButton"> -->
            <div v-if="showResultButton">
         
                 
                <button style="height:10%" class="nextQuestionButton custom-btn-quadratic"  
                @click="sendShowResult()" >
            
                {{uiLabels.showResults}}
                </button>
           

          </div>


        </div>
        </div>
      </div>
      </body>
  
</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'PollView',
  components: {
    QuestionComponent
  },
  data: function () {
    return {
      uiLabels: {},
      countdown: 10,
      question: {
        q: "",
        a: [],
        image:null
      },

      questionObject: {},
      
      pollId: "inactive poll",
      submittedAnswers: {},
      username: "",
      poll: {},
      lang: "",

      pollLength: 0,
      pollQuestionIterator:0,
      showResultButton: false,
      showNextQuestionButton: false,
      userObject: 
                {
                    username: '',
                    totalScore: 0,
                    answers: [],
                },
      AllPollParticipants: [],

    }
  },
  created: function () {
    
    this.pollId = this.$route.params.id
    this.username = this.$route.params.username
    this.lang = this.$route.params.lang
    this.quizName = this.$route.params.quizName
    
     
    socket.emit("joinPoll", (this.pollId));  
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
        this.uiLabels = labels
      })
    this.userObject.username = this.username
    socket.emit('getPoll', this.pollId)

    socket.on('sendQuestion', poll => 
    {
      this.poll = poll
      this.pollLength = this.poll.questions.length
      this.showNextQuestionButton = true
      this.getQuestionFromArray()
      }
    )

socket.emit("joinPoll", (this.pollId)); 
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("createdUser", username => {
      this.username = username
      this.userObject.username = username
    })

    socket.on("nextQuestion",() => {
      this.$refs.questionComponent.resetCountdown()
      //här ska de vara en if så inte ledaren får hoopa två steg i arrayen.
      if (this.username != "undefined"){
        this.getQuestionFromArray()
      }
    })

    socket.on("recieveShowResult",(data)  => {
      if (this.userObject.username !== 'undefined') {
        this.submitAnswer()
      }
      this.quizName=data
      
      this.$router.push('/result/'+this.pollId+'/'+this.lang+'/'+this.username)
     
    });
    

  },

  methods: {
    getQuestionFromArray: function() {
      let questionObject = this.poll.questions[this.pollQuestionIterator]
      if (typeof questionObject !== 'undefined') {
        this.countdown = 10;
        this.questionObject = questionObject
        this.question.q = questionObject.label
        this.question.a = []

        questionObject.answers.forEach(answer => {
            this.question.a.push(answer.label);
        })
        this.pollQuestionIterator += 1
      }
      if (this.poll.questions.length === this.pollQuestionIterator) {
        this.showNextQuestionButton = false
        this.showResultButton = true
      }
    },
    sendNextQuestion: function(){
      socket.emit("nextQuestion", (this.pollId))
    },
    submitAnswer: function () {
      socket.emit("submitAnswer", {pollId: this.pollId, userObject: this.userObject} )
    },

    logUserAnswer: function (answer) {
      let questionAnswered  = false
      questionAnswered = this.checkIfQuestionIsAnswered(this.questionObject.id)
      if (questionAnswered===false) {
        this.userObject.answers.push({ questionID: this.questionObject.id, answerId: answer.id, score: answer.score, correct: answer.correct})
      }
      else if (questionAnswered===true){
        let indexToReplace = this.replacePreviousAnswerOnQuestion(this.questionObject.id)
        this.userObject.answers[indexToReplace] = {questionID: this.questionObject.id, answerId: answer.id, score: answer.score, correct: answer.correct}
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

    sendShowResult: function() {
      socket.emit("sendShowResult",this.pollId,this.quizName)
      this.$router.push('/result/'+this.pollId+'/'+this.lang+'/'+this.username)
    },
  }
}
</script>


<style scoped>
@import '@/assets/css/style.css';

body {
    
    top:0;
    bottom:0;
    left:0;
    right:0;
    overflow: hidden;
}


.UsernameDisplay{
  font-size:2vh;
  position:absolute;
  right:0;
  top:3vh;
  margin:2vh;
}

.PollIdDisplay{
  font-size:2vh;
  position:absolute;
  right:0;
  top:0;
  margin:2vh;
}
.wrapper{
  display:flex;
  max-height: 100%;

}
/*extends goBackButtonPosition in style.css*/

.goBackButtonPosition{
  font-size:2vh;
  height:10%
}
@media screen and (max-width: 400px){
  .goBackButtonPosition{
  font-size:1vh;
  height:10%
} 
  }

.nextQuestionButton{
  position:fixed; 
  bottom:0; 
  right:0;

}





</style>
