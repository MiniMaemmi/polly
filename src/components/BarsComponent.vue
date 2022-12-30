<template>
<div class="wrapper">
  <h3>Resultat per fråga</h3>
    

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
    <!--
    <div v-bind:style="{height: 5 + 'px'}">
      <span> {{key+1}} </span>

    </div>
    <div  v-bind:style="{height: 100 + 'px'}">
      <span> {{key+1}} </span>

    </div>-->
  
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

  created: function () { 
    //this.checkQuestions()


  },


  

    methods: {
    



    },


  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

span {
  color: black;

}

.barArea {
  display: flex;
  /*background-color: gray;*/
  /*border: 1px yellow dashed;*/
  flex-direction: row;
  font: 1.5vw Inter;
  padding: 2%;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.questionBarWrapper {
  width: 15%;
  height: 20vh;
  /*border: 3px purple dotted;*/
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-direction: column;
  margin-left: 1%;
  margin-right: 1%;
}

.questionNumber {
  color: black;
  font: Inter;
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
  padding:3em;
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5vh;
}
</style>






<!-- mikaels orginal
<template>
<div class="wrapper">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: item + 'px'}">
      <span> {{item}} </span>
    </div>
    <div> 
      {{key}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BarsComponent',
  props: {
    data: Object
  }
}
</script>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>

span {
  color:var(--background-color);
}
.bar {
  display: inline-block;
  width: 50px;
  vertical-align: bottom;
}

.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:red;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}

.wrapper {
  padding:3em;
}
</style>-->
