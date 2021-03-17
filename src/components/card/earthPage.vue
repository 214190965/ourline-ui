<template>
    <div class="context">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style="display:block;float: left"
        width="10"
        height="100%">
        <path d="M10 0 L10 125 0 130 10 135 10 560"
              fill="none"
              stroke="black"
              stroke-width="1"
        ></path>
      </svg>
      <div class="main"></div>
    </div>
</template>

<script>
    export default {
        name: "earthPage"
    }
</script>

<style scoped>
.context{
  position: absolute;
  width: 1000px;
  height: 560px;
  left: 66px;
  top: 107px;
  opacity: 0;
  z-index: 200;
  /*padding-left: 10px;*/
  /*box-sizing: border-box;*/
  /*background-color: white;*/
}
.main{
  width: 99%;
  height: 100%;
  margin-left: 10px;
  background-color: white;
}
</style>
