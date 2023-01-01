<!-- Kopplat till pollvyn som alla ser -->

<template>

  <div>
    PollID: {{pollId}}
    <br />



    {{ uiLabels.question }}:
    <QuestionComponent v-bind:question="questionObject" />

    <p v-if="countdown > 0"> {{ countdown }}</p>
    <p v-if="countdown === 0">{{uiLabels.time}}</p>

  



   
    <button v-if="showButton && this.lastQuestionReached===false" @click="getQuestionFromArray()"> 
      {{uiLabels.nextQuestion}}
    </button>

    <button v-else-if="showResultButton"> 
      {{uiLabels.showResults}}
    </button>


    <!-- <router-link
      v-bind:to="'/result/'+this.pollId+ '/' + lang"
      custom
      v-slot="{ navigate }" v-else>
      
      <button v-else @click="submitAnswer();navigate()" role="link">
        {{uiLabels.showResults}}
      </button>-->
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
const socket = io();


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
      showResultButton: false,

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


//man behöver klicka en extra gång på next innan 
// visa resultat visas, vet inte exakt hur vi fixar det 

  methods: {
    //nedräkningsfunktion
    updateCountdown(){
        this.countdown--;
        if (this.countdown > 0) {
            setTimeout(this.updateCountdown,1000);
        } else {
            this.showButton = true;
            // visa rätt svar
            
        }
    },
    
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
        this.pollQuestionIterator += 1
        this.updateCountdown();
      }
      else if (typeof questionObject === 'undefined'){
        //Delete "Next fråga button"
        this.lastQuestionReached = true
        this.showResultButton = true

      }
      
    },





/*
    navigate: function() {
      this.$router.push('/result/'+this.pollId+'/'+this.lang)
    },*/


  }
  
  
}
</script>


<style scoped>
@import '@/assets/css/style.css';


</style>
