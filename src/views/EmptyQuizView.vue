<template>
    <body class="animationGradient">
        <div class="goBackButtonDiv">
            <button class="custom-btn goBackButtonPosition" @click="this.$router.push('/' + this.lang)">{{uiLabels.back}}</button>
        </div>
      <div class="wrapper">
        
        <div class="contentArea lightYellowBox shadowIt">
            <h1> {{uiLabels.quizEmpty}} </h1>
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
        //console.log("sendstart klrd i quizzleaderstartview")
        //console.log(this.pollId )
        socket.emit("sendStart",this.pollId,this.quizName )
      },
  
  
    }
  }
  </script>
  
  
  <style scoped>
    @import '@/assets/css/style.css';
    
    h1 { 
        font: 2em Inter;
        margin: 0 0 10px;
    }

    .goBackButtonDiv {
        align-self: flex-start;
    }

    .contentArea {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 5%;
    }

  
  @media screen and (max-width:985px) {
    h1{
      font-size:2em;
    }
    .contentArea{
      margin-top: 5%;
      margin-bottom: 5%;
    }
  }
  
  @media screen and (max-width:820px) {
    h1{
      font-size:2em;
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
      font-size:2em;
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
      font-size: 2em;
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
  
  @media screen and (max-width:415px) {
    h1{
      font-size: 1.5em;
    }
  
    .custom-btn{
      display: inline;
        flex: none;
        position: absolute;
        width:60% !important
    }

    .contentArea {
        height: 50vh !important;
        margin-left:5%;
        margin-right: 5%
    }
  }
  
  
  
  
  </style>
  