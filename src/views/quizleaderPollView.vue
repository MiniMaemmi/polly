<!-- Kopplat till pollvyn som deltagare ser -->

<template>

  <div>
    PollID: {{pollId}}
    <br />

    <br />
    <br />


    Question:
    <QuestionComponent v-bind:question="questionObject" />
    <br />
    <br />
    <br />
    <p>{{ countdown }}</p>
  </div>
    <!--<button  @click =countDown()>COUNTDOWN</button> -->


    <div> 
        <div id="countdown" ></div>
        
    </div>




    <button v-if="showButton" @click="nextQuestion"> {{uiLabels.nextQuestion}}</button>
    <!--<button v-if="this.lastQuestionReached===false" @click="getQuestionFromArray()"> lägg till ||countDown() så Timer kör när man klickar på nästa fråga
      {{uiLabels.nextQuestion}}
    </button> 

    <button v-else> 
      {{uiLabels.showResults}}
    </button>-->

    <!-- <router-link
      v-bind:to="'/result/'+this.pollId+ '/' + lang"
      custom
      v-slot="{ navigate }" v-else>
      
      <button v-else @click="submitAnswer();navigate()" role="link">
        {{uiLabels.showResults}}
      </button>-->

</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();
//const appDivId = 'app'

export default {
  name: 'quizleaderPollView',
  components: {
    QuestionComponent
  },
  data: function () {
    return {
      uiLabels: {},
      countdown: 10, //tid för timer
      question: {
        q: "",
        a: [],
      },

      questionObject: {},
      
      pollId: "inactive poll",
      poll: {},
      lang: "",
      //pollLength: this.getQuestionFromArray(this.poll),
      pollLength: 0,
      pollQuestionIterator:0,
      lastQuestionReached: false,
      showButton: false,

      AllPollParticipants: [],
              
    }

  },

  

  created: function () {
    this.pollId = this.$route.params.pollId;
    this.quizName = this.$route.params.quizName;
    this.lang = this.$route.params.lang
    console.log("------ in quizleaderPollView created function ------ ")

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



    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    

  },


  methods: {
    //nedräkningsfunktion ( har inte fixat att den resetar om man kickar på next question än)
    updateCountdown(){
        this.countdown--;
        if (this.countdown > 0) {
            setTimeout(this.updateCountdown,1000);
        } else {
            this.countdown = 10;
            this.showButton = true;
            
        }
    },
    
    nextQuestion(){
        this.showButton = false;
        this.getQuestionFromArray();
    },
    
    /* gammal som har en knapp
    countDown: function()
    {
        // Nedräkning i sekunder
        var countdownDuration = 10;
        var intervalId;


        intervalId = setInterval(function() 
        {
          countdownDuration--;
          console.log(countdownDuration)
          // Uppdaterar div:en med id:et "countdown"
          document.getElementById("countdown").innerHTML = countdownDuration;

  
          if (countdownDuration == 0) 
          {
            clearInterval(intervalId);
            document.getElementById("countdown").innerHTML = "Time is up!";
          }
        }, 1000);//millisecind mellan ticks i setInterval
    },*/
    

 







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
    },

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




    navigate: function() {
      this.$router.push('/result/'+this.pollId+'/'+this.lang)
    },*/


  },
  
  mounted(){
        this.updateCountdown();
    }
}
</script>


<style>

#countdown{
  font-size:80px;

}

</style>
