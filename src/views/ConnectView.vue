<template>
  <body>
<div class="wrapper">
  <div class="contentArea lightYellowBox shadowIt">
    <div class="header">
    <h1>{{uiLabels.connectTitel}}</h1>
    </div>
  
    <div>
      <div id="nameAndID">
        <div class="labelAndInputArea">
        <label>
          {{uiLabels.quizid}}:
          <!-- <input type="text" style="height:50px; font-size:20px; " v-model="id" placeholder="Ex: 123">-->
          </label>
          <input type="text" v-model="id" placeholder="Ex: 123">
        
      </div>
        <div class="labelAndInputArea">
          <label>
            {{uiLabels.username}}:
          </label>
            <!-- <input type="text" style="height:50px; font-size:20px; margin-top:15px; margin-bottom:15px"  v-model="username"  placeholder="Ex: Ben Dover">-->
            <input type="text" v-model="username"  placeholder="Ex: Ben Dover">
        
        </div>
      </div>    
            <div>
                <router-link
                
                v-bind:to="'/waiting/'+ id"
                custom
                v-slot="{ navigate }">
                <button class="custom-btn" v-on:click="createUser" :disabled="!username.length||!id.length" 
            
                @click="navigate"
                role="link"
                >
                {{uiLabels.displayJoinPoll}}
                </button>
                </router-link>
            </div>



          
        <div>
              <router-link
                v-bind:to="'/'+ lang"
                custom
                v-slot="{ navigate }">
                <button class="custom-btn goBackButtonPosition" 
            
              @click="navigate"
              role="link"
                >
                {{uiLabels.back}}
              </button>
              </router-link>
          </div>

          <h3>För att komma till PollView just nu</h3>
            <button class="custom-btn" v-on:click="createUser">
              <router-link v-bind:to="'/poll/'+id+'/'+ lang + '/' +username">{{uiLabels.participatePoll}}</router-link>
            </button>


        

            <!--button v-on:click="createUser"><router-link v-bind:to="'/waiting/'+username">Connect to quizz</router-link></button-->
          
</div>

</div>
</div>


</body>
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
@import '@/assets/css/style.css';
#nameAndID{
  /*
    margin:50px;
    font-size:20px;
    display:grid;*/
    display: flex;
    flex-direction: column;
    

}
h1 { margin: 0 0 10px; }

.wrapper {
  width: 100%;
  padding: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;


}

.contentArea {
  margin-left: 20%;
  margin-right: 20%;
  height: 100%;
}

.labelAndInputArea {
  padding: 3%;
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

}

.labelAndInputArea label {
  font-family: Inter;
  font-weight: 400;
  font-size: 2em;
  margin: 3%;
}










</style>