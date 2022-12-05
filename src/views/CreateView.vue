<template>
  <head>
  </head>
  <body>
    <div class="quizbody">
        <div class="nameQuizSectionWrapper">  
          <div id="Quizzname">
            <input placeholder="Namn på ditt quiz" type="text" v-model="pollId">
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

          <br />  


           <input placeholder="My new answer" v-for="(_,i) in answers" v-model="answers[i]" v-bind:key="'answer'+i"> -->

           <div v-for="(_, i) in answers"  :key="i">
             <input v-model="answers[i]" placeholder="Works now?" type="text"/>
             <button>mybutton</button> <span>{{ answers[i] }}</span>
           </div>

        <!--
        <span v-for="item in items" v-bind:key="'test'+item">
         <span class="answerAlt" v-html="item[0]"></span> 
          <span class="answerAlt" v-html="item[1]"></span>
          <span class="answerAlt" v-html="item[2]"></span>
          
            <span class="answerAlt" v-html="item[3]"></span>
          <span class="answerAlt" v-html="item[4]"></span>
          <span class="answerAlt" v-html="item[5]"></span> 
        </span>-->
        

          <br />

          <button v-on:click="addAnswer">
            Add answer alternative
          </button>

          <button v-on:click="removeAnswer">
            Remove an answer alternative
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
        Create/Save Quizz
      </button>
      
      <button v-on:click="runQuestion">
        Start quizz
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

    this.items.push(this.right_answer);
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

    //egenskriven
    /* 
    addAnswer: function () {
      //this.right_answer = ['<div class="rightAnswerAndInput">', '<button class="rightAnswer">✔</button>', '<input placeholder="One answer" type="text"/>',
      '</div>', '</br>'];
      this.right_answer = ['<button class="rightAnswer">✔</button>', '<input placeholder="One answer" type="text"/>', '<br />'];
      this.items.push(this.right_answer);
      //this.answerGroup = ['<input placeholder="One answer">'];
      //this.answers.push(this.answerGroup);
    },*/


    //mikaels
    addAnswer: function () {
      this.answers.push("");
    },

    //Den här skall vid tillfälle skrivas om så att den funkar för att ta bort ett specifikt svar.
    removeAnswer: function(){
      if (this.answers.length > 1){
        this.answers.pop("");
        console.log("jag pop")
      }
      else {
        console.log("nejnej aja baja")
      }

    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>



<style>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

.quizbody {
  width: 50em;
  height: 100%;
  margin-left: 20em;
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

.rightAnswer {
  /* width: 5em;
  height: 5em;*/
  width: 10%;

}

.answerAlt {
  background: #ECECEC;

}

p {
  display:inline;
  background: #ECECEC;
  font: 16px Inter;
}

input[type=text] {
  width: 50%;
  height: 5em;
  /* padding: 12px 20px;
  margin: 8px 0;*/
  font: Inter 44;
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
  width: 10em;
  height: 6em;
  font: 16px Inter;

  background: #D7D7D7;
}  

answerAlt {
  font: 24px Inter;

}






#Quizzname
{
  color:black;
  font: 24px Inter;
  /* position: relative; */
  background: #ECECEC;
  margin-bottom: 1em;

  
}

#Quizzname > input
{
  color:black;
  font: 24px Inter;
  background: #ECECEC;
  text-align: center;
  margin: 1em;
}

#Quizzname > button
{
  width: 6em;
  height: 6em;
  margin: 1em;
}

#Quizzname > button > img {
  background: #D7D7D7;
  height: 4em;
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

h1 {
  font: 32px Inter;

} 

* {background-color: #CBE896}




</style>