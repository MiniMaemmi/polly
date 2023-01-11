<template>

  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>

  <body class ="animationGradient" style="animation:  animate 25s ease infinite;" @click="IfPopOpen($event)" >

    <div class="quizbody" style="margin-top:0vh">

        <div class="nameQuizSectionWrapper lightYellowBox shadowIt" >  
          <div id="Quizname" >
            <input  v-bind:placeholder="uiLabels.quizName" type="text" v-model="quizName">
          
            <button class="custom-btn-quadratic OptionsButton" @click="PopUpfunction()">
              <img class="questionSettings" src="../../img/settings2.png"/>
            </button>
            
            <div id="myPop" class="pop">
             
              <div class="pop-content custom-btn-quadratic">
                <h1>{{uiLabels.modalText}}</h1>
                
                <button id="xClosePop" @click="closePop()">
                    &times;
                </button>

                    <div>
                      <button class="custom-btn-quadratic" style="height:10vh; margin:2vh;" @click="saveQuestionsAsJson"> 
                          {{uiLabels.saveAsJson}}
                      </button>
                    </div>

                    <div>
                      <button class="custom-btn-quadratic" style="height:10vh; margin-bottom: 2vh;" @click="loadJson">
                        {{uiLabels.loadAJson}}
                      </button>
                    </div>
              </div>

            </div>
          </div>
        </div>

      <div class="addNewQuestionArea">
        <div class="questionAnswer lightYellowBox shadowIt" style="margin-bottom:1vh; margin-top:1vh;" v-for="question in questions" v-bind:key="'question'+question" >

          <div class="questionOperations">
            <div class="upDownButtonPair">
              <button :disabled="question.id === this.questions[0].id" class="upDownButton" @click="changeQuestionOrder(question.id, true)">
                  <img class="arrow" src="../../img/Up.png">
              </button>
              <button :disabled="question.id === this.getArrayLastElementId(this.questions)" class="upDownButton" @click="changeQuestionOrder(question.id, false)">
                <img class="arrow" src="../../img/down.png">
              </button>
            </div>

            <input class="questionInput" v-bind:placeholder="uiLabels.question" v-model="question.label" v-bind:key="'question-label'+question">

            <button class="custom-btn-quadratic removeQuestionButton" @click="removeQuestion(question.id)">
              {{uiLabels.removeQuestion}}
            </button >
          </div>

          <div>
            <input class="addFile" type="file" @change="onFileChange($event, question)"/>
            <button class="Xbutton custom-btn-quadratic" v-on:click="removePicture(question)">
                <img src="../../img/x.png">
            </button>
            <div class="preview">     
                <div v-if="question.url">
                  <img :src="question.url" >
                </div> 
            </div>
          </div>

          <div v-for="answer in question.answers" v-bind:key="'answer'+answer" v-on:keyup.enter="focusNext($event)">

            <div class="answerBox lightYellowBox tooltip" id="inputAnswerbox">
              <button class="custom-btn-quadratic tooltipclass" 
                      :class="{'answerCorrect': answer.correct}"
                       @click="markAsCorrect(question.id, answer.id)"> 
                        <span class="tooltiptext">{{uiLabels.tooltip}}</span>
                        <img class="checkmark" src="../../img/checkmark.png">
              </button>

              <input v-bind:placeholder="uiLabels.answer" type="text" v-model="answer.label" :key="answer">


              <button class="Xbutton custom-btn-quadratic" @click.prevent="removeAnswer(question.id, answer.id)">
                <img src="../../img/x.png">
              </button>
            </div>
          </div>

            <button class="custom-btn add"  @click.prevent="addAnswer(question.id)">
              {{uiLabels.addAnswer}}
            </button>

        </div>
    
        <div>
            <button class="custom-btn add"  @click="addQuestion">
                {{ uiLabels.addQuestion }}
            </button>
        </div>

        <router-link v-bind:to="'/quizleaderStartView/'+lang+'/'+this.pollId+'/'+this.quizName" custom v-slot="{ navigate }">
          <button class="custom-btn playButtonPosition" @click="saveQuiz(), navigate()" role="link" :disabled="!quizName.length">
            {{uiLabels.startQuiz}}
          </button>
        </router-link>
       
        <router-link v-bind:to="'/'+ lang" custom v-slot="{ navigate }">
          <button class="custom-btn goBackButtonPosition" @click="navigate" role="link">
            {{uiLabels.back}}
          </button>
        </router-link>
    
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
                {   url:null,
                    id: 1,
                    label: '',
                    answers: [
                        { id: 0, label: '', correct: false, score:0,},
                        { id:1, label: '', correct: false, score:0,},
                    ],
                },
              
            ],

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


    },
    methods: {
 
      focusNext: function(ev){
      
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
      PopUpfunction: function(){
        var pop = document.getElementById("myPop");
        pop.style.display = "block";
        
        
      },
      closePop: function(){
        var pop = document.getElementById("myPop");
        pop.style.display = "none";
      },

      IfPopOpen: function(event){
        if(event.target == document.getElementById("myPop")  ){
          var pop= document.getElementById("myPop")
          pop.style.display = "none";
        
        }
        

        
      },
      

      createPoll: function () {
        console.log("i CreateView createPoll()")
        console.log("skickat till socket: ", this.pollId, this.lang, this.questions )
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang, questionsObjectArray: this.questions})
      },

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
                        } 

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



        addQuestion() {
            this.questions.push({
                url:null,
                id: this.createId(),
                label: '',
                answers: [
                    { id: this.createId(), label: '', correct: false, score:0, feedback:''}
                   
                ],
            })

        },

        saveQuestionsAsJson() {
          var filename=this.quizName;
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
        onFileChange(e, question) {
          
          var questionId=question.id
          //console.log(question)
          
          const file = e.target.files[0];
          this.url = URL.createObjectURL(file);
          console.log(this.url)
          this.questions.forEach(question => {
              if (question.id === questionId) { 
                question.url=this.url
                console.log(question)
                 

              }
          }) 



        },
        removePicture: function(question){
          question.url=null;

        },


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

        addAnswer: function (questionId) {
          this.questions.forEach(question => {
              if (question.id === questionId) { 
                question.answers.push(
                  { id: this.createId(), label: '', correct: false, score:0}
                  { id: this.createId(), label: '', correct: false, score:0}
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
 
                    this.questions.splice(index, 2, this.questions[index+1], this.questions[index]);
                    return false
                   } 
                   return true
                 })
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

            },        
        }
  }
</script>

<style scoped>
  @import '@/assets/css/style.css';
 
  .quizbody {
    width: 50%;
    height: 100%;
    margin-left: 25%;
  }

  .nameQuizSectionWrapper {
    padding: 3vh;
  }

  #Quizname{
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #Quizname > input{
    color:black;
    font: 3vw Inter;
    text-align: center;
    width: 100%;

  }

  .custom-btn-quadratic .questionSettings {
    width: 5vh;
    height: 5vh;
    padding-top: 10%;
    padding-bottom: 10%;

  }

  /* Popup*/
  .OptionsButton:hover{
    animation: pulse 2s;
    animation-delay:0.5ms ;
  }

  .pop {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0; 
    height: 100%; 
    width: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
  }

  .pop-content {
    background-color: #fefefe;
    margin: 15% auto; 
    padding: 20px;
    border: 1px solid #888;
    width: 70%; 
    height:40%;
    position:relative;
    font-size:55%;
  }

  #xClosePop{
    position:absolute;
    top:0; 
    right:0;
    margin:10px;
    height:10%; 
    width:3%;
  }

 /* Frågor och svar rutan */
  .questionAnswer{
    padding-bottom: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .addNewQuestionArea {
    width: 100%;
  }
  
  /*Ändra fråge rutan */ 
  .questionInput {
    width: 100%;
    height: 10vh;
    font: 1.5vw Inter;
    border: 0px;
    background: white;
    align-self: flex-center;
    margin: 2vh 0vh 2vh 0vh;
  }
  .questionOperations {
    display: flex;
    flex-direction: row;
    width: 80%;
  }

  .removeQuestionButton{
    width: 20vh;
    height: 7vh;
    font-size: 1.5vh;
  }
  
  .removeQuestionButton:hover{
    animation: pulse 2s;
    animation-delay:0.5ms ;
  }

  .addFile{
    width: 100%;
  }
  
  
  .upDownButtonPair {
    padding-right: 1vw;
    align-self: center;
   }

   .upDownButton{
    color: #C3C3C3;
    transition-duration: 0.4s;
    color: black;
    background: white;
    border-radius: 1em;
    cursor: pointer;
    border: none;
    width: 100%;
    margin: 0.3vh 0vh 0.2vh 0vh;
    
    box-shadow:inset 
      2px 2px 2px 0px rgba(255,255,255,.5),
      7px 7px 20px 0px rgba(0,0,0,.1),
      4px 4px 5px 0px rgba(0,0,0,.1);
  }

   .upDownButton:disabled {
    opacity: 0.5;
    cursor: not-allowed;
   }

   .upDownButton:hover{
    animation: pulse 2s; /* Animate for 1.5 seconds on hover */
    animation-delay:0.5ms ;
    color: white;
   }

   .arrow{
    width: 3vh;
    height: 3vh;
   }


  .tooltip{
    flex:none;
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
  visibility: hidden;
  width: 10vh;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  z-index: 1;
  bottom: 100%;
  left: 30%;
  margin-left:-60px;
  position:absolute;
}

  .tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  
}

   .tooltipclass:hover{
    animation: pulse 2s; 
    animation-delay:0.5ms ;
    color: white;
   }



  .answerCorrect {
    background-color: green;
    transition-duration: 0.4s;
  }

  .answerCorrect:hover{
    animation: pulse 2s;
    animation-delay:0.5ms ; 
  }


  .answerBox {
    font: 1vw Inter;
    display: flex;
    margin: 2vh 0vh 0.5vh 0vh;
  }

  .answerBox > input {
    width: 100%;
  }

  .answerBox .custom-btn-quadratic {
    margin-right: 1vw;

  }

  .answerBox .checkmark {
    width: 5vh;
    height: 5vh;
    padding-top: 20%;
    padding-bottom: 20%;
  }


.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;
}

.preview img {
  max-width: 100%;
  max-height: 500px;
  background-color: #ECECEC ;
}

.Xbutton{
width: 4vh;
height: 4vh;
margin-left: -5%;
margin-top: -10%;
margin-right: 0%;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.Xbutton img {
  width: 100%;
}

.add{
  font-size: 2vh;
}

@media screen and (max-width:1080px) {
  .goBackButtonPosition {
        display: inline;
        flex: none;
        position: absolute;
        width: 15% !important
    }

  .playButtonPosition{
    display: inline;
    flex: none;
    position: absolute;
    width: 15% !important
  }

  .quizbody{
    width: 60%;
    margin-left: 20%;
  }


}

</style>

