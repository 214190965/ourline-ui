<template>
  <div class="context">
    <div
      v-for="(item,index) in colorList"
      class="color-ins"
      :class="{'color-ins-after':colorFlag === item}"
      :id="item"
      :key="index"
      :style="{'background-color':item}"
      @click="changeColor($event)"
    ></div>
  </div>
</template>

<script>
    export default {
      props:{
        location:{
          required:true,
          tpye:String
        }
      },
        name: "backColor",
        data(){
          return{
            colorList:['aqua','antiquewhite','aquamarine','bisque'
              ,'blueviolet','blue','burlywood','cornflowerblue','cadetblue','chartreuse'
              ,'chocolate','coral','cornsilk','crimson','cyan','darkblue','darkcyan','deeppink','deepskyblue'
              ,'firebrick','fuchsia','green','gold','indigo','khaki','maroon','navy'
              ,'orange','orchid','pink','purple','red','rebeccapurple','violet','yellow'],
            colorFlag:"",
          }
        },
      methods:{
          changeColor(e){
            let color = e.target;
            this.colorFlag = color.id;
            let resData={location:this.location,type:'COLOR',context:color.id};
            this.$emit('update:change-color',resData);
          }
      }
    }
</script>

<style scoped>
.context{
  height: 130px;
  width: 100%;
  padding: 5px;
  /*border-right: 1px solid black;*/
  /*border-bottom: 1px solid black;*/
  border: 1px solid black;
  border-radius: 5px;
  background-color: #eeeeee;
  margin-top: -2px;
}
.color-ins{
  float: left;
  width: 20px;
  height: 20px;
  margin: 3px;
  border: 1px solid gray;
  box-sizing: border-box;/*固定大小*/
}
.color-ins:hover{
  border: 3px solid black;
}
.color-ins-after{
  border: 3px solid black;
  /*aqua aliceblue antiquewhite aquamarine  bisque
  blueviolet blue brown burlywood cornflowerblue cadetblue chartreuse
  chocolate coral cornsilk crimson cyan darkblue darkcyan deeppink deepskyblue
  firebrick fuchsia green gold indigo khaki magenta maroon navy
  orange orchid pink purple red rebeccapurple violet yellow*/
}
</style>
