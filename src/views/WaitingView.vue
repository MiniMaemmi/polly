<template>
  
  <div class="wrapper">
    
    <div @mousemove="onMousemove"
      :style="{backgroundColor: `hsl(${x}, 80%, 50%)` }"
      class="movearea">

      <div class="goBackButtonDiv">
       <button class="custom-btn goBackButtonPosition" @click="this.$router.push('/connect/'+lang)">{{uiLabels.back}}</button>
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
      quizName:"",
      uiLabels: {},
      id: "",
      lang: "",
      username: "",
      x:0
    }
  },
  
  created: function () {
    this.pollId=this.$route.params.pollId
    this.lang = this.$route.params.lang;
    this.username = this.$route.params.username;
    
    socket.emit("pageLoaded", this.lang);

    socket.on("init", (labels) => {
      this.uiLabels = labels
      
    }),

    socket.emit("joinPoll", (this.pollId));  
    
    socket.on("start",(data)  => {
      console.log("start mottogs")
      this.quizName=data
      console.log(this.quizName)
      
  
      this.$router.push('/poll/'+this.pollId+'/'+this.lang+'/'+this.quizName + '/' + this.username)
     
    });
    
    
    
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
  margin-top: 20vh;
}

  .movearea{
    transition: 0.2s background-color ease;
    min-height: 100vh;
  }



  @media screen and (max-width:950px) {
    .goBackButtonPosition{
      display: inline;
      flex: none;
      position: absolute;
      width: 20% !important
    }

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

