<template>
  <body>
    <div>
      <h1 style="font-size:50px">
        {{uiLabels.displayJoinPoll}}:
        <br/>
        {{quizName}}
      </h1>
    
      <!--Här ska vi bygga mera där vi drar in quizname och quizId. -->
      <h1 style="font-size:50px">
       {{uiLabels.joinQuiz}}
        <br/>
        {{pollId}}
      </h1>
      <br />

      <div> <!--enkel knapp nu, men ska leda till quizleaderPollview -->
        <router-link
          v-bind:to="'/quizleaderPollView/'+lang+'/'+this.pollId+'/'+this.quizName"
          custom
          v-slot="{navigate}">
          <button
          @click="navigate"
          role="link">
            {{ uiLabels.playQuiz }}
          </button>
        </router-link>
      </div>

      <div> <!--Tillbaka knapp till StartView nu-->
        <router-link
         v-bind:to="'/'+ lang"
          custom
          v-slot="{ navigate }">
          <button  
            @click="navigate"
            role="link">
            {{uiLabels.back}}
          </button>
        </router-link>
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
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });

    this.pollId = this.$route.params.pollId;
    this.quizName = this.$route.params.quizName;

    console.log("i quizleaderStartView")
  },
  methods: {


  }
}
</script>


<style scoped>
  

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
