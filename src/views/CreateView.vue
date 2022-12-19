<template>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>
  <body>
    <div class="quizbody" v-on:click="createPoll">
        <div class="nameQuizSectionWrapper">  
          <div id="Quizname">
            <input placeholder="Name of quiz" type="text" v-model="quizName">
            <button>
              <img src="../../img/settings.png"/>
            </button>
          </div>
      </div>

      <div class="addNewQuestionArea" v-for="(_, i) in addNewQuestionArea" :key="i">
        <div class="questionAnswer">
          <br />
          <p> {{uiLabels.questionNumber}} </p>
          <input type="number" v-model="questionNumber">
          <br />
          <p> {{uiLabels.question}}:</p>
          <input type="text" v-model="question[i]">
        
          <div id="app">

              <input id="fileinput" type="file" @change="onFileChange" />
              <button v-on:click="removePicture">X</button>

              <div id="preview">
              <img v-if="url" :src="url" />
            </div>
          </div>
          <br />      
          
          
          <div class="answer">
            <br />
            <br />
            <br />
            <p> Answer alternatives:</p>
            <br />

            <!-- 
             mikaels
            <input placeholder="One answer" v-for="(_, i) in answers" 
                   v-model="answers[i]" 
                   v-bind:key="'answer'+i"> 
            <br />  -->

             <div class="Answerbox" v-for="(_, k) in answerAlternative[i]"  :key="k">
              <button>✔</button>
               <input class="answerAlt" v-model="answerAlternative[i][k]" placeholder="Works now?" type="text"/>
               <button class="Xbutton" v-on:click="removeAnswer(k)">X</button>
               <button>
                  <img class="answerSettings" src="../../img/settings.png"/>
               </button>
               <br /> 
               <br />
             </div>
            <br />
            <button v-on:click="addAnswer">
              {{uiLabels.addAnswer}}
            </button>
            <br />
          </div>
        </div>
      </div>  
    
        <div id="addQuestion">
          <button id="addQuestionButton" v-on:click="addQuestion">
            Add question
          </button>
          <br />

          {{data}}
          <br />


          <button id="addQuestionButton" v-on:click="saveQuestion">
            Save question
          </button>
          <br />
        </div>
    </div>

    <div class = "endOfQuizBody">

      <!-- 
      <button v-on:click="createPoll">
        Create/Save Quiz
      </button>
      -->
      <br />

      <button v-on:click="runQuestion">
          STARTA & DELA POLL
        </button>
        <br />

        <br />
        <br />

      <button> 
          <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
        </button>
    </div> 


    <div>
              <router-link
                v-bind:to="'/quizleaderStartView/'+lang"
                custom
                v-slot="{ navigate }">
              <button  
            
              @click="navigate"
              role="link"
               >
            STARTA QUIZ
          </button>
              </router-link>
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
      question: [],
      url: null,
      questionNumberCounter: "",
      quizName: "",


      DataQuestionBodyArray: [],
      questionId: 0,


      //mikaels
      //answerAlternative: ["", ""],

      answerAlternative: {
        0: ["", ""],
        1: ["", ""],
      },


      addNewQuestionArea: [""],

      items: [],
      questionNumber: [],
      data: {},
      uiLabels: {},

    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    //this.DataQuestionBodyArray = [];
    this.pollId = (Math.random().toFixed(5)*1000000);

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

    saveQuestion: function () { //kallades förut addQuestion
      console.log("In Createview. Saving question")
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answerAlternative } )

    },

    //mikaels
    /* 
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answerAlternative } )
    },*/

    addQuestion: function() {
      this.addNewQuestionArea.push("");
      //this.questionId = this.DataQuestionBodyArray.length+1;
      this.questionId = this.DataQuestionBodyArray.length;

      console.log("QuestionID: ", this.questionId)
      this.DataQuestionBodyArray.push({question: this.question[this.questionId], answerAlternative: this.answerAlternative[this.questionId], questionId: this.questionId});

      console.log(" addQuestion() DataQuestionBodyArray:", this.DataQuestionBodyArray[this.questionId]);




    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },

    //egenskrivet 

    addMarkAsRightAnswer: function () {
      //this.right_answer = ['</br><input type="text"/>','<input type="text"/></br>'];

      this.right_answer = ['<button class="rightAnswer">Right answer</button>', '<input placeholder="One answer" type="text"/>'];
      this.items.push(this.right_answer);


    },



    //mikaels
    addAnswer: function () {
      this.answerAlternative.push("");
      //this.answerAlternative[this.questionId].push("");
    },

    //Den här skall vid tillfälle skrivas om så att den funkar för att ta bort ett specifikt svar.
    removeAnswer: function(i){
      if (this.answerAlternative.length > 1){
        this.answerAlternative.splice(i,1);
        console.log("jag pop")
      }
      else {
        console.log("nejnej aja baja")
      }
    },
    removePicture: function(){
      this.url=null;


    },


//Mikael
 /*removeAnswer: function(){
      if (this.answerAlternative.length > 1){
        this.answerAlternative.pop("");
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

}

.addNewQuestionArea {
  margin: 20px;
}



.endOfQuizBody{
  padding-top: 10px;

}


#OverallStructure
{


}

.questionAnswer{
  background: #ECECEC;
  padding-bottom: 5%;

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

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
  background-color: #ECECEC ;
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

#addQuestionButton {
    margin: 20px;

}


#app{
background-color: #ECECEC;

}

#fileinput{
background-color: #ECECEC;


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

@media screen and (max-width:760px) {
  body{background-color: black;}


  button {
    border-radius: 1em;
    margin: 0px 10px 0px 10px;
    width: 20vw;
    height: 60px;
    max-width: 500px;
    min-width: 40px; 


    font: 1vw Inter;
    

    background: #D7D7D7;
  }  

  .quizbody {
    width: 100%;
    height: 100%;
    margin: 0%;
    background: #CBE896;
  }

  
  }

  @media screen and (max-width:450px) {
    body{background-color: black;}


    button {
      border-radius: 1em;
      margin: 0px 10px 0px 10px;
      width: 20vw;
      height: 60px;
      max-width: 500px;
      min-width: 40px; 


      font: 1vw Inter;
      

      background: #D7D7D7;
    }  

    .quizbody {
      width: 100%;
      height: 100%;
      margin: 0%;
      background: #CBE896;
    }

    
    }


</style>