<template>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>
  <body>
    <div class="quizbody">
        <div class="nameQuizSectionWrapper">  
          <div id="Quizname">
            <input placeholder="Name of quiz" type="text" v-model="pollId">
            <button>
              <img src="../../img/settings.png"/>
            </button>
          </div>
      </div>
    
      <div class="questionAnswer">
        <br />
        <p> {{uiLabels.questionNumber}} </p>
        <input type="number" v-model="questionNumber">
        <br />
        <p> {{uiLabels.question}}:</p>
        <input type="text" v-model="question">
        
        <br />      
        
        
        <div class="answer">
          <p> Answers:</p>
          <br />

          <!-- 
           mikaels
          <input placeholder="One answer" v-for="(_, i) in answers" 
                 v-model="answers[i]" 
                 v-bind:key="'answer'+i"> 
          <br />  -->

           <div class="Answerbox" v-for="(_, i) in answers"  :key="i">
            <button>✔</button>
             <input class="answerAlt" v-model="answers[i]" placeholder="Works now?" type="text"/>

             <button class="Xbutton" v-on:click="removeAnswer(i)">X</button>
             <button>
                <img class="answerSettings" src="../../img/settings.png"/>
             </button>
             <br /> 
             <br />
           </div>

     
        

          <br />

          <button v-on:click="addAnswer">
            Add answer alternative
          </button>


          <br />

        </div>

      </div>

      <div class="questionAnswer">
        <div id="addQuestion">
          <button v-on:click="addQuestion">
            Add question
          </button>
          <br />
        </div>
      </div>
      
      <button v-on:click="createPoll">
        Create/Save Quiz
      </button>
      
      <button v-on:click="runQuestion">
        Start quiz
      </button>
      <br />
      {{data}}
      <br />
      <br />
      <button> 
        <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
      </button> 

    </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'CreateView',


  
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",



      //mikaels
      answers: ["", ""],

      //egenskrivet
      //right_answer: ['<button class="rightAnswer">✔</button>', '<input v-model="answers[i]" placeholder="One answer" type="text"/>', '</br>'],

      items: [],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)

    /*this.items.push(this.right_answer);*/
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },

    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },

    //egenskrivet 

    addMarkAsRightAnswer: function () {
      //this.right_answer = ['</br><input type="text"/>','<input type="text"/></br>'];

      this.right_answer = ['<button class="rightAnswer">Right answer</button>', '<input placeholder="One answer" type="text"/>'];
      this.items.push(this.right_answer);


    },



    //mikaels
    addAnswer: function () {
      this.answers.push("");
    },

    //Den här skall vid tillfälle skrivas om så att den funkar för att ta bort ett specifikt svar.
    removeAnswer: function(i){
      if (this.answers.length > 1){
        this.answers.splice(i,1);
        console.log("jag pop")
      }
      else {
        console.log("nejnej aja baja")
      }
    },


//Miakel
 /*removeAnswer: function(){
      if (this.answers.length > 1){
        this.answers.pop("");
        console.log("jag pop")
      }
      else {
        console.log("nejnej aja baja")
      }
    },
*/





    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>



<style>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

.quizbody {
  width: 50vw;
  height: 100%;
  margin-left: 25%;
  background: #CBE896;

}


#OverallStructure
{


}

.questionAnswer{
  background: #ECECEC;
}

.answer{
  /*margin:30px;*/
  background: #ECECEC;

}
#addQuestion{
  /*margin:30px;*/
}



.answerAlt {
  background: #ECECEC;

}

p {
  display:inline;
  background: #ECECEC;
  font: 2vw Inter;
}

input[type=text] {
  width: 50%;
  height: 8vh;
  /* padding: 12px 20px;
  margin: 8px 0;*/
  font: 1.5vw Inter;
  border: 0px;
  /* box-sizing: border-box;*/
  background: white;
}

.nameQuizSectionWrapper {
  height: 100%;
  width: 100%;

}

button {
  border-radius: 1em;
  margin: 0px 10px 0px 10px;
  width: 10vw;
  height: 60px;
  max-width: 70px;
  min-width: 40px; 




  /* padding-bottom: 10%;
  padding-right: 10%;*/
  font: 1vw Inter;
  

  background: #D7D7D7;
}  

answerAlt {
  font: 2em Inter;

}

.Xbutton{
width: 30px;
height: 30px;
position: absolute;
margin-left: -3.15%;
margin-top: 0.25%;
padding-bottom: 0;
  padding-right: 0;
}



.Answerbox{
background-color: #ECECEC;  
}


#Quizname
{
  color:black;
  font: 3vw Inter;
  /* position: relative; */
  background: #ECECEC;
  margin-bottom: 3vh;

  
}

#Quizname > input
{
  color:black;
  font: 3vw Inter;
  background: #ECECEC;
  text-align: center;
  margin: 3 vh;
}

#Quizname > button
{
  width: 6em;
  height: 6em;
  margin: 1em;
}

#Quizname > button > img {
  background: #D7D7D7;
  height: 4vh;
  width: 4vh;
}

.answerSettings {
  background: #D7D7D7;
  height: 4vh;
  width: 4vh;

}


::-webkit-input-placeholder-shown /* Chrome/Opera/Safari */
{
  color:grey;
  font-family: 'Inter', sans-serif;
  font: 24px Inter;
  text-align: center;
}

::-webkit-input-placeholder /* Chrome/Opera/Safari */
{
  color:grey;
  font-family: 'Inter', sans-serif;
  font: 24px Inter;
  text-align: center;
}



* {background-color: #CBE896}




</style>