<template>
  <body class="animationGradient">
    <div class="wrapper">
      <div class="goBackButtonDiv">
        <button class="custom-btn goBackButtonPosition" @click="this.$router.push('/' + this.lang)">{{uiLabels.back}}</button>
      </div>
      <div class="contentArea lightYellowBox shadowIt">
        <h1>
          {{uiLabels.displayJoinPoll}}:
          <br/>
          <div class="boldtext">
            {{quizName}}
          </div>
        </h1>

        <h1>
          {{uiLabels.joinQuiz}}
          <br/>
          <div class="boldtext">
            {{pollId}}
          </div>
        </h1>
        
        <div class="goBackButtonDiv">

          <button class="custom-btn playButtonPosition" @click="sendStart()">{{ uiLabels.playQuiz }}</button>

        </div>
      </div>
    </div> 

  </body>
    
    
</template>

<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'quizleaderStartView',
  components: {
    //ResponsiveNav
  },
  data: function () {
    return {
      
      uiLabels: {},
      id: "",
      lang: "",
      
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId=this.$route.params.pollId
    this.quizName=this.$route.params.quizName

    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });

    this.pollId = this.$route.params.pollId;
    this.quizName = this.$route.params.quizName;

    console.log("i quizleaderStartView")
  },
  methods: {
    sendStart: function(){
      socket.emit("sendStart",this.pollId,this.quizName)
      this.$router.push('/poll/'+this.pollId+'/'+ this.lang + '/' + this.quizName + '/' + this.username)
    },


  }
}
</script>


<style scoped>
  @import '@/assets/css/style.css';
  
  h1 { 
    margin: 0 0 10px;
  }
 
  .boldtext{
    font-weight: bold;
  }


@media screen and (max-width:985px) {
  h1{
    font-size:4em;
  }
  .contentArea{
    margin-top: 4%;
  }

  .custom-btn{
      display: inline;
      flex: none;
      position: absolute;
      width:20% !important
    }
}


@media screen and (max-width:790px) {

  h1{
    font-size:3em;
  }
  .custom-btn{
      display: inline;
      flex: none;
      position: absolute;
      width:30% !important
    }
    .contentArea{
    margin-top: 10%;
    
  }
}



@media screen and (max-width:430px) {
  h1{
    font-size: 2.5em;
  }

}

@media screen and (max-width:290px) and (min-width: 200px) {
  h1{
    font-size: 1.8em;
  }
  .custom-btn{
    display: inline;
      flex: none;
      position: absolute;
      width:60% !important
  }
}




</style>
