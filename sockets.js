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
    console.log("i sockets.js createPoll()")
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.questionsObjectArray));
  });


//mikaels orginal
/*
  socket.on('createPoll', function(d) {
    console.log("i sockets.js createPoll()")
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });*/

  //this is for user creation egenskrivet
  socket.on('createUser', function(username) {
  console.log("------- i socket createUser ------ ") 
  console.log("This is my username:", username);
  socket.emit('dataUpdate', {answers: data.getAnswers(data.pollId), username: username});
  data.createUser(data.pollId, username);
   
  socket.emit("createdUser", username);

  });

  socket.on('addQuestion', function(d) {
    console.log("Är i socket addQuestion()")
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
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });


  socket.on('getQuestion', function(pollId, questionId) {
    console.log('i sockets.js getQuestion()')
    socket.emit('getQuestion', data.getQuestion(pollId, questionId))
  });

  //egenskriven
  socket.on('getPollParticipants', function(pollId) {
    console.log('------i sockets.js getPollParticipants()---------')
    socket.emit('getPollParticipants', data.getPollParticipants(pollId))
  });


  //egenskriven
  
  socket.on('submitAnswer', function(d) {
    console.log("-----sockets.js in submitAnswer()-------");
    console.log("Variables:", d.pollId, d.answerObject);
    data.submitAnswer(d.pollId, d.userObject);
    //data.submitAnswer(d.pollId, d.question, d.answer, d.username);
    //io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('assignScoreForUser', function(pollId, pollParticipants){
    console.log("-----sockets.js in assignScoreForUser-------");
    socket.emit("assignScoreForUser",data.assignScoreValueToEachAnswer(pollId, pollParticipants));

  });

  socket.on('getSortedTopList', function(pollParticipants, topList){
    console.log("-----sockets.js in getSortedTopList-------");
    socket.emit("getSortedTopList",data.getSortedTopList(pollParticipants, topList));


  });

/*
  //mikaels orginal
  socket.on('submitAnswer', function(d) {
    console.log("----- i sockets.js submitAnswer() -----")
    console.log("-----d.pollId-------", d.pollId)
    console.log("data d:,", d)
    console.log("-----d.answer-------", d.answer)
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });*/
  

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
}

module.exports = sockets;