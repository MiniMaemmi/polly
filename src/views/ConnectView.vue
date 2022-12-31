<template>
<div>
    <h1 style="font-size:50px">{{uiLabels.connectTitel}}</h1>
    
    <div>
      <div id="nameAndID">
        
        <label>
        {{uiLabels.quizid}}: 
        <input type="text" style="height:50px; font-size:20px; " v-model="id" placeholder="Ex: 123">
        </label>
        <br/>
        <br/>

        <label>
          {{uiLabels.username}}:
            <input type="text" style="height:50px; font-size:20px; margin-top:15px; margin-bottom:15px"  v-model="username"  placeholder="Ex: Ben Dover">
            <div>
                <router-link
                
                v-bind:to="'/waiting/'+ id"
                custom
                v-slot="{ navigate }">
                <button v-on:click="createUser" :disabled="!username.length||!id.length" 
            
                @click="navigate"
                role="link"
                >
                {{uiLabels.displayJoinPoll}}
                </button>
                </router-link>
            </div>



          </label>
        <br />
        

        <br />
        <div>
              <router-link
                v-bind:to="'/'+ lang"
                custom
                v-slot="{ navigate }">
                <button  
            
              @click="navigate"
              role="link"
                >
                {{uiLabels.back}}
              </button>
              </router-link>
          </div>

          <h1>För att komma till PollView just nu</h1>
            <button v-on:click="createUser">
              <router-link v-bind:to="'/poll/'+id+'/'+ lang + '/' +username">{{uiLabels.participatePoll}}</router-link>
            </button>
    </div>

        

            <!--button v-on:click="createUser"><router-link v-bind:to="'/waiting/'+username">Connect to quizz</router-link></button-->
          
</div>


</div>



</template>


<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'ConnectView',
  data: function () {
    return {
      
      uiLabels: {},
      id: "",
      lang: "",
      hideNav: true,
      username: ""
    }
  },

  
  created: function () {
    this.lang = this.$route.params.lang;

      socket.emit("pageLoaded", this.lang);

      socket.on("init", (labels) => {
        this.uiLabels = labels
      })


    },

   /*socket.on("init", (labels) => {
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
    },*/

  methods: {
    




    //this one, createUser is added
    createUser: function() {
      //console.log("------- i createUser StartView.vue ------ ") 
      //console.log("Username: ", this.username)
      socket.emit("createUser", this.username)
      console.log("Username: ", this.username)

    },
    isFormFilled: function(){
      //console.log("hej")
    }
  }
  
  
}

</script>

<style scoped>

#nameAndID{
    margin:50px;
    font-size:20px;
    display:grid;
    

}




</style>