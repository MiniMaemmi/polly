<template>
  <body>
<div class="wrapper">
  <div class="goBackButtonDiv">
    <router-link v-bind:to="'/'+ lang" custom v-slot="{ navigate }">
      <button class="custom-btn goBackButtonPosition" @click="navigate" role="link">
        {{uiLabels.back}}
      </button>
    </router-link>
  </div>

  <div class="contentArea lightYellowBox shadowIt">
    <div class="header">
      <h1>{{uiLabels.connectTitel}}</h1>
    </div>
  
    <div>
        <div class="testArea">
          <div class="labelAndInputArea">
            <div class="labelAndInput">
              <label> 
              {{uiLabels.quizid}}: 
            </label>
            </div>
            <div class="labelAndInput">
              <input type="text" v-model="id" placeholder="123">
            </div>
          </div>
          <div class="labelAndInputArea">
            <div class="labelAndInput">
               <label>
                {{uiLabels.username}}:
              </label>
            </div>
            <div class="labelAndInput">
              <input type="text" v-model="username"  placeholder="Anna Andersson">
            </div>
          </div>
        </div>




        <!-- 
        <div class="labelArea">
            
             <label>
              {{uiLabels.username}}:
            </label>
        </div>
        <div class="labelArea">
           <input type="text" v-model="id" placeholder="Ex: 123">
           <input type="text" v-model="username"  placeholder="Ex: Ben Dover">
        </div>-->
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

h1 { margin: 0 0 10px; }

.goBackButtonDiv {
  width: 100%;
  height: 11vh;
  display: inline;
}

.labelAndInputArea label {
  font-family: Inter;
  font-weight: 400;
  font-size: 2em;
  margin: 3%;
}

.labelArea {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.labelArea input{
  width: 100%;
}

.labelArea div {
  background-color: coral;
  width: 100%;
  height: 50%;
  margin: 5%;
}

.testArea {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.labelAndInputArea {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;

}

.labelAndInput {
  width: 50%;
  align-self: center;
  margin: 1%;
  display: flex;
  justify-content: flex-end;


}

.labelAndInput input {
  width: 100%;
}

.labelAndInput label {
  align-self: flex-end;
}

.custom-btn {
  width: 50%;
  margin: 10%;
}




/* 1050 bryts knapparna.
900 bli större vit ruta. Bör ha vit padding
726 bryts knapparna igen
500 ha helt vit ruta

*/

@media screen and (max-width:1100px) {

    .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 20% !important
    }

    .goBackButtonDiv {
      margin-bottom: 5%;
    }

    .contentArea {
        margin-left: 10%;
        margin-right: 10%;
        flex:  flex-wrap;
    }
}

@media screen and (max-width:800px) {
    .contentArea {
        margin-left: 5%;
        margin-right: 5%;
        flex:  flex-wrap;
    }

    .custom-btn {
        width: 70%;
        margin-top: 15%;

    }

    .goBackButtonDiv {
      margin-bottom: 5%;
    }



}


@media screen and (min-width:300px) and (max-width: 450px) {

    .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 30% !important;
    }
    h1 {
        font-size: 3em;
    }

    .labelAndInputArea {
        /*display: inline !important;*/
        display: flex;
        flex-direction: column;
        justify-content: center;

    }

    .labelAndInput{
      justify-content: center !important;
      width: 80%;
    }

    input {
      font: 1.5em Inter;
    }
}

@media screen and (min-width:200px) and (max-width: 310px) {

    .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 50% !important;
    }
    h1 {
        font-size: 3em;
    }

    .contentArea {
        margin-left: 0%;
        margin-right: 0%;
        flex:  none !important;
        display: inline;
    }

    .testArea {
        display: inline;
    }

    .labelAndInputArea {
        display: flex;
        flex-direction: column;
        justify-content: center;

    }


    .labelAndInput{
      justify-content: center !important;
      width: 80%;
    }

    input {
      font: 1.5em Inter;
    }


}




</style>