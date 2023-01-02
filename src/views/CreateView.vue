<template>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>
  <body>
    <div class="quizbody">
        <div class="nameQuizSectionWrapper lightYellowBox shadowIt">  
          <div id="Quizname" >
            <input  v-bind:placeholder="uiLabels.quizName" type="text" v-model="quizName">
              <!--KUGGHJULET-->
            <button class="custom-btn-quadratic">
              <img class="questionSettings" src="../../img/settings2.png"/>
            </button>
          </div>
        </div>

      <div class="addNewQuestionArea">

        <div class="questionAnswer lightYellowBox shadowIt" style="margin-bottom:25px; margin-top:25px;" v-for="question in questions" v-bind:key="'question'+question" >
          <div class="questionOperations">
            <div class="upDownButtonPair">
              <button :disabled="question.id === this.questions[0].id" class="upDownButton" @click="changeQuestionOrder(question.id, true)">
                  <img src="../../img/Up.png">
                </button>
                <button :disabled="question.id === this.getArrayLastElementId(this.questions)" class="upDownButton" @click="changeQuestionOrder(question.id, false)">
                  <img src="../../img/down.png">
                </button>
            </div>

            <input class="questionInput" v-bind:placeholder="uiLabels.question" v-model="question.label" v-bind:key="'question-label'+question"  >

            <button class="custom-btn-quadratic" @click="removeQuestion(question.id)" >
              {{uiLabels.removeQuestion}}
            </button >
            </div>
            <div id="app">
                <input id="fileinput" type="file" @change="onFileChange" />
                <button v-on:click="removePicture">X</button>
                <div id="preview">
                  <img v-if="url" :src="url" />
                </div>
            </div>
            <div v-for="answer in question.answers" v-bind:key="'answer'+answer" v-on:keyup.enter="focusNext($event)"   
            >
              <!--<div class="box2">
                <p> "Pop-up" box </p>
                
              </div>-->
 
                <div class="answerBox lightYellowBox tooltip" id="inputAnswerbox">
                    <button class="custom-btn-quadratic tooltipclass"
                      :class="{
                          'answerCorrect': answer.correct,
                      }"
                       @click="markAsCorrect(question.id, answer.id)"> <span class="tooltiptext">{{uiLabels.tooltip}}</span>
                      <img src="../../img/checkmark.png">
                   </button>
                        <input v-bind:placeholder="uiLabels.answer" type="text" v-model="answer.label" :key="answer">
                        <!--<input id="inpuut" v-bind:placeholder="uiLabels.answer" type="text" v-model="answer.label" 
                        :key="answer" 
                        >-->

                    <button class="Xbutton custom-btn-quadratic" @click.prevent="removeAnswer(question.id, answer.id)">
                      <img src="../../img/x.png">
                    </button>
                    <!-- <button class="custom-btn-quadratic">
                      <img class="answerSettings" src="../../img/settings.png"/>
                    </button>-->
                </div>
            </div>
            <button class="custom-btn"  @click.prevent="addAnswer(question.id)">
              {{uiLabels.addAnswer}}
            </button>

        </div>
    
        <div>
            <button class="custom-btn"  @click="addQuestion">
                <!--Add question-->
                {{ uiLabels.addQuestion }}
            </button>
        </div>
                <router-link
                  v-bind:to="'/quizleaderStartView/'+lang+'/'+this.pollId+'/'+this.quizName"
                  custom
                  v-slot="{ navigate }">
                <button class="custom-btn" style="position:fixed; bottom:0; right:0; height:150px; width:150px; "   
                @click="saveQuiz(), navigate()"
                role="link"
                :disabled="!quizName.length"
                >
                {{uiLabels.startQuiz}}
            </button>
                </router-link>
        <div>
            <button class="custom-btn"  @click="saveQuestionsAsJson"> 
              {{uiLabels.saveAsJson}}
            </button>
        </div>

              
        <div>
            <button class="custom-btn"  @click="loadJson">
              {{uiLabels.loadAJson}}
            </button>
        </div>
        <div>
              <router-link
                v-bind:to="'/'+ lang"
                custom
                v-slot="{ navigate }">
                <button class="custom-btn goBackButtonPosition"
            
              @click="navigate"
              role="link"
                >
                {{uiLabels.back}}
              </button>
              </router-link>
          </div>
    
    </div>

  </div>  

  </body>
</template>

<script>
  import io from 'socket.io-client';
  const socket = io();

export default {
    computed: {
        data() {
            return JSON.stringify(this.questions)
        }
    },
    data() {
        return {
          quizName: "",
          iterator: 2,
          url: null,
          lang: "",
          uiLabels: {},
          baselineScore: 5,
          activeColor: 'green',
            questions: [
                {
                    id: 1,
                    label: '',
                    answers: [
                        { id: 0, label: '', correct: false, score:0, feedback:'du är fel', answerImage: ''},
                        { id:1, label: '', correct: false, score:0, feedback:'rätt som en plätt', answerImage: ''},
                    ],
                },
              
            ],


            /*till svar?*/
            answers: [
                {
                    questionId: 1,
                    answerId: 1,

                },
                {
                    questionId: 2,
                    answerId: 4,
                }
            ],
        }
    },


    created: function () {
      this.lang = this.$route.params.lang;
      //this.DataQuestionBodyArray = [];
      this.pollId = Math.round((Math.random().toFixed(5)*1000000));

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
      //de här var ungefär 100 gånger jobbigare än jag trodde de skulle vara. 
      focusNext: function(ev){
        console.log("ev.target",ev.target)
      
        var parents=document.querySelectorAll("#inputAnswerbox")
      
        for (let i = 0; i < parents.length;i++)
         {
            var child = parents[i].children[1];
            if (child === ev.target){
              parents[i+1].children[1].focus()
              break;
           
            } else{
              console.log("den va slut")
            }
            
            }
                                        
      },
      

      //egenskrivet
      createPoll: function () {
        console.log("i CreateView createPoll()")
        console.log("skickat till socket: ", this.pollId, this.lang, this.questions )
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang, questionsObjectArray: this.questions})
      },

      //mikaels orginal?
      /*
      createPoll: function () {
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
      },*/



        markAsCorrect(questionId, answerId) {
            this.questions.forEach(question => {
                if (question.id === questionId) {
                    question.answers.forEach(answer => {
                        if (answer.id === answerId) {

                            if (answer.correct) {
                              answer.correct = false;
                              answer.score=0;

                            } else {
                              answer.correct = true;
                              answer.score = this.baselineScore
                            }   
                        } //else {
                           //answer.correct = false;
                        //}
                    });
                }
            })
        },

        
        newQuestion: function () {

         this.questions.forEach(question => {
              var answerLabels=[]
              question.answers.forEach(answer => {
                  answerLabels.push(answer.label);
              })
              console.log("i CreateView newQuestion(). Pushar till socket:", this.pollId, question.label, answerLabels)
              socket.emit("addQuestion", {pollId: this.pollId, q: question.label, a: answerLabels } )
                    
      })
      
    },


        /*
        newQuestion: function () {
          console.log("i CreateView newQuestion(). ")
         this.questions.forEach(question => {
              var answerLabels=[]
              question.answers.forEach(answer => {
                  answerLabels.push(answer.label);
              })              
      })
      
    },*/



        addQuestion() {
            this.questions.push({
                id: this.createId(),
                label: '',
                answers: [
                    { id: this.createId(), label: '', correct: false, score:0, feedback:'', answerImage: ''}
                    //{ id: this.createId(), label: '', correct: false, score:0, feedback:'', answerImage: ''},
                ],
            })

        },
        saveQuestionsAsJson() {
          var filename=this.quizName;

            /* var jsonData=JSON.stringify(this.questions); SKREV OM TILL NEDAN*/
            var JsonData=JSON.stringify(this.questions);
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JsonData));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
    },

    getArrayLastElementId: function(array) {
      let lastElementId = array.slice(-1)[0].id
      return lastElementId
    },


        loadJson() {
            let data = window.prompt('Paste JSON here');
            
            this.questions = JSON.parse(data);
        },
        onFileChange(e) {
          const file = e.target.files[0];
          this.url = URL.createObjectURL(file);
        },
        removePicture: function(){
          this.url=null;

        },

        //Den här skall vid tillfälle skrivas om så att den funkar för att ta bort ett specifikt svar.
        removeAnswer: function(questionId, answerId){


            this.questions.forEach(question => {
                if (question.id === questionId) {

                    question.answers.forEach(answer => {
                        if (answer.id === answerId) {
                         const index= question.answers.indexOf(answer)
                          
                          
                           question.answers.splice(index,1)

                        }
                    })
                  }
                })
        },



        // ID:na måste ändras! Nu är de statiska!!!
        addAnswer: function (questionId) {

          this.questions.forEach(question => {
              if (question.id === questionId) { 
                question.answers.push(
                  { id: this.createId(), label: '', correct: false, score:0, feedback:'', answerImage: ''}

                )

              }
          }) 
        },  

        removeQuestion(questionId){
          var arrayQ=this.questions
          arrayQ.forEach(question =>{
            if (question.id === questionId){
              const i = arrayQ.indexOf(question)
              arrayQ.splice(i,1)
            }
          })    
        },

        changeQuestionIndexUp: function (questionId) {
                 var array=this.questions
                 array.forEach(question => {
              if (question.id === questionId) { 
                const index= array.indexOf(question)
                console.log(this.questions[index])
                console.log("id+1",this.questions[index-1])
                /*this.questions.splice(index, 2, this.question, this.questions[index+1]);*/
                var tmp = this.questions[index];
                    this.questions[index] = this.questions[index-1];
                    this.questions[index-1] = tmp;

               }
             })
           },

           changeQuestionOrder: function (questionId, orderObjectUp){
                  var array=this.questions
                   array.every(question => {
                     if (question.id === questionId) { 
                       const index= array.indexOf(question)
                        if (orderObjectUp && index !== 0) {
                          console.log("är i if")
                          this.questions.splice((index-1), 2, this.questions[index], this.questions[index-1]);
                          return false
                        }else {
                          this.questions.splice(index, 2, this.questions[index+1], this.questions[index]);
                          return false
                        }
                       
                      } 
                      return true
                    })
                 },


        changeQuestionIndexDown: function (questionId){
                 var array=this.questions

                array.every(question => {
                  if (question.id === questionId) { 
                    const index= array.indexOf(question)
                    //console.log(this.questions[index])
                    //console.log("id+1",this.questions[index-1])
                    this.questions.splice(index, 2, this.questions[index+1], this.questions[index]);
                    return false
                    //var tmp = this.questions[index];
                     //   this.questions[index] = this.questions[index-1];
                     //   this.questions[index-1] = tmp;

                   } 
                   return true
                 })


                 /*let hasRun = false;

                const keys = Object.keys(array);

                keys.forEach((key, index) => {
                    console.log("index:", index)

                    key = parseInt(key)

                    let question = array[key];

                    if (question.id === questionId && !hasRun) { 
                      let newIndex = parseInt(key)+1
                      var tmp = JSON.parse(JSON.stringify(this.questions[key]))
                      this.questions[key] = JSON.parse(JSON.stringify(this.questions[newIndex]))
                      this.questions[newIndex] = tmp;
                      hasRun = true 

                    }
                });*/  
            },



            createId: function (){
              var id=this.iterator;
              this.iterator+=1;

              return id;
            },

            runQuestion: function () {
            socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
            },
            saveQuiz(){
                this.createPoll();
                /*this.newQuestion();*/
            },


         
}


}

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');
  @import '@/assets/css/style.css';

  .tooltip{
    flex:none;
    position: relative;
    display: inline-block;
  }
  .tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  z-index: 1;
  bottom: 100%;
  left: 30%;
  margin-left: -60px;
  position:absolute;
  
}
  .tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  
}

  .questionInput {
    width: 100%;
    height: 8vh;
    /* padding: 12px 20px;
    margin: 8px 0;*/
    font: 1.5vw Inter;
    border: 0px;
    /* box-sizing: border-box;*/
    background: white;
    align-self: flex-center;

  }
 
  /*
  button{
  border-radius: 1em;
  margin: 0px 10px 0px 10px;
  width: 10vw;
  height: 60px;
  max-width: 70px;
  min-width: 40px; 
  font: 1vw Inter;
  background: #D7D7D7;
  transition-duration: 0.4s;

  }*/
  .button:hover {
    background-color: #4CAF50; /* Green */
    color: white;
  }

  .upDownButton{
    color: #C3C3C3;
    transition-duration: 0.4s;
    color: black;
    background: white;
    border-radius: 1em;
    height: 100%;
    cursor: pointer;
    border: none;
    width: 100%;
    
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  }

   .upDownButton:disabled {
    opacity: 0.5;
    cursor: not-allowed;

   }

   .upDownButtonPair {
    padding-right: 1vw;
    align-self: center;

   }

  .quizbody {
    width: 50vw;
    height: 100%;
    margin-left: 25%;
    margin-top: 2%;
   
  }

  .answerCorrect {
    background-color: green;
    transition-duration: 0.4s;
  }
  /* denna funkar endast när knappen är grön??? */
  .answerCorrect:hover{
    background-color: #4CAF50; /* Green */
    color: white;
  }

  .box2 {
    background: gray;
    position: absolute;
    width: 200px;
    height: 200px;
    right: 120px;
    top: 120px;
  }

  .addNewQuestionArea {
    /*margin: 20px;*/
    width: 100%;
  }


  .questionAnswer{
    /* background: #ECECEC;*/
    /*background-color: rgb(255,255,240);*/
    padding-bottom: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

  }
/*
  input[type=text] {
    width: 50%;
    height: 8vh;
    font: 1.5vw Inter;
    border: 0px;
    background: white;
  }*/

  .custom-btn-quadratic .questionSettings {
    width: 50%;
    height: 50%;
    padding-top: 10%;
    padding-bottom: 10%;

  }


  .nameQuizSectionWrapper {
    padding: 3vh;
  }

  .answerBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

  }

  .answerBox input {
    width: 100%;
  }

  .answerBox .custom-btn-quadratic {
    margin-right: 1vw;
  }

  .answerBox img {
    width: 50%;
    height: 50%;
    padding-top: 20%;
    padding-bottom: 20%;
  }

#Quizname
{
  color:black;
  font: 3vw Inter;
  /* position: relative; */
  /* background: #ECECEC;*/
  height: 100%;
  width:  100%;
  display: flex;
  justify-content: center;
  align-content: center;

  
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

.Xbutton{
width: 5%;
height: 5%;
margin-left: -5%;
margin-top: -10%;
/* border: 0.5px black solid; */
margin-right: 0%;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}



.Xbutton img {
  width: 100%;
  height: 100%;
}

.questionOperations {
  display: flex;
  flex-direction: row;
  width: 80%;
}


#Quizname > input
 
{
  color:black;
  font: 3vw Inter;
  text-align: center;
  margin: 3 vh;
}



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

<!--
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



.endOfQuizBody{
  padding-top: 10px;

}


#OverallStructure
{


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


answerAlt {
  font: 2em Inter;

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
-->