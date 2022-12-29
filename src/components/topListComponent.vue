<template>
  <div class="wrapper">
    <div class="header">
      <h3> Topplista </h3>
    </div>
    <table>
      <div class="usernameContainer">
        <tr>
          <th>Username</th>
        </tr>
        <div v-for="(topListObject,key) in topListAndUsername.topList" v-bind:key="topListObject"> 
          <div v-if="(key<maxNumberInTopList) || (this.username !== '')">
            <tr>
              <td>{{key+1}}: {{topListObject.username}}</td>
            </tr>
          </div> 
        </div>
      </div>
        <div class="scoreContainer">
        <tr>
          <th>Score</th>
        </tr>
      <div v-for="(topListObject,key) in topListAndUsername.topList" v-bind:key="topListObject">
        <div v-if="key<maxNumberInTopList || (this.username !== '')">  
          <tr>
              <td>{{topListObject.totalScore}}</td>
          </tr>
        </div>   
      </div>
    </div>   
    </table>  
  </div>
 
</template>
<script>
export default {
  name: 'topListComponent',
  props: {
    topListAndUsername: {
      topList: [],
      username:"",
    }
    /*topList: [],
    username:"",*/
  },
  data: function () {
    return {
      uiLabels: {},
      maxNumberInTopList:3,
      username: this.topListAndUsername.username,
    }
  },
  //emits: ["answer"],
  //methods: {
    /*answer: function (answer) {
      console.log("----i QuestionComponent----")
      console.log("answer: ", answer)
      this.$emit("answer", answer);
    }*/
  //}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

table {
  height: 90%;
  width: 100%;
  display: flex;
  font-weight: 100;
  margin-top: 10%;

}  

.header h3 {
  display: inline;
  font: 3em Inter;
  font-weight: 400;
}

.wrapper {
  height: 90%;
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 10%;
  


  
}

.usernameContainer, .scoreContainer{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;

}

.usernameContainer tr,  .scoreContainer tr{
  display: flex;
  justify-content: center;
  border-bottom: 1px black dashed;
}

.usernameContainer th, .scoreContainer th{
  align-self: center;
  font: 2em Inter;
  font-weight: 400;
  margin-bottom: 5%;

}

.usernameContainer td, .scoreContainer td {
  font: 2em Inter;
  font-weight: 100;
  align-self: flex-start;


}



</style>