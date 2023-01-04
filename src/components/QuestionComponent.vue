<template>
<h3>{{question.label}}</h3>
<button class="custom-btn" v-for="answerObject in question.answers" v-on:click="answer(answerObject)" v-bind:key="answerObject">
  {{answerObject.label}}


                  
</button>
</template>
<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      console.log("----i QuestionComponent----")
      console.log("answer: ", answer)
      this.$emit("answer", answer);
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/style.css';
</style>

<!--
<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    } 
  }
}
</script>-->

<!-- förra versionen
<template>
<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a">
  {{a}}
</button>
</template>
<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    } 
  }
}
</script>-->