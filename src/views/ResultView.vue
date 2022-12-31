<template>
<body>
  <div class="resultHeader">
    <div class="resultBox">
      <h1> Resultat 🎉 </h1>
    </div>
  </div>
  <div class="container"> 
  <div class="topListContainer">
    <topListComponent v-bind:topListAndUsername="{topList, username}"/>
  </div>
  <div class="graphContainer">
    <div class="bellCurveContainer">
      <bellCurveComponent v-bind:data="{poll: poll, pollParticipants:pollParticipants,questionResultCounter: questionResultCounter, }"/>
    </div>
    <div class="barChartContainer">
      <BarsComponent v-bind:data="{poll: poll, pollParticipants:pollParticipants,questionResultCounter: questionResultCounter, }"/>
    </div>
  </div>
</div>

</body>

</template>

<script>
// @ is an alias to /src
import BarsComponent from '@/components/BarsComponent.vue';
import topListComponent from '@/components/topListComponent.vue';
import bellCurveComponent from '@/components/bellCurveComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'ResultView',
  components: {
    BarsComponent,
    topListComponent,
    bellCurveComponent
  },
  data: function () {
    return {
      question: "",
      lang: "",
      username: "",
      submittedAnswers: {
      },
      pollParticipants:[],
      poll: {},
      topList: [],
      questionResultCounter:[],
      scoreCounter: [],



    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    this.username = this.$route.params.username
    socket.emit('joinPoll', this.pollId)

    socket.emit('getPoll', this.pollId)
    socket.on('sendQuestion', poll => 
      this.poll = poll
    );


    socket.on("dataUpdate", (update) => {
      this.submittedAnswers = update.a;
      this.question = update.questionsArrayObject;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    });

    socket.emit("getPollParticipants", this.pollId) 
      socket.on("getPollParticipants", update => {
        
        this.pollParticipants = update;

        console.log("this.pollParticipants",this.pollParticipants)
        console.log("this.questionResultCounter",this.questionResultCounter)

        socket.emit("checkQuestions", this.pollId, this.pollParticipants, this.questionResultCounter)
          socket.on('checkQuestions', update =>{
          
          this.questionResultCounter=update;
          console.log("Checkqustions i Resultview, questionResultCounter", this.questionResultCounter)
        
        });




        
        socket.emit("assignScoreForUser", this.pollId, this.pollParticipants)
        socket.on('assignScoreForUser', update =>{
          this.pollParticipants= update;
          });
          
          socket.emit("getSortedTopList", this.pollParticipants, this.topList)
          socket.on('getSortedTopList', update =>{
          
          this.topList=update;
          console.log("toplist", this.topList)
          
          socket.emit("createScoreCounter", this.topList)





        });
      
    });


      



  },
  methods: {/*
    assignScoreValueToEachAnswer: function() {
      console.log("----- i ResultView assignScoreValueToEachAnswer()---- ")
      this.pollParticipants.forEach(pollParticipantObject => {

        pollParticipantObject.answers.forEach(questionAnswered => {
            this.setQuestionAnswerScore(questionAnswered, pollParticipantObject)
        })

      })
      

    },

    setQuestionAnswerScore: function(questionAnswered, pollParticipantObject) {
      console.log("----- i ResultView getQuestionAnswerScore()---- ")

      this.poll.questions.forEach(questionObject => {

        if (questionObject.id === questionAnswered.questionID) {

          questionObject.answers.forEach(answerObject => {
            if (answerObject.id === questionAnswered.answerId) {
              questionAnswered.score = answerObject.score
              pollParticipantObject.totalScore += answerObject.score
            }

          })
        }

      })

    },

    getSortedTopList: function() {
      this.pollParticipants.forEach(pollParticipantObject => {
        this.topList.push({username: pollParticipantObject.username, totalScore: pollParticipantObject.totalScore})
      })
      this.topList.sort((a, b) => (a.totalScore < b.totalScore) ? 1 : -1)
    },




  */
  }
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

  body{
    background: rgb(254,81,154);
    background: linear-gradient(288deg, rgba(254,81,154,1) 0%, rgba(253,187,45,1) 100%);
    font-family: 1em Inter 400 black;

  }

  h1 {
    font: 3em Inter;
    font-weight: 700;

  }

  h3 {
    font: 1.5em Inter;
    font-weight: 400;

  }

.container {
  display: flex;
  
}

.resultHeader {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 100vw;

}

.topListContainer {
  width: 50vw;
  height: 80vh;
}

.graphContainer {
  width: 50vw;
  height: 80vh;

}

.bellCurveContainer{
  width: 100%;
  height: 50%;
  margin-top: 5%;

}


.barChartContainer {
  width: 100%;
  height: 50%;
  margin-top: 5%;

}

.resultBox{
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 3vh;
  width: 40%;
  height: 70%;


}


</style>
