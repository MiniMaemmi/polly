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
        
          <div class="goBackButtonDiv"> <!--vill att om username är undefined blir man quizleader eller nåt-->
            <router-link
            v-bind:to="'/poll/'+pollId+'/'+ lang + '/' +username"
            custom
            v-slot="{navigate}"> <!--v:bind:to="'/quizleaderPollView/'+lang+'/'+this.pollId+'/'+this.quizName"-->
              <button class="custom-btn playButtonPosition"   
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
    margin-top: 5%;
    margin-bottom: 5%;
  }
}

@media screen and (max-width:820px) {
  h1{
    font-size:3.5em;
  }

    .custom-btn{
      display: inline;
      flex: none;
      position: absolute;
      width:20% !important
    }


}

@media screen and (max-width:689px) {

  h1{
    font-size:3em;
  }
  .custom-btn{
      display: inline;
      flex: none;
      position: absolute;
      width:40% !important
    }
 
}

@media screen and (max-width:590px) {
  h1{
    font-size: 2.5em;
  }


    .contentArea{
    margin-top: 5%;
    margin-bottom: 5%;
  }
}

@media screen and (max-width:440px) {
  h1{
    font-size: 2em;
  }

}

@media screen and (max-width:320px) and (min-width:220px) {
  h1{
    font-size: 1.5em;
  }

  .custom-btn{
    display: inline;
      flex: none;
      position: absolute;
      width:60% !important
  }
}




</style>
