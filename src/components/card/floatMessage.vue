<template>
    <div class="context" v-if="show" :style="{'left':offsetX,'top':offsetY}">
        <div class="head">
          <p class="main-head">{{main}}</p>
          <p class="sub-head">{{sub}}</p>
        </div>
        <div class="extra"></div>
    </div>
</template>

<script>
    export default {
        name: "floatMessage",
        props: {
          show: {
            required:true,
            type:Boolean,
          },
          main: {
            required:true,
            type:String
          },
          sub:{
            required:false,
            type:String
          },
          offsetX:{
            required:true,
            type:String
          },
          offsetY:{
            required:true,
            type:String
          },
          list:{
            required:false,
            type:Array
          }
        }
    }
</script>

<style scoped>
.context{
  position: absolute;
  width: 200px;
  height: 150px;
  opacity: 0;
}
.head{
  width: 200px;
  height: 120px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ef907a;
}
.main-head{
  width: 180px;
  height: 45px;
  line-height: 45px;
}
.sub-head{
  width: 180px;
  height: 55px;
  line-height: 55px;
}
.extra{
  width: 200px;
  height: 30px;
  padding: 2px 10px;
  box-sizing: border-box;
  background-color: #66CCFF;
}
</style>
