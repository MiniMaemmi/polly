<!-- Kopplat till pollvyn som deltagare ser -->

<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
   
    <body class="animationGradient" style="animation:  animate 25s ease infinite; margin-top:0vh;">
        <h1 style="margin-top:0vh" v-if="username==='undefined'">Hello Quiz leader!</h1>
  
      <div class="wrapper" style="margin-top:0vh;">
        
        <div class="goBackButtonDiv">
          <router-link v-bind:to="'/'+ lang" custom v-slot="{ navigate }">
            <button class="custom-btn goBackButtonPosition" @click="navigate" role="link">
              {{uiLabels.back}}
            </button>
          </router-link>
        </div>

               
        <p1 v-if="username==='undefined'" > {{username}}</p1>
        <p2 class="PollIdDisplay">PollID: {{pollId}}</p2>
       
        <div class="contentArea lightYellowBox shadowIt" style="position:relative;">

          <div style="position:absolute; font-size:5vh;">
            {{ uiLabels.question }}: {{question.q}}
          </div>
       
          <QuestionComponent v-bind:question="questionObject"/>
          
          
          <div v-for="url in question" v-bind:key="url">
                    <img v-if="question.url" :src="url" >

                  </div>
          <br />
          <div class="p3" style="position:absolute; bottom:0; right:50%;" v-if="countdown > 0"> {{ countdown }}</div>
  
          <div class="p3" style="position:absolute; bottom:0; right:50%;" v-if="countdown === 0">{{uiLabels.time}}</div>
          
        <div v-if="username==='undefined'" >
          <button style="height:10%" class="nextQuestionButton custom-btn-quadratic" v-if="showButton && this.lastQuestionReached===false" @click="getQuestionFromArray()"> 
            {{uiLabels.nextQuestion}}
          </button>

          <button style="height:10%" class="nextQuestionButton custom-btn-quadratic" v-else-if="showResultButton"> 
            {{uiLabels.showResults}}
          </button>
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
//const appDivId = 'app'

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
      lastQuestionReached: false,
      showResultButton: false,
      userObject: 
                {
                    username: '',
                    totalScore: 0,
                    answers: [],
                },
      AllPollParticipants: [],

      //username: document.getElementById(appDivId).__vue__,

      //answers = [ {user: this.username, question: this.question.q, answer: this.question.a}]
    }
  },
  created: function () {
    console.log("I POLLVIEW")
    this.pollId = this.$route.params.id
    this.username = this.$route.params.username
    this.lang = this.$route.params.lang
    socket.on("init", (labels) => {
        this.uiLabels = labels
      })
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

//man behöver klicka en extra gång på next innan 
// visa resultat visas, vet inte exakt hur vi fixar det.
// Bör man även försöka koppla ihop tiderna här och i quizleaderPollView
// Nu är det begge bara statiska.
  methods: {
    //nedräkningsfunktion
    updateCountdown(){
        this.countdown--;
        if (this.countdown > 0) {
            setTimeout(this.updateCountdown,1000);
            console.log(this.countdown)
        } else {
            this.showButton = true;
            // visa rätt svar
            
        }
    },
    
    //denna bör nog egentligen vara på resultView, så att vi där tar in alla pollParticipants och räknar fram resultatet på created-delen av ResultView
  

    getQuestionFromArray: function() {
      let questionObject = this.poll.questions[this.pollQuestionIterator]
      this.showButton = false;
      console.log("-----i getQuestionFromArray()----")

      if (typeof questionObject !== 'undefined') {
       
        this.countdown = 10;
        this.questionObject = questionObject
        this.question.q = questionObject.label
        this.question.a = []

        questionObject.answers.forEach(answer => {
            this.question.a.push(answer.label);
        })

        


       
          
        console.log("questionObject",questionObject)
        this.pollQuestionIterator += 1
        
        this.updateCountdown();
       
        


      }
      else if (typeof questionObject === 'undefined'){
        //Delete "Next fråga button"
        this.lastQuestionReached = true
        this.showResultButton = true
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
        this.userObject.answers.push({ questionID: this.questionObject.id, answerId: answer.id, score: answer.score, correct: answer.correct})
        console.log("Answer added")

      }
      else if (questionAnswered===true){
        console.log("Question & answer has already been added, replacing")
        //här borde man ha så att man kollar om det är samma svar som redan blivit tillagt. Hade varit
        //mer effektivt än att bara replace:a oavsett
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
    },*/


    navigate: function() {
      this.$router.push('/result/'+this.pollId+'/'+this.lang+'/'+this.username)
    },




    /*updateData: function () {
      console.log("----- i pollView updateData() ------")
      console.log("username: ", this. username)
      console.log("pollID: ", this.pollId)

      socket.emit('dataUpdate', {pollId: this.pollId, username: this.username} )


    }*/

  }
}
</script>


<style scoped>
@import '@/assets/css/style.css';

.PollIdDisplay{
  position:absolute;
  right:0;
  top:0;
}
.wrapper{
  display:flex;
  max-height: 100%;

}


p1{
  font-size:3vh;
  position:absolute;  
  right:0%;
  top:5%;
  margin:1vh;
  
}

p2{
  font-size:3vh;
  position:relative;  
  right:50%;
  margin:1vh;
  
}

.p3{
  font-size:150px;
  position:relative;  
  right:50%;
  margin:1vh;

}


.nextQuestionButton{
  position:fixed; 
  bottom:0; 
  right:0;

}
.header{
  min-width:100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 60%;
  margin-right:55%;
  margin-left:25%;
}
 


</style>
