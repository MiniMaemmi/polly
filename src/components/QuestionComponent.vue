<template>
<p>{{question.label}}</p>
<button v-for="a in question.answers" v-on:click="answer(a)" v-bind:key="a">
  {{ a.label }}
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
</script>