<template>

<body class="animationGradient">
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

                {{uiLabels.createQuiz}}
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

                {{uiLabels.connectQuiz}}

              </button>
            </router-link>
          </div>

          <!-- byta språk funktion-->
          <br />
          <button class="custom-btn goBackButtonPosition"  v-on:click="switchLanguage">
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
  
  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    height: 100vh;
  }



h1 { margin: 0 0 10px; }


@media screen and (max-width:1200px) {
  .custom-btn {
        width: 40%;
        
    }
}



@media screen and (max-width:1040px) {
  
  .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 20% !important
    }
}

@media screen and (max-width:900px) {
  
  .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 30% !important
    }
  .custom-btn {
        width: 60%;
        
    }
}

@media screen and (max-width:600px) {
  
  .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 40% !important
    }

}




@media screen and (max-width: 500px) {
  h1 {
        font-size: 4em;
    }
  .custom-btn {
      width: 80%;
        
    }
  .goBackButtonPosition {
    display: inline;
        flex: none;
        position: absolute;
        width: 40% !important
    }
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 3em;
    }
  .custom-btn {
      width: 100%;
        
    }
    .goBackButtonPosition {
      display: inline;
        flex: none;
        position: absolute;
        width: 60% !important
    }
}

@media screen and (max-width: 300px) {
  .headerTextWhiteBox{
    padding: 2vh;
  }

    .goBackButtonPosition {
      display: inline;
        flex: none;
        position: absolute;
        width: 80% !important
    }
}


@media screen and (min-width: 220px) and (max-width:270px) {
  h1 {
    font-size: 2em;
    }

  .goBackButtonPosition {
      display: inline;
        flex: none;
        position: absolute;
        width: 80% !important
    }
}
</style>
