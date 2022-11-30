<template>
<div>
    <h1>Anslut till Quizz!</h1>
    <div id="nameAndID">
        <label>
        Write poll id: 
        <input type="text" v-model="id">
        </label>
        <br/>
        <br/>
        <label>
        Write your username:
            <input type="text" v-model="username">
            <br />
            {{username}}
        </label>
        <br />
            <button v-on:click="createUser">
            <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
            </button>
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

<style>

#nameAndID{
    margin:50px;
}




</style>