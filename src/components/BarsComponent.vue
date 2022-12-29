<template>
<div class="wrapper">


  <button @click="checkQuestions">
    Check
  </button>  
  questionresultCounter
  {{questionResultCounter}}

  <div class="barArea">

  <div v-for="(questionResultObject, key) in questionResultCounter" v-bind:key="key">
    <div class="bar">
      <div class="barItem" v-bind:style="{height: questionResultCounter[key].correctAnswers*10 + 'px'}">
        <span> NY </span>
      </div>
      <br />
      <br />

    </div>
    <div class="bar">
      <div class="barItem" v-bind:style="{height: questionResultCounter[key].wrongAnswers*10 + 'px'}">
        <span> NY2 </span>
      </div>

    </div>
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
  data: function () {
    return {

      questionResultCounter:[],
    }
  },


  props: {
    data: Object,
   },

    methods: {
    checkQuestions: function () {
      console.log("eyy")
      console.log("this.data", this.data)
      this.data.poll.questions.forEach(question => {
        let correctAnswers=0;
        let wrongAnswers=0;

        this.data.pollParticipants.forEach(participant=>{
          participant.answers.forEach(answer=>{
            if ((question.id===answer.questionID)&&(answer.correct)){
              correctAnswers+=1
            }
            else if((question.id===answer.questionID)&&(!answer.correct)){
              wrongAnswers+=1
            }
            console.log(answer)


          })
          console.log(participant)


        })
      console.log(question)

      this.questionResultCounter.push({questionID:question.id, correctAnswers,wrongAnswers})



      })





    }



    },


  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span {
  color:var(--background-color);
}

.barArea {
  display: flex;
  background-color: gray;
  border-bottom: 5px black solid;
  border: 10px yellow dashed;
}

.bar {
  width: 50px;
}
.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:green;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:red;
}


.wrapper {
  padding:3em;
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
