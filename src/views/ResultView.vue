<template>
<body class="animationGradient">
  <div class="wrapper">
    <div class="resultHeader">
      <button class="custom-btn goBackButtonPosition" @click="this.$router.push('/'+ this.lang)">{{uiLabels.backToStart}}</button>
      <div class="resultBox">
        <h1> {{uiLabels.endResults}}🎉 </h1>
      </div>
    </div>
    <div class="container"> 
      <div class="topListContainer">
        <TopListComponent v-bind:topListAndUsername="{topList, username}"/>
      </div>
      <!--<div class="graphContainer">
        <div class="bellCurveContainer">
          <bellCurveComponent v-bind:data="{pollLength: pollLength, pollParticipants:pollParticipants,questionResultCounter: questionResultCounter }"/>
        </div>-->
        <div class="barChartContainer">
          <BarsComponent v-bind:data="{poll: poll, pollParticipants:pollParticipants,questionResultCounter: questionResultCounter, }"/>
        </div>
      <!--</div>-->
    </div>
  </div>
</body>
</template>

<script>
// @ is an alias to /src
import BarsComponent from '@/components/BarsComponent.vue';
import TopListComponent from '@/components/TopListComponent.vue';
//import bellCurveComponent from '@/components/bellCurveComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'ResultView',
  components: {
    BarsComponent,
    TopListComponent,
    //bellCurveComponent
  },
  data: function () {
    return {
      uiLabels:{},
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
      bellCurveBucketsResult: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.username
    this.lang = this.$route.params.lang
    socket.emit("pageLoaded" ,this.lang)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
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
        socket.emit("checkQuestions", this.pollId, this.pollParticipants, this.questionResultCounter)
          socket.on('checkQuestions', update =>{
          this.questionResultCounter=update;
        });

        socket.emit("assignScoreForUser", this.pollId, this.pollParticipants)
        socket.on('assignScoreForUser', update =>{
          this.pollParticipants= update;
          socket.emit("getSortedTopList", this.pollParticipants, this.topList)
          socket.on('getSortedTopList', update =>{
          this.topList=update;
          socket.emit("createScoreCounter", this.topList)
          //this.pollLength = this.poll.questions.length()
          //this.calculateBellCurveBuckets()
          });
        });
    });
  },

  methods: {
    calculateBellCurveBuckets: function() {
      var reversedTopList = this.topList.sort((a, b) => (a.totalScore > b.totalScore) ? 1 : -1)
      reversedTopList.forEach(user => {
        var newString = user.totalScore + "p"
          if (!this.bellCurveBucketsResult[newString]) {
            this.bellCurveBucketsResult[newString]= 0
          }
          this.bellCurveBucketsResult[newString] = this.bellCurveBucketsResult[newString] + 1
      })
    },
  }
}
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

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


.topListContainer {
  width: 100%;
  height: 80vh;
}

.graphContainer {
  width: 100%;
  height: 80vh;

}

/*.bellCurveContainer{
  width: 100%;
  height: 50%;
  margin-top: 5%;

}*/


.barChartContainer {
  width: 100%;
  height: 50%;
  margin-top: 0%;
  /*width: 100%;
  height: 100%;
  margin-top: 5%;*/
}

.resultBox{
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 3vh;
  width: 40%;
  height: 70%; 
  min-width: 50%; 
}

.resultHeader {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 100vw;
}
@media screen and (max-width: 1250px) {
  .custom-btn{
        display: inline;
        flex: none;
        position: absolute;
        width:10% !important;
        font-size: 1em;
      }
}
@media screen and (max-width: 800px) {

  .custom-btn{

        width:20% !important;

      }
  .container {
    flex-direction: column;
  }

  .topListContainer {
    width: 100%;
  }

  .graphContainer {
    width: 100%;
  }

  .resultBox {
    min-width: 80%;
  }

  h1 {
    font: 2em Inter;
    font-weight: 700;
  }
  .barChartContainer {
    padding-top: 200px;

  }

}


</style>
