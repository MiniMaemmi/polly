<template>
  <body class="animationGradient">
    <div class="wrapper">
      <div class="headerTextWhiteBox">
        <h1>QuizTime!</h1>
        <h4>{{uiLabels.subtitle}} </h4>
        <div>
          
          <div>
            <button class="custom-btn" @click="this.$router.push('/create/'+this.lang)">{{uiLabels.createQuiz}}</button>
          </div>
         
          <div>

          <button class="custom-btn" @click="this.$router.push('/connect/'+this.lang)">{{uiLabels.connectQuiz}}</button>

          </div>
          <button class="custom-btn goBackButtonPosition"  v-on:click="switchLanguage">
            {{uiLabels.changeLanguage}}
          </button>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
  import io from 'socket.io-client';
  const socket = io();
  export default {
    name: 'StartView',
    data: function () {
      return {
        uiLabels: {},
        id: "",
        lang: "en",
        username: ""
      }
    },
    created: function () {
      this.lang=this.$route.params.lang;
      if (this.lang=="") {
        this.lang="en"
      }
      socket.emit("pageLoaded" ,this.lang)
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
    },
    methods: {
      switchLanguage: function() {
        if (this.lang === "en")
          this.lang = "sv"
        else
          this.lang = "en"
        socket.emit("switchLanguage", this.lang)
      },
      toggleNav: function () {
        this.hideNav = ! this.hideNav;
      },
    }
  }
</script>

<style scoped>
  @import '@/assets/css/style.css';
  .wrapper{
    height: 100vh;
  }

  h1 { margin: 0 0 10px; }

  h4 {
    margin-top: 0%;
    margin-bottom: 10%;
  }

  @media screen and (max-width:1200px) {
    .goBackButtonPosition {
      display: inline;
      flex: none;
      position: absolute;
      width: 10% !important;
      font-size: 1em;
    }

    .custom-btn {
      width: 80%;
      margin-top: 5%;
    }
  }

  @media screen and (max-width:750px) {

    .goBackButtonPosition {
      display: inline;
      flex: none;
      position: absolute;
      width: 20% !important;
      font-size: 1em;
    } 
  }


  @media screen and (min-width: 200px) and (max-width:500px) {
    h1 {
      font-size: 2.5em;
    }

    .goBackButtonPosition {
      display: inline;
      flex: none;
      position: absolute;
      width: 80% !important
    }

    .headerTextWhiteBox{
      height: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

    }

    .custom-btn {
      margin-top: 10%;
    }

    .goBackButtonPosition {
      display: inline;
      flex: none;
      width: 30% !important;
      font-size: 1em;
    }

  }
</style>
