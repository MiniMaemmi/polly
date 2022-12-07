<template>
  <!--
  <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo"><img src="/img/logo.png">Quiztime polling tool</div>
  </header>
  -->

  <!--
  <ResponsiveNav v-bind:hideNav="hideNav">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <a href="">Pricing</a>
    <a href="">About</a>
    <a href="">FAQ</a>
  </ResponsiveNav>
    -->
  <div >
    <h1>QuizTime!</h1>
  
     
    <div>
              <router-link
                v-bind:to="'/create/'+lang"
                custom
                v-slot="{ navigate }">
              <button  
            
              @click="navigate"
              role="link"
               >
               {{uiLabels.createPoll}}
          </button>
              </router-link>
    </div>
    
    

    <div>
              <router-link
                v-bind:to="'/connect/'"
                custom
                v-slot="{ navigate }">
              <button  
            
              @click="navigate"
              role="link"
               >
            Connect to Quizz
          </button>
              </router-link>
    </div>


    <br />
    <br />
    <!--Knapp som ska leda till desktop 3 på figma-->
    <!---
    <button><router-link v-bind:to="'/connect/'">CONNECT</router-link></button>-->

    <div id="Sakersomejskavahar">
      <label>
        Write poll id: 
        <input type="text" v-model="id">
      </label>
      <br />
      <label>
        Write your username:
          <input type="text" v-model="username">
          <br />
          {{username}}
      </label>
      <br />
    </div>

    <button v-on:click="createUser">
      <router-link v-bind:to="'/poll/'+id+'/'+username">{{uiLabels.participatePoll}}</router-link>
    </button>

    <!-- byta spåråk funktion-->
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    

  </div>
</template>

<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    //ResponsiveNav
  },
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
    //this one, createUser is added
    createUser: function() {
      console.log("------- i createUser StartView.vue ------ ") 
      console.log("Username: ", this.username)
      socket.emit("createUser", this.username)
    }
  }
}
</script>
<style scoped>
  
  
  .backgroundcolor{

    background-color:#E63462;

  }

  
  
  /*Dessa knappar skall ju förlitas till en annan sida så småningom, vi väntar med de så att vi kan använda dom som test */
  #Sakersomejskavahar{
    margin-top:50px;
  }
  
  

  button {
  border-radius: 1em;
  margin: 0px 10px 0px 10px;
  width: 10em;
  height: 6em;
  font: 16px Inter;

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
