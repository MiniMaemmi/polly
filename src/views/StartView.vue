<template>

<body>
  <div class="background">
    <div class="wrapper">
      <div class="headerTextWhiteBox">
        <h1 >QuizTime!</h1>

        <div>
          <div>
            <router-link
              v-bind:to="'/create/'+lang"
              custom
              v-slot="{ navigate }">

              <button class="custom-btn"
                @click="navigate"
                role="link">

                {{uiLabels.createPoll}}
              </button>
            </router-link>
          </div>

          <br />

          <div>
            <router-link
              v-bind:to="'/connect/'+lang"
              custom
              v-slot="{ navigate }">

              <button class="custom-btn"
                @click="navigate"
                role="link">

                {{uiLabels.connectPoll}}

              </button>
            </router-link>
          </div>

          <!-- byta spåråk funktion-->
          <br />
          <button class="custom-btn" style="position:absolute; top:0; right:0; margin:5px;"  v-on:click="switchLanguage">
            {{uiLabels.changeLanguage}}
          </button>
      </div>

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
      hideNav: true,
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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');
  @import '@/assets/css/style.css';

  body {
    background: linear-gradient(-45deg, white, rgb(254,81,154), rgba(253,187,45,1), red);
    background-size: 400% 400%;
    font-family: 1em Inter 400 black;
    /* För https://www.freecodecamp.org/news/html-page-width-height/*/
    min-height: 100vh;
    animation:  animate 7s ease infinite;
  }

  /*body{
    background: rgb(254,81,154);
    background: linear-gradient(288deg, rgba(254,81,154,1) 0%, rgba(253,187,45,1) 100%);
    font-family: 1em Inter 400 black;
    /* För https://www.freecodecamp.org/news/html-page-width-height/
    min-height: 100vh;
    
  }*/

  /*Har inte scoped nu så blir konstigt på alla andra sidor behöver fixa!!! */

  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    height: 100vh;


  }

  .headerTextWhiteBox {
    height: 40vh;
  }
/*
  button {
  border-radius: 1em;
  margin: 0px 10px 0px 10px;
  width: 10em;
  height: 6em;
  font: 16px Inter;
  font-size:20px;

  background: #D7D7D7;
}  */
h1 { margin: 0 0 10px; }

/*@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
  =Data.prototype.gameStart=function(gameStarted){
  console.log("Data.js gameStart")
  if (gameStarted === true){
  console.log("gameStart")
  
  //gameStarted=true
  return gameStarted}
}
*/



</style>
