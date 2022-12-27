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
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    //console.log("i Data.js createPoll()")
  console.log("Skapat denna poll:", this.polls[pollId])
  //console.log("poll created pollId: ", pollId)
  return this.polls[pollId];
}


//mikaels orginal
/*
Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("i Data.js createPoll()")
    console.log("poll created pollId: ", pollId, poll);
  }
  return this.polls[pollId];
}*/

Data.prototype.addQuestion = function(pollId, questionObject) {
  console.log("i Data.js addQuestion()")
  const poll = this.polls[pollId];
  console.log("question added to pollId with questionId: ", pollId, questionObject);
  if (typeof poll !== 'undefined') {
    poll.questions.push(questionObject);
  console.log("poll efter pushat object: ", poll)
  }
}

//mikaels orginal
/*
Data.prototype.addQuestion = function(pollId, q) {
  console.log("i Data.js addQuestion()")
  const poll = this.polls[pollId];
  console.log("q: ", q)
  console.log("question added to pollId with questionId: ", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}*/

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
  /* if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[qId]
  }*/
}

//mikaels orginal
/*
Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for pollId with questionId:", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];

  }
  return []
}*/

//egenskrivet
Data.prototype.createUser = function(pollId, username) {
  console.log("----- i Data.js createUser -------", username)
  console.log("Användarnamn: ", username)
  console.log("pollId ", pollId)
}

//egenmodifierad
/*
Data.prototype.submitAnswer = function(pollId, question, answer, username) {
  console.log("--------- Data.js submitAnswer()---------")
  const poll = this.polls[pollId];

  console.log("This should be inside data_for_statistics array: ", {pollId: pollId, question: question, answer: answer, username: username})
  
  this.answers_for_statistics.push({pollId: pollId, question: question, answer: answer, username: username});

  console.log("Data_for_statistics object after added data: ", this.answers_for_statistics);



  //const dataaArrayForStatistics = this.answers_for_statistics.push({pollId, answer, username})
  //console.log("answer submitted for ", pollId, answer, username);
  
  /*
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);

  }
}*/


//mikaels orginal
Data.prototype.submitAnswer = function(pollId, answer) {
  console.log("------ i Data.js submitAnswer ------")
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
      console.log("Answer: ", answers)

    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

//mikaels orginal
/*
Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}*/



Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      console.log("-----i data.js getAnswers ------")
      console.log("poll.questions:", poll.questions)
      return {questionsArrayObject: poll.questions, a: answers};
    }
  }
  return {}
}
module.exports = Data;




