<template>
  <body >
    <div      
      @mousemove="onMousemove"
      :style="{backgroundColor: `hsl(${x}, 100%, 50%)` }"
      class="movearea">

      <h1>Väntrum</h1>
      <h2>Matchen börjar strax</h2>
      flytta runt pekaren, Det blir kul!
      {{this.username}}
    
    </div>
  </body>



<div
@mousemove="onMousemove"
:style="{backgroundColor: `hsl(${x}, 100%, 50%)` }"
class="movearea"
>
  <h1>Väntrum</h1>
  <h2>Matchen börjar strax</h2>
  flytta runt pekaren, Det blir kul!
    <!--Här ska de ju va en wordlcloudsdaw-->
  {{this.username}}
    
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
      lang: "en",
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

    //this one, createUser is added behöver nog inte
    /*createUser: function() {
      console.log("------- i createUser StartView.vue ------ ") 
      console.log("Username: ", this.username)
      socket.emit("createUser", this.username)
    }*/

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
  }
</style>