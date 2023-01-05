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
      

      <div class="contentArea lightYellowBox shadowIt">
        <div class="header">
          <h1>
            {{ uiLabels.waitingRoom }}
            <br/>
            {{ uiLabels.theQuiz }}
          </h1>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    
  },
  data: function () {
    return {
      
      uiLabels: {},
      id: "",
      lang: "",
      hideNav: true,
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

.movearea{
  transition: 0.5s background-color ease;
  min-height: 100vh;
  }



  h1{
  font-size:10vh
  }
</style>

