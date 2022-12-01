function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  //this is for user creation egenskrivet
  socket.on('createUser', function(username) {
  console.log("------- i socket createUser ------ ") 
  console.log("This is my username:", username);
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

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });


  //egenskriven
  socket.on('submitAnswer', function(d) {
    console.log("-----sockets.js in submitAnswer()-------");
    console.log("Variables:", d.pollId, d.question, d.answer, d.username);
    data.submitAnswer(d.pollId, d.question, d.answer, d.username);
    //io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  //mikaels orginal
  /*
  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });
  */

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
}

module.exports = sockets;