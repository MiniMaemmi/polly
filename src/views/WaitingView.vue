<template>




<div>
    <title>hmm</title>
    <h1>Väntrum</h1>
    <h2>Matchen börjar strax</h2>
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
      username: ""
    }
  },
  
  
  
  
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
      
    })

    socket.on("start", (data) => {
        console.log("HEJEHEJHEJE")
          this.data=data
    } )
    
    
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
    //this one, createUser is added behöver nog inte
    /*createUser: function() {
      console.log("------- i createUser StartView.vue ------ ") 
      console.log("Username: ", this.username)
      socket.emit("createUser", this.username)
    }
    
    
    
    
    */
  }
 
}



</script>

<style>
@import '@/assets/css/style.css';
</style>