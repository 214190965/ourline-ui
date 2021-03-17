<template>
  <div class="context">
    <div class="spring">
<!--      <svg-->
<!--        xmlns="http://www.w3.org/2000/svg"-->
<!--        version="1.1"-->
<!--        style="display:block;"-->
<!--        width="70"-->
<!--        height="100">-->
<!--        <path d="M35 0-->
<!--               A100 100 0 0 0 10 50-->
<!--               A25 25 0 1 0 60 50-->
<!--               A100 100 0 0 0 35 0"-->
<!--            fill="blue"-->
<!--            stroke="blue"-->
<!--            stroke-width="1"-->
<!--        ></path>-->
<!--        <path d="M40 20-->
<!--                 A2 2 0 0 1 41 19-->
<!--                 A30 30 0 0 1 45 30-->
<!--                 A2 2 0 0 1 42 31-->
<!--                 A20 20 0 0 0 40 20"-->
<!--              fill="white"-->
<!--              stroke="white"-->
<!--              stroke-width="1"-->
<!--        ></path>-->
<!--      </svg>-->
    </div>
    <div class="picture">
    </div>
  </div>
</template>

<script>
    export default {
      name: "downPicture",
      props:{
        date:{
          type:String,
          required:true,
        }
      },
      data(){
        return{
          season:'',
        }
      },
      mounted(){
        //判断节点的季节
        let monthFlag = Math.floor(parseInt(this.date.toString().substring(5,6))/4);
        switch (monthFlag) {
          case 0:this.season = 'spring';break;
          case 1:this.season = 'summer';break;
          case 2:this.season = 'autumn';break;
          case 3:this.season = 'winter';break;
        }
        console.log(this.season);
      },
      methods:{

      }
    }
</script>

<style scoped>
.context{
   position: absolute;
   left: 500px;
   top: 0px;
   width: 60px;
   height: 80px;
  /*opacity: 0.3;*/
 }
.spring{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/static/img/水滴.png");
  background-size: 130%;
  background-repeat: no-repeat;
  background-position: center;
}
.picture{
  position: relative;
  width: 40px;
  height: 40px;
  left: 12px;
  top: -44px;
  border-radius: 50%;
  /*background-color: white;*/
  background-size: cover;
  background-image: url("/static/img/528865114564200.jpg");
  opacity: 0.6;
}
</style>
