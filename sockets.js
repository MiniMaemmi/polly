function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

//egenskrivet
  socket.on('createPoll', function(d) {
   
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.questionsObjectArray));
  });
  socket.on("sendStart", function(pollId,quizName){
   
    io.to(pollId).emit("start",quizName)
  })

  socket.on('nextQuestion', function(pollId){
    console.log("nextQuestion i Sockets")
    io.to(pollId).emit("nextQuestion")
  })

  socket.on("resetTimer", function(pollId) {
    console.log("-----i sockets.js resetTimer()----")
    io.to(pollId).emit("resetTimer")
  })

  socket.on('createUser', function(username) {
 
  socket.emit('dataUpdate', {answers: data.getAnswers(data.pollId), username: username});
  data.createUser(data.pollId, username);
   
  socket.emit("createdUser", username);

  });

  socket.on('addQuestion', function(d) {

    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

//egenskrivet
  socket.on('getPoll', function(pollId) {
    socket.emit('sendQuestion', data.getQuestion(pollId))
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });


  socket.on('getQuestion', function(pollId, questionId) {
  
    socket.emit('getQuestion', data.getQuestion(pollId, questionId))
  });

  //egenskriven
  socket.on('getPollParticipants', function(pollId) {
    
    socket.emit('getPollParticipants', data.getPollParticipants(pollId))
  });
  
  socket.on('submitAnswer', function(d) {
    console.log("---- i sockets.js submitAnswer()----")
    data.submitAnswer(d.pollId, d.userObject);
    //data.submitAnswer(d.pollId, d.question, d.answer, d.username);
    //io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('assignScoreForUser', function(pollId, pollParticipants){

    socket.emit("assignScoreForUser",data.assignScoreValueToEachAnswer(pollId, pollParticipants));
  });

  socket.on('getSortedTopList', function(pollParticipants, topList){

    socket.emit("getSortedTopList",data.getSortedTopList(pollParticipants, topList));

  });

  socket.on('checkQuestions', function(pollId, pollParticipants, questionResultCounter){

    socket.emit("checkQuestions",data.checkQuestions(pollId, pollParticipants, questionResultCounter));
  });
   socket.on("sendShowResult", function(pollId,quizName){
    console.log("i socket sendShowResult AAAAAAAAAAAAAAAAAAAAAAAAAAA")
    io.to(pollId).emit("recieveShowResult", quizName)
  })
    socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

}

module.exports = sockets;