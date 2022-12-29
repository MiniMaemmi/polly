<template>
 <div class="container"> 
  <div class="topListContainer">
    <h1> Resultat </h1>
    <topListComponent v-bind:topList="topList"/>
    <!--
    QuestionObject:
    <br />
    {{question}}
    <br />
    <br />
    POLLOBJECT:
    <br />
    {{poll}}
    <br />-->
    <br />
    <h1> POLLPARTICIPANTS</h1>
    <br />
    {{pollParticipants}} 
  </div>
  <div class="graphContainer">
    Graph container
    <div class="bellCurveContainer">
      <h3>Bell Curve here</h3>
      <bellCurveComponent/>
    </div>
    <div class="barChartContainer">
      <h3>Barchart here</h3>
      <BarsComponent v-bind:data="{poll: poll, pollParticipants:pollParticipants}"/>
    </div>
  </div>
</div>
<br />
<br />
  <button @click="assignScoreValueToEachAnswer">
    Temporary Assign Score Button
  </button>  
  <button @click="getSortedTopList">
    Temporary GetTopList Button
  </button> 

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
      submittedAnswers: {
      },
      pollParticipants:[],
      poll: {},
      topList: []



    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
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
        console.log("getPollParticipants log")
        this.pollParticipants = update;
        
      
    });




  },
  methods: {
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


    }


  }
}
</script>

<style>

  .container {
  display: flex; /* or inline-flex */
}

  .topListContainer {
  width: 50vw;
  height: 100vh;
  align-items: center;
  background-color: coral;
}

.graphContainer {
  background-color: lightblue;
  width: 50vw;
  height: 100vh;

}

.bellCurveContainer{
  width: 100%;
  background-color: lightgoldenrodyellow;
  height: 50%;
}


.barChartContainer {
  width: 100%;
  background-color: lightslategrey;
  height: 50%;

}
</style>
