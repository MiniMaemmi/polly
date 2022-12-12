<template>
  <header>
  </header>

  <h1> </h1>

  <body>
    <p> Joina Quiz! </p>
    Här ska vi bygga mera där vi drar in quizname. Vi ska också ta upp med Mikael om data objektet från createView med vår scrollfunktion. 
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
      lang: "en",
      hideNav: true
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });

    console.log("i quizleaderStartView")
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
    }

  }
}
</script>
<style scoped>
  
  
  .backgroundcolor{

    background-color:#E63462;

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
