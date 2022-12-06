<template>
<div>
    <h1>Anslut till Quizz!</h1>
    <div id="nameAndID">
        <label>
        Write poll id: 
        <input type="text" v-model="id" placeholder="Required">
        </label>
        <br/>
        <br/>
        <label>
        Write your username:
      
            <input  type="text" v-model="username"  placeholder="Required">
            
          
            <div>
              <router-link
                v-bind:to="'/waiting/'+ id"
                custom
                v-slot="{ navigate }">
            <button :disabled="!username.length||!id.length" 
            
              @click="navigate"
              role="link"
               >
            Connect to Quizz
          </button>
              </router-link>
            </div>

            <br />
            {{username}}
        </label>
        <br />

        <button><router-link v-bind:to="'/connect/'">CONNECT</router-link></button>

            <!--button v-on:click="createUser"><router-link v-bind:to="'/waiting/'+username">Connect to quizz</router-link></button-->
            

            


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
    },
    isFormFilled: function(){
      console.log("hej")
    }
  }
  
}

</script>

<style>

#nameAndID{
    margin:50px;
}




</style>