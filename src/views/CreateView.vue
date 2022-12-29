<template>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>
  <body>

    <div class="quizbody">
        <div class="nameQuizSectionWrapper">  
          <div id="Quizname">

            <input v-bind:placeholder="uiLabels.quizName" type="text" v-model="quizName">

            <button>
              <img class="answerSettings" src="../../img/settings.png"/>
            </button>
          </div>
      </div>

    <div class="addNewQuestionArea">
      
        <div class="questionAnswer" v-for="question in questions" v-bind:key="'question'+question">
          
          <button :disabled="question.id === this.questions[0].id" class="upDownbutton" @click="changeQuestionOrder(question.id, true)">
               <img src="../../img/Up.png">
            </button>
            <button :disabled="question.id === this.getArrayLastElementId(this.questions)" class="upDownButton" @click="changeQuestionOrder(question.id, false)">
                <img src="../../img/down.png">
            </button>


            <input v-bind:placeholder="uiLabels.question" v-model="question.label" v-bind:key="'question-label'+question">

            <!--<button class="Xbutton" @click.prevent="removeQuestion(questionId)">X</button>-->

            <div id="app">
                <input id="fileinput" type="file" @change="onFileChange" />
                <button v-on:click="removePicture">X</button>
                <div id="preview">
                  <img v-if="url" :src="url" />
                </div>
            </div>
            <br /> 

            <div class="answerbox" v-for="answer in question.answers" v-bind:key="'answer'+answer">
              <!--<div class="box2">
                <p> "Pop-up" box </p>
                
              </div>-->
 
                <div>
                    <button 
                      :class="{
                          'answerCorrect': answer.correct,
                      }"
                       @click="markAsCorrect(question.id, answer.id)"
                     >✔️</button>

                    <input v-bind:placeholder="uiLabels.answer" type="text" v-model="answer.label">
                    <button class="Xbutton" @click.prevent="removeAnswer(question.id, answer.id)">X</button>
                    <button>
                      <img class="answerSettings" src="../../img/settings.png"/>
                    </button>
                </div>
            </div>
            <button @click.prevent="addAnswer(question.id)">
              {{uiLabels.addAnswer}}
            </button>
        </div>
    
        <div>
            <button @click="addQuestion">
                <!--Add question-->
                {{ uiLabels.addQuestion }}
            </button>
        </div>

        <div>
            <button @click="removeQuestion">
                <!--remove question-->
                remove last question
            </button>
        </div>
    
        <div>
            {{ data }}
        </div>
        
          <button @click="saveQuiz">
                <!--Save Quiz (förut Start Quiz)-->
                {{uiLabels.saveQuiz}}
            </button>
            <br />
            <br />
                <router-link
                  v-bind:to="'/quizleaderStartView/'+lang+'/'+this.pollId+'/'+this.quizName"
                  custom
                  v-slot="{ navigate }">
                <button  
                @click="navigate"
                role="link"
                :disabled="!quizName.length"
                >
                <!--Start quiz!-->
                {{uiLabels.startQuiz}}
            </button>
                </router-link>
                <br />
                <br />

        <div>
            <button @click="saveQuestionsAsJson"> 
              {{uiLabels.saveAsJson}}
            </button>
        </div>

              
        <div>
            <button @click="loadJson">
              {{uiLabels.loadAJson}}
            </button>
        </div>
        <div>
              <router-link
                v-bind:to="'/'+ lang"
                custom
                v-slot="{ navigate }">
                <button  
            
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

   <!-- 
      <div class="addNewQuestionArea" v-for="(_, i) in addNewQuestionArea" :key="i">
        <div class="questionAnswer">
  
          
          -->

            <!-- 
             mikaels
            <input placeholder="One answer" v-for="(_, i) in answers" 
                   v-model="answers[i]" 
                   v-bind:key="'answer'+i"> 
            <br />  -->

            <!--

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
    -->

      <!-- 
      <button v-on:click="createPoll">
        Create/Save Quiz
      </button>
      -->

      <!-- SLUTKOMMENTAR



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
  </body>-->
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

        removeQuestion(){
        
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
                id: this.questions.length + 1,
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

.upDownbutton{
color: #C3C3C3;
}

  .quizbody {
    width: 50vw;
    height: 100%;
    margin-left: 25%;
  }

  .answerCorrect {
    background-color: green;
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
  margin: 20px;
}


.questionAnswer{
  background: #ECECEC;
  padding-bottom: 5%;

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

.answerSettings {
  background: #D7D7D7;
  height: 4vh;
  width: 4vh;

}

.nameQuizSectionWrapper {
  height: 100%;
  width: 100%;

}

#Quizname
{
  color:black;
  font: 3vw Inter;
  /* position: relative; */
  background: #ECECEC;
  margin-bottom: 3vh;

  
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

.answerbox{
background-color: #ECECEC;  
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