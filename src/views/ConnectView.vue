<template>
<div>
    <h1 style="font-size:50px">Connect to Quiz!</h1>
    <div>
      <div id="nameAndID">
        
        <label>
        Poll id: 
        <input type="text" style="height:50px; font-size:20px; " v-model="id" placeholder="Required">
        </label>
        <br/>
        <br/>

        <label>
           Username:
            <input type="text" style="height:50px; font-size:20px; margin-top:15px; margin-bottom:15px"  v-model="username"  placeholder="Required">
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

          </label>
        <br />
        

        <br />
        <div>
              <router-link
                v-bind:to="'//'+ id"
                custom
                v-slot="{ navigate }">
                <button  
            
              @click="navigate"
              role="link"
                >
              Tillbaka Till Framsida
              </button>
              </router-link>
          </div>
    </div>

        

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
    font-size:20px;
    display:grid;
    

}




</style>