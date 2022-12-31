<template>

<body>
  <div class="background">

    <div id="headertext">
      <h1 >QuizTime!</h1>
    </div>
    
    <div>

      <div>
        <router-link
          v-bind:to="'/create/'+lang"
          custom
          v-slot="{ navigate }">

          <button  
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

          <button  
            @click="navigate"
            role="link">

            {{uiLabels.connectPoll}}

          </button>
        </router-link>
      </div>

      <!-- byta spåråk funktion-->
      <br />
      <button style="font-size:15px; position:absolute; top:0; right:0; margin:5px;"  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>

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


<style>

  body{
    background-color:#CBE896 ;
  }

  /*Har inte scoped nu så blir konstigt på alla andra sidor behöver fixa!!! */

  #headertext{
    font-size:80px;
    font-size: 4vw

  }

  button {
  border-radius: 1em;
  margin: 0px 10px 0px 10px;
  width: 10em;
  height: 6em;
  font: 16px Inter;
  font-size:20px;

  background: #D7D7D7;
}  


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
  =
*/



</style>
