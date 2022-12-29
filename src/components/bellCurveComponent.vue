<template>
  <div class="wrapper">
    <h3>Bell curve:</h3>
    <div class="bellCurveArea">
      Här kommer graf
    </div>
  </div>

</template>
 
<script>

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap');

.wrapper {
  background-color: rgb(255,255,240);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5vh;
  height: 100%;
  width: 100%;

}

.wrapper h3 {
  display: inline;
  font: 3em Inter;
  font-weight: 400;

}

.bellCurveArea {
  width: 100%;
  height: 80%;
  border: 1px black dashed;
}
</style>