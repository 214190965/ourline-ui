<template>
  <div class="context">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style="display:block;"
      width="100%"
      height="10">
      <path d="M0 10 L20 10 25 0 30 10 70 10"
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
        name: "jupiterPage"
    }
</script>

<style scoped>
  .context{
    position: absolute;
    width: 1000px;
    height: 800px;
    left: 70px;
    top: 10px;
    opacity: 0;
    background-color: white;
  }
</style>
