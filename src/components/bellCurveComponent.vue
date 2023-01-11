<template>


  <div class="wrapper">
  <h3>"Bell Curve"</h3>
  <div class="barArea">
  <div class="questionBarWrapper" v-for="(questionResultObject, key) in data.poll" v-bind:key="key">
    <div class="questionBarsOnly">


    </div>
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
  }



</script>
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
.bar:nth-child(n) div:nth-child(n) {
  background-color: #1CC970
 /*rätt*/
;
}
  /*.bar:nth-child(2) div:nth-child(1) {
  background-color: #F30B6A


  ;
}*/


.wrapper {
  padding:3em;
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5vh;
}
</style>