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
<body>
  <div>
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
                role="link"
                >
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
                role="link"
                >
                {{uiLabels.connectPoll}}
            </button>
                </router-link>
      </div>

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
        <router-link v-bind:to="'/poll/'+id+'/'+ lang + '/' +username">{{uiLabels.participatePoll}}</router-link>
      </button>
    
      <!-- byta spåråk funktion-->
      <br />
      <button style="font-size:15px; position:absolute; top:0; right:0; margin:5px;"  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>

    </div>
  </div>
</body>
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

    this.lang=this.$route.params.lang;
    if (this.lang=="") {
      //console.log("lang is :", this.lang)
      this.lang="en"
      //console.log("uppdaterat sidan!")
      //console.log("lang is :", this.lang)
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
    //this one, createUser is added
    createUser: function() {
      console.log("------- i createUser StartView.vue ------ ") 
      console.log("Username: ", this.username)
      socket.emit("createUser", this.username)
    }
  }
}
</script>


<style> 
/*Har inte scoped nu så blir konstigt på alla andra sidor behöver fixa!!! */
  #parentgrid {
    display:grid;
      grid-template: 1fr 1fr 1fr 1fr;
    
    
  }

  /*Dessa knappar skall ju förlitas till en annan sida så småningom, vi väntar med de så att vi kan använda dom som test */
  #Sakersomejskavahar{
    margin-top:50px;
  }
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

body{
  background-color:#CBE896 ;
}

</style>
