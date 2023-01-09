<template>
  <body class="animationGradient">
    <div class="wrapper">

      <!--Tillbaka knapp till StartView nu-->
      <div class="goBackButtonDiv">
        <router-link v-bind:to="'/'+ lang" custom v-slot="{ navigate }">
          <button class="custom-btn goBackButtonPosition" @click="navigate" role="link">
            {{uiLabels.back}}
          </button>
        </router-link>
      </div>

      <div class="contentArea lightYellowBox shadowIt">
        <div class="header">
          <h1>
            {{uiLabels.displayJoinPoll}}:
            <br/>
            <div class="boldtext">
              {{quizName}}
            </div>
          </h1>
        </div>

          <h1>
            {{uiLabels.joinQuiz}}
            <br/>
            <div class="boldtext">
              {{pollId}}
            </div>
          </h1>
        
          <div> <!--vill att om username är undefined blir man quizleader eller nåt-->
            <router-link
            v-bind:to="'/poll/'+pollId+'/'+ lang + '/' +username"
            custom
            v-slot="{navigate}"> <!--v:bind:to="'/quizleaderPollView/'+lang+'/'+this.pollId+'/'+this.quizName"-->
              <button class="custom-btn" style="position:fixed; bottom:0; right:0; height:150px; width:150px; "   
               @click = "navigate()" v-on:click="sendStart()" role="link">
                {{ uiLabels.playQuiz }}
              </button>
            </router-link>
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
      hideNav: true
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId=this.$route.params.pollId
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
      console.log("sendstart klrd i quizzleaderstartview")
      console.log(this.pollId )
      socket.emit("sendStart",this.pollId )
    },


  }
}
</script>


<style scoped>
  @import '@/assets/css/style.css';
  
  h1 { margin: 0 0 10px; }
 

.goBackButtonDiv {
  width: 100%;
  height: 11vh;
  display: inline;
}

.boldtext{
  font-weight: bold;
}




</style>
