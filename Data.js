'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.answers_for_statistics = [];
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  if (lang=="" ){
    lang="en"
  }
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

//egenskrivet
Data.prototype.createPoll = function(pollId, lang="en", questionsObjectArray) {
  console.log("i Data.js createPoll")
  //console.log("questionsObjectArray", questionsObjectArray)
    let poll = {};
    poll.lang = lang;  
    poll.questions = questionsObjectArray;
    poll.pollParticipantsObjects = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    //console.log("i Data.js createPoll()")
  console.log("Skapat denna poll:", this.polls[pollId])
  //console.log("poll created pollId: ", pollId)
  return this.polls[pollId];
}
Data.prototype.gameStart=function(gameStarted){
  console.log("Data.js gameStart")
  if (gameStarted === true){
  console.log("gameStart")
  
  //gameStarted=true
  return gameStarted}
}
Data.prototype.addQuestion = function(pollId, questionObject) {
  console.log("i Data.js addQuestion()")
  const poll = this.polls[pollId];
  console.log("question added to pollId with questionId: ", pollId, questionObject);
  if (typeof poll !== 'undefined') {
    poll.questions.push(questionObject);
  console.log("poll efter pushat object: ", poll)
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}
//egenskrivet
Data.prototype.getQuestion = function(pollId) {
  const poll = this.polls[pollId];
  console.log("i Data.js getQuestion(): question requested for pollId:", pollId);
  return poll
}

//egenskrivet
Data.prototype.getPollParticipants = function(pollId) {
  //const poll = this.polls[pollId];
  console.log("-------i Data.js getPollParticipants----");
  console.log("pollParticipantsObjects", this.polls[pollId].pollParticipantsObjects);
  return this.polls[pollId].pollParticipantsObjects

}

//egenskrivet
Data.prototype.createUser = function(pollId, username) {
  console.log("----- i Data.js createUser -------", username)
  console.log("Användarnamn: ", username)
  console.log("pollId ", pollId)
}

//egenskriven
Data.prototype.submitAnswer = function(pollId, userObject) {
  console.log("------ i Data.js submitAnswer ------")
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, userObject);
  if (typeof poll != 'undefined') {
  
    //let pollParticipantsObjects = this.poll.pollParticipantsObjects
    poll.pollParticipantsObjects.push(userObject)
    console.log("poll.pollParticipantsObjects efter push: ", poll.pollParticipantsObjects)
    console.log("this.polls[pollId].pollParticipantsObjects efter push: ", this.polls[pollId].pollParticipantsObjects)
  }
  
}



Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      console.log("-----i data.js getAnswers ------")
      //console.log("poll.questions:", poll.questions)
      return {questionsArrayObject: poll.questions, a: answers};
    }
  }
  return {}
}
module.exports = Data;

Data.prototype.assignScoreValueToEachAnswer = function(pollId, pollParticipants) {
      console.log("----- i data.js assignScoreValueToEachAnswer()---- ")
      console.log("början på assignScoreValueToEachAnswer", pollParticipants);
      const poll=this.polls[pollId];
      pollParticipants.forEach(pollParticipantObject => {

        pollParticipantObject.answers.forEach(questionAnswered => {
          poll.questions.forEach(questionObject => {

        if (questionObject.id === questionAnswered.questionID) {

          questionObject.answers.forEach(answerObject => {
            if (answerObject.id === questionAnswered.answerId) {
              questionAnswered.score = answerObject.score
              pollParticipantObject.totalScore += answerObject.score
            }

          })
        }

      })
        })

      })
          console.log("slutet på assignScoreValueToEachAnswer", pollParticipants);
      return pollParticipants;

    }

    Data.prototype.getSortedTopList= function(pollParticipants, topList) {
      pollParticipants.forEach(pollParticipantObject => {
        topList.push({username: pollParticipantObject.username, totalScore: pollParticipantObject.totalScore})
      })
      topList.sort((a, b) => (a.totalScore < b.totalScore) ? 1 : -1)

      return topList

    }
    Data.prototype.checkQuestions= function (pollId, pollParticipants, questionResultCounter) {
      console.log("eyy")
      
      const poll=this.polls[pollId];

      poll.questions.forEach(question => {
        let correctAnswers=0;
        let wrongAnswers=0;

        pollParticipants.forEach(participant=>{
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
        console.log("questionResultCounter loop", questionResultCounter)
      questionResultCounter.push({questionID:question.id, correctAnswers, wrongAnswers})
      })

      console.log("questionResultCounter return", questionResultCounter)
    return questionResultCounter
    }
