<template>
  <div>
    <div
      v-for="(item,index) in colorList"
      class="color-ins"
      :class="{'color-ins-after':colorFlag === item.name}"
      :id="item.name"
      :key="index"
      :style="{'background-color':item.name}"
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
            colorList:[{
              name:"red"
               },
              {
              name:"blue"
              },
              {
                name:"yellow"
              },
              {
                name:"black"
              },
              {
                name:"green"
              },
              {
                name:"grey"
              }],
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
.color-ins{
  float: left;
  width: 20px;
  height: 20px;
  margin: 3px;
  box-sizing: border-box;/*固定大小*/
}
.color-ins:hover{
  border: 3px solid black;
}
.color-ins-after{
  border: 3px solid black;
}
</style>
