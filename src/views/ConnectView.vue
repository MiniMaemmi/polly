<template>
  <body class="animationGradient">
    <div class="wrapper">
      <div class="goBackButtonDiv">
        <button class="custom-btn goBackButtonPosition" @click="this.$router.push('/' + this.lang)">{{uiLabels.back}}</button>
      </div>

      <div class="contentArea lightYellowBox shadowIt">
        <div class="header">
          <h1>{{uiLabels.connectTitel}}</h1>
        </div>
        
        
        <div class="labelAndInputArea">
          <div class="labelAndInput">
            <label>{{uiLabels.quizid}}:</label>
          </div>

          <div class="labelAndInput">
            <input type="text" v-model="id" placeholder="123">
          </div>
        </div>

        <div class="labelAndInputArea">
          <div class="labelAndInput">
            <label>{{uiLabels.username}}:</label>
          </div>

          <div class="labelAndInput">
            <input type="text" v-model="username" maxlength="15" placeholder="Anna Andersson">
          </div>
        </div>
        
        <div>
          <button class="custom-btn" :disabled="!username.length||!id.length" @click="createUser()"> {{uiLabels.displayJoinPoll}}</button>
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

  methods: {
    createUser: function() {
      socket.emit("createUser", this.username)
      this.$router.push('/waiting/'+ this.id+'/'+this.lang + '/' + this.username)
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