<template>
<div class="wrapper">
  <div class="header">
   <h3 v-if="this.lang === 'sv'">Resultat per fråga</h3>
   <h3 v-if="this.lang === 'en'">Result per question</h3>
  </div>
  <div class="barArea">
  <div class="questionBarWrapper" v-for="(questionResultObject, key) in data.questionResultCounter" v-bind:key="key">
    <div class="questionBarsOnly">
    <div class="bar">
      <div v-bind:style="{height: data.questionResultCounter[key].correctAnswers*30 + 'px'}">
        <span v-if="data.questionResultCounter[key].correctAnswers>0"> {{data.questionResultCounter[key].correctAnswers}} </span>
        
      </div>
    </div>
    <div class="bar">
      <div v-bind:style="{height: data.questionResultCounter[key].wrongAnswers*30 + 'px'}">
        <span v-if="data.questionResultCounter[key].wrongAnswers>0"> {{data.questionResultCounter[key].wrongAnswers}} </span>
      </div>

    </div>
    </div>
    <span class="questionNumber">{{key+1}} </span>
  </div>

</div>
</div>
</template>

<script>
export default {
  name: 'BarsComponent',
  props: {
    data: Object,
   },
   data:function(){
    return{
      lang:""
    }
   },
   created: function() {
    this.lang = this.$route.params.lang;
  }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

span {
  color: black;
  font: 1.5em Inter;
  font-weight: 100;

}

h3 {
  display: inline;
  font: 3em Inter;
  font-weight: 400;
}

.barArea {
  display: flex;
  flex-direction: row;
  font: 1.5vw Inter;
  padding: 2%;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.questionBarWrapper {
  width: 15%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-direction: column;
  margin-left: 1%;
  margin-right: 1%;
}

.questionNumber {
  color: black;
  font: 1.5em Inter;
  font-weight: 700;
}

.questionBarsOnly{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: auto;
  border-bottom: 0.25vh black solid;
  height: 80%;

}

.bar {
  width: 50px;
  margin-top: auto;
}
.bar span {
  position: relative;
  top: -1.2em;
  
}
.bar:nth-child(1) div:nth-child(1) {
  background-color: #1CC970
 /*rätt*/
;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color: #F30B6A


  ;
}


.wrapper {
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5vh;
  height: 90%;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  justify-content: flex-start;
}

@media screen and (max-width: 400px) {

  .header h3 {
    display: inline;
    font: 2em Inter;
    font-weight: 400;
  }

  .questionNumber{
    font: 3em Inter;

  }


}

@media screen and (max-width: 800px) {

  .questionBarWrapper{
      width: 20%;
  }

  span {
    font: 2em Inter;
  }



}
</style>