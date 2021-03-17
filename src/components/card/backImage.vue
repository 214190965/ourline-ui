<template>
  <div>
    <div
      v-for="(item,index) in imageList"
      class="image-ins"
      :class="{'image-ins-after':imageFlag === item.id}"
      :id="item.id"
      :key="index"
      :style="{'backgroundImage':'url('+item.url+')'}"
      @click="changeImage($event)"
    ></div>
  </div>
</template>
<!--:style="{'background-color':'url('+item.url+')'}"-->

<script>
    export default {
      name: "backImage",
      props:{
        location:{
          required:true,
          tpye:String
        }
      },
      data(){
        return{
          imageList:[
            {
            id:"test1",
            url:require("../../assets/image/528865114564200.jpg")
            },
            {
              id:"test2",
              url:require("../../assets/image/2544269909551397.jpg")
            },
            {
              id:"test3",
              url:require("../../assets/image/3383197281468209.jpg")
            },
            {
              id:"test4",
              url:require("../../assets/image/3432675308033973.jpg")
            },
            {
              id:"test5",
              url:require("../../assets/image/5824113092454100.jpg")
            },
            {
              id:"test6",
              url:require("../../assets/image/8965417812917640.jpg")
            },
            {
              id:"test7",
              url:require("../../assets/image/528865114564200.jpg")
            },
            {
              id:"test8",
              url:require("../../assets/image/2544269909551397.jpg")
            },
            {
              id:"test9",
              url:require("../../assets/image/3383197281468209.jpg")
            },
            {
              id:"test10",
              url:require("../../assets/image/3432675308033973.jpg")
            },
            {
              id:"test11",
              url:require("../../assets/image/5824113092454100.jpg")
            },
            {
              id:"test12",
              url:require("../../assets/image/8965417812917640.jpg")
            }],
          imageFlag:"",
        }
      },
      methods:{
        changeImage(e){
          let image = e.target;
          this.imageFlag = image.id;
          let resData={location:this.location,type:'IMAGE',context:image.style.backgroundImage};
          this.$emit('update:change-image',resData);
        }
      }
    }
</script>

<style scoped>
  .image-ins{
  float: left;
  width: 23%;
  height: 100px;
  margin: 0px 3px 3px;
  box-sizing: border-box;/*固定大小*/
  border: 1px solid black;
    background-size: 100% 100%;
    opacity: 0.8;
    /*background: url("../../assets/image/528865114564200.jpg");*/
}
.image-ins:hover{
  border: 3px solid black;
}
.image-ins-after{
  border: 3px solid black;
}</style>
