<template>
<div class="wrapper">
  <h1> Topplista </h1>


  <table>
    <tr>
      <th>Username</th>
      <th>Score</th>
    </tr>
  <div v-for="topListObject in topList" v-bind:key="topListObject">  
    <tr>
        <td>{{topListObject.username}}</td>
        <td>{{topListObject.totalScore}}</td>
    </tr>
  </div>   
  </table>  
</div>
 
</template>
<script>
export default {
  name: 'topListComponent',
  props: {
    topList: []
  },
  //emits: ["answer"],
  //methods: {
    /*answer: function (answer) {
      console.log("----i QuestionComponent----")
      console.log("answer: ", answer)
      this.$emit("answer", answer);
    }*/
  //}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  background-color: lightgrey;
  border: 1px black dashed;
}  
.wrapper {
  padding:3em;
}

</style>