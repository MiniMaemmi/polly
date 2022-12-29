<template>
<div class="wrapper">
  POLLEN:
  {{data.poll}}
  <br />
  <br />
  DELTAGARE:
  {{data.pollParticipants}}

  <!--
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: item + 'px'}">
      <span> {{item}} </span>
    </div>
    <div> 
      {{key}}
    </div>
  </div>-->
</div>
</template>

<script>
export default {
  name: 'BarsComponent',
  props: {
    data: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span {
  color:var(--background-color);
}
.bar {
  display: inline-block;
  width: 50px;
  vertical-align: bottom;
}

.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:red;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}

.wrapper {
  padding:3em;
}
</style>






<!-- mikaels orginal
<template>
<div class="wrapper">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: item + 'px'}">
      <span> {{item}} </span>
    </div>
    <div> 
      {{key}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BarsComponent',
  props: {
    data: Object
  }
}
</script>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>

span {
  color:var(--background-color);
}
.bar {
  display: inline-block;
  width: 50px;
  vertical-align: bottom;
}

.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:red;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}

.wrapper {
  padding:3em;
}
</style>-->
