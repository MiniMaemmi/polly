<template>
  <div>
    <h1> Resultat </h1>
    QuestionObject:
    <br />
    {{question}}
    <br />
    <br />
    <h1> POLLPARTICIPANTS</h1>
    <br />
    {{pollParticipants}}
  </div>



  <BarsComponent v-bind:data="submittedAnswers"/>

  <span>{{submittedAnswers}}</span>

</template>

<script>
// @ is an alias to /src
import BarsComponent from '@/components/BarsComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'ResultView',
  components: {
    BarsComponent
  },
  data: function () {
    return {
      question: "",
      submittedAnswers: {
      },
      pollParticipants:[],



    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.submittedAnswers = update.a;
      this.question = update.questionsArrayObject;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    });

    socket.emit("getPollParticipants", this.pollId) 
      socket.on("getPollParticipants", update => {
        console.log("getPollParticipants log")
        this.pollParticipants = update;
        
      
    });




  }
}
</script>
