<template>
  
  <div class="wrapper">
    
    <div @mousemove="onMousemove"
      :style="{backgroundColor: `hsl(${x}, 100%, 50%)` }"
      class="movearea">

      <div class="goBackButtonDiv">
        <router-link v-bind:to="'/connect/'+lang" custom v-slot="{ navigate }">
          <button class="custom-btn goBackButtonPosition" @click="navigate" role="link">
            {{uiLabels.back}}
          </button>
        </router-link>
      </div>
      

      <div class="headerTextWhiteBox">
        
          <h1>
            {{ uiLabels.waitingRoom }}
            <br/>
            {{ uiLabels.theQuiz }}
          </h1>

        
      </div>

    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'WaitingView',
  components: {
    
  },
  data: function () {
    return {
      
      uiLabels: {},
      id: "",
      lang: "",
      username: "",
      x:0
    }
  },
  
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);

    socket.on("init", (labels) => {
      this.uiLabels = labels
      
    })

    socket.on("start", (data) => {
        console.log("HEJEHEJHEJE")
          this.data=data
    } )
    
    
  },
  methods: {
    onMousemove(e){
      this.x = e.clientX
    }
  }
 
}

</script>

<style scoped>
@import '@/assets/css/style.css';

.headerTextWhiteBox {
  margin-top: 30vh;
}

  .movearea{
    transition: 0.5s background-color ease;
    min-height: 100vh;
  }



  @media screen and (max-width:950px) {
    .goBackButtonPosition{
      display: inline;
      flex: none;
      position: absolute;
      width: 20% !important
    }
  
  }



  @media screen and (max-width:740px) {
    h1{
      font-size: 4em;
    }
  }

  @media screen and (max-width:590px) {
    h1{
      font-size: 3em;
    }

    .goBackButtonPosition{
      display: inline;
      flex: none;
      position: absolute;
      width: 40% !important
    }
  
  }


  @media screen and (max-width:400px) {
    h1{
      font-size: 2em;
    }
  
  }

  @media screen and (max-width:290px) and (min-width:200px) {

    .goBackButtonPosition{
      display: inline;
      flex: none;
      position: absolute;
      width: 60% !important
    }
  }
</style>

