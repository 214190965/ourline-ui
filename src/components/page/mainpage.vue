<template>
    <div id="mainpage">
      <div id="head">
        <lottie :options="lottieOptions" :height="72" :width="1536"></lottie>
<!--        <div class="head-webicon"-->
<!--            @mouseover="downPictureSlow"-->
<!--            @mouseleave="downPictureFast">-->
<!--        </div>-->
<!--        <div class="head-opation">-->
<!--          <div class="login-out"-->
<!--               @click="showLoginOutOpa">注销</div>-->
<!--          <div class="web-help">帮助</div>-->
<!--        </div>-->
<!--        <div class="login-out-context"-->
<!--             style="height: 0px;"-->
<!--             ref="loginOutContext">-->
<!--          <svg-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            version="1.1"-->
<!--            style="display:block;"-->
<!--            width="100%"-->
<!--            height="10">-->
<!--            <path d="M0 10 L20 10 25 0 30 10 70 10"-->
<!--                  fill="none"-->
<!--                  stroke="black"-->
<!--                  stroke-width="1"-->
<!--            ></path>-->
<!--          </svg>-->
<!--          <div class="login-out-opa">-->
<!--            <div class="change-account">切换账号</div>-->
<!--            <div class="login-out-real">注销账号</div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div id="user">
        <div id="user-head"
             @click="showFriendGroup">
        </div>
        <div id="globe-setting"
             class="page-item"
             @click="showGlobeSetting">
        </div>
        <div id="earth-page"
             class="page-item"
             @click="showEarthPage">
        </div>
        <div id="jupiter-page"
             class="page-item"
             @click="showJupiterPage">
        </div>
      </div>
      <div id="line">
        <div class="pointkind">
          <!--普通节点-->
          <div class="commonpoint"
               id="cpoint"
               ref="commonpoint"
               @dragstart="dragstart"
               draggable="true"
               ></div>
          <!--线条-->
          <div class="linepic" @click="ChangeMouseState"></div>
          <div id="optionalpoint"></div>
        </div>
        <!--画布盒子-->
        <div class="plainer"
             style="width: 100%;height: 93%"
             @drop.prevent="drop"
             @dragover.prevent>
          <div v-for="(item,index) in PointList"
               :key="index">
            <div class="commonpoint"
                 v-bind:class="{'plainMouseShape':changePlainMouse}"
                 :style="{'left':item.x+'px','top':item.y+'px'}"
                 :id="item.id"
                 ref="point"
                 @mousedown="pointStart($event,item)"
                 draggable="true"
                 @drag="draging($event,item)"
                 @dragend="pointEnd($event,item)"
                 @click="ShowHeadPic($event,item)"
                 @contextmenu.prevent="getMsgStartPoint">
            </div>
            <transition-group appear tag="div"
                              v-on:before-enter="beforeEnter"
                              v-on:enter="enter"
                              v-on:leave="leave"
                              v-bind:css="true">
              <!--UHP user head pic-->
              <div v-if="item.open"
                   class="userHeadPic"
                   :class="'UHP'+item.id"
                   v-for="friend in friends"
                   :key="item.id+friend.name"></div>
            </transition-group>
          </div>
          <!--画布-->
          <svg
            class="linediv"
            v-bind:class="{'plainMouseShape':changePlainMouse}"
            xmlns="http://www.w3.org/2000/svg"
            style="position: fixed;left: 0px;top: 0px"
            version="1.1"
            width="100%"
            height="100%">
            <path
              class="lineins"
              v-for="(item,index) in LineList"
              :key="index"
              :id="item.id"
              :d="'M'+item.x1+' '+item.y1+' '
                    +'C'+item.x2+' '+item.y2+' '+item.x3+' '+item.y3
                    +' '+item.x4+' '+item.y4"
              fill="none"
              stroke="red"
              stroke-width="5"
              @mousedown="ChangeLineShape"
            ></path>
          </svg>
        </div>
      </div>

      <div id="foot">
        <div class="chat"
             id="chat"
             @click="showFootPage('chatContext')">
          <div class="chat-display"
               :class="{'chat-display-add':highlight}"
               ref="chatDisplay">
            <div class="group-head-pic"
                 :style="{'background-image':curGroupChat.groupheadpic}"></div>
            <div class="group-name">{{curGroupChat.groupname}}</div>
            <div class="group-new-message">{{curGroupChat.groupsign}}</div>
          </div>
          <div class="chat-opation">
<!--            <div class="chat-icon"></div>-->
<!--            <div class="chat-input">-->
<!--              <input style="height: 18px;width: 98%"></input>-->
<!--            </div>-->
          </div>
        </div>
        <div class="game"
             id="game"
             @click="showFootPage('gameContext')">
            <div class="game-svg"></div>
            <div class="game-bar"></div>
            <div class="game-opa"></div>
        </div>
        <div class="movie"
             id="movie"
             @click="showFootPage('movieContext')">
            <div class="movie-svg">
              <div class="movie-p"></div>
              <div class="movie-l"></div>
            </div>
            <div class="movie-bar">
              <div class="movie-msg"></div>
              <div class="movie-schedule">
                <div class="movie-start-date"></div>
                <div class="movie-bar-out">
                  <div class="movie-bar-inlen"></div>
                  <div class="movie-bar-incir"></div>
                </div>
                <div class="movie-end-date"></div>
              </div>
            </div>
            <div class="movie-opa">
              <div class="movie-pre"></div>
              <div class="movie-pause"></div>
              <div class="movie-after"></div>
            </div>
        </div>
        <div class="music"
             id="music"
             @click="showFootPage('musicContext')">
          <div class="music-svg">
            <div class="music-p"></div>
            <div class="music-l"></div>
          </div>
          <div class="music-bar">
            <div class="music-msg">
              <div class="music-name">最后的time</div>
              <div class="music-model"></div>
              <div class="music-volume"></div>
              <div class="music-ktv"></div>
              <div class="music-praise"></div>
              <div class="music-list"></div>
            </div>
            <div class="music-schedule">
              <div class="music-start-date"></div>
              <div class="music-bar-out">
                <div class="music-bar-inlen"></div>
                <div class="music-bar-incir"></div>
              </div>
              <div class="music-end-date"></div>
            </div>
          </div>
          <div class="music-opa">
            <div class="music-pre"></div>
            <div class="music-pause"></div>
            <div class="music-after"></div>
          </div>
        </div>
      </div>
      <div class="foot-page">
        <div class="foot-page-context">
          <div class="chat-context"
             style="top: 0px;"
             id="chatContext">
            <div class="chat-groups">
              <div class="chat-group-ins"
                   v-for="(item,index) in chatGroups"
                   :key="index">
                <div class="group-head-pic"></div>
                <div class="group-name">{{item.groupName}}</div>
                <div class="group-new-message">{{item.groupNewmsg}}</div>
              </div>
            </div>
            <div class="chat-main">
              <div class="message-list"></div>
              <div class="input-message"></div>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                style="display:block;"
                width="100%"
                height="10">
                <path d="M0 0 L70 0 75 10 80 0 420 0"
                      fill="none"
                      stroke="black"
                      stroke-width="1"
                ></path>
            </svg>
          </div>
          <div class="game-context"
               style="top: 0px;"
               id="gameContext">
            <div class="game-first"></div>
            <div class="game-second"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              style="display:block;"
              width="100%"
              height="10">
              <path d="M0 0 L300 0 305 10 310 0 1000 0"
                    fill="none"
                    stroke="black"
                    stroke-width="1"
              ></path>
            </svg>
          </div>
          <div class="movie-context"
             style="top: 0px;"
             id="movieContext">
            <div class="movie-first"></div>
            <div class="movie-second"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              style="display:block;"
              width="100%"
              height="10">
              <path d="M0 0 L600 0 605 10 610 0 840 0"
                    fill="none"
                    stroke="black"
                    stroke-width="1"
              ></path>
            </svg>
          </div>
          <div class="music-context"
               style="top: 0px;"
               id="musicContext">
            <div class="music-first"></div>
            <div class="music-second">
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              style="display:block;"
              width="100%"
              height="10">
              <path d="M0 0 L70 0 75 10 80 0 420 0"
                    fill="none"
                    stroke="black"
                    stroke-width="1"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <!--节点信息-->
      <transition
        appear
        tag="div"
        v-bind:css="true"
        v-on:enter="pageEnter"
        v-on:leave="pageLeave">
         <pointmsg
           :start-point.sync="msgStartPoint"
           :box-visible="showMsgBox"
           ref="pointmsg"
           v-on:update:change-color="changePointColor"
         ></pointmsg>
      </transition>
      <!--用户信息-->
      <userpage
        class="userpage"
        userid="test"
        :class="{'userpage-after':showUserPage}"
        v-on:update:addgroup="addGroupToChat"
      ></userpage>
      <!--图片下落-->
      <transition-group
         appear
         tag="div"
         v-bind:css="true"
         v-on:before-enter="downPicturesBeforeEnter"
         v-on:enter="downPicturesEnter"
         v-on:leave="downPicturesLeave">
        <div class="down-picture"
             :class="{'down-picture-spring':seasonFlag === 'spring',
                      'down-picture-summer':seasonFlag === 'summer',
                      'down-picture-autumn':seasonFlag === 'autumn',
                      'down-picture-winner':seasonFlag === 'winner'}"
             @mouseover="downPictureSlow"
             @mouseleave="downPictureFast"
             v-if="downFlag"
             v-for="(item,index) in pictureList"
             :key="'DOWN' + index"
             :style="{'background-image':downBack}">
          <div class="down-picture-ins"
               :style="{'background-image':item}"></div>
        </div>
      </transition-group>
      <transition
        appear
        tag="div"
        v-bind:css="true"
        v-on:enter="pageEnter"
        v-on:leave="pageLeave">
        <earthpage
          v-if="earthPageShow"
        ></earthpage>
      </transition>
      <transition
        appear
        tag="div"
        v-bind:css="true"
        v-on:enter="pageEnter"
        v-on:leave="pageLeave">
        <earthpage
          v-if="jupiterPageShow"
        ></earthpage>
      </transition>
    </div>
</template>

<script>
  import velocity from 'velocity-animate/velocity.min'
  import pointmsg from '../card/pointMassage'
  import userpage from '../card/userPage'
  import earthpage from '../card/earthPage'
  import jupterPage from '../card/jupiterPage'
  import * as lottieAnimation from '../../assets/lottie/1800-sky'
  export default {
      name: "mainpage",
      components:{ pointmsg,userpage,earthpage,jupterPage },
      data(){
          return{
              test:false,
              showMsgBox:false,
              showUserPage:false,
              showGlobePage:false,//全局设置界面
              earthPageShow:false,
              jupiterPageShow:false,
              isNewPoint:true,
              msgStartPoint:{id:null,x:200,y:200},
              show:false,
              friends:[{name:"pl"},{name:"ll"},{name:"sj"}],
              PointList:[],
              LittleList:[],
              LineList:[],
              items:[],
              positionX:0,
              positionY:0,
              offsetX:0,
              offsetY:0,
              pointOffsetX:0,
              pointOffsetY:0,
              pointX:0,
              pointY:0,
              mouseState:"undefined",//鼠标状态
              // pointFlag:0,
              firstPoint:null,
              secondPoint:null,
              // pointId:null,
              // prePoint:null,
              leaveFast:0,
              //vague:false,//设置线条模糊
              lineState:0,
              changePlainMouse:false,
              PointLineList: [],
              leftLinePointList:[],
              rightLinePointList:[],
              // leftLinePointMapper:new Map(),
              // rightLinePointMapper:new Map(),
              //下边页面展示
              chatGroups:[
                {
                  groupName:'test1',
                  groupNewmsg:'hello',
                  groupHeadpic:''
                },
                {
                  groupName:'test2',
                  groupNewmsg:'hello',
                  groupHeadpic:''
                },
                {
                  groupName:'test3',
                  groupNewmsg:'hello',
                  groupHeadpic:''
                }],
              //设置当前新添加的群聊
              curGroupChat:{groupname:'',groupsign:'',groupheadpic:''},
              highlight:false,
              downFlag:false,
              pictureList:['url("/static/img/3432675308033973.jpg")','url("/static/img/3432675308033973.jpg")'],
              downBack:'',
              hiddenFlag:false,
              seasonFlag:'',
              downSlow:false,
              //lottie动画
              lottieOptions:{animationData:lottieAnimation}
          }
      },
      //初始化值，默认加载用户数据，在渲染成html之前调用，帮助理解1:在样式还没有加入dom之前
      created(){
        //初始化节点
        this.$api.point.getUserPoint().then((res)=>{
          if(res.retCode !== '200'){
            console.log("get user point error");
            return false;
          }
          //获取成功，赋值给pointList
          this.PointList = res.retData;
        }).catch((err)=>{
          console.log(err);
        });
        //初始化路径
        this.$api.line.getUserLine().then((res)=>{
          if(res.retCode !== '200'){
            console.log("get user line error");
            return false;
          }
          this.LineList = res.retData;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //在渲染成html之后调用
      mounted(){
        //初始化
        this.leftLinePointMapper.set("none",[]);
        this.rightLinePointMapper.set("none",[]);
      },
      methods:{
        dragstart(e){
          // e.dataTransfer.clearData();
          // let cpoint = {id:e.target.id,isNew:true,};
          this.isNewPoint = true;
          // e.dataTransfer.setData('point',JSON.stringify(cpoint));
          this.offsetX = e.offsetX;
          this.offsetY = e.offsetY;
        },
        drop(e){
          //第一次进入新增
          if(this.isNewPoint){
            let x = e.clientX;
            let y = e.clientY;
            x -= this.offsetX;
            y -= this.offsetY;
            //添加新的属性,相当于{x:10}
            // info.x = x/document.documentElement.clientWidth;
            // info.y = y/document.documentElement.clientHeight;
            let point = {x:x,y:y,id:Date.now(),open:false};
            this.PointList.push(point);
            //数据同步到数据库
            this.$api.point.savePoint(
              {
                x:point.x,
                y:point.y
              }
            ).then((res)=>{
              if(res.retCode !== '200'){
                console.log("save point line error");
                return false;
              }
            }).catch((err)=>{
              console.log(err);
            });
            //记录第一次的落点位置
            this.pointX = x;
            this.pointY = y;
          }
        },
        pointStart(e,item){
          this.isNewPoint = false;
          this.leaveFast = 1;
          this.pointOffsetX = e.offsetX;
          this.pointOffsetY = e.offsetY;
          //记录初始位置
          this.pointX = e.clientX - this.pointOffsetX;
          this.pointY = e.clientY - this.pointOffsetY;
          //移动之前，获取该点上连接的线
          this.$api.line.getPointLineMap({
            pointid:item.id
          }).then((res)=>{
            if(res.retCode !== '200'){
              console.log("get user line error");
              return false;
            }
            this.PointLineList = res.retData;
          }).catch(()=>{
            console.log(err);
          })
        },
        draging(e,item) {
          let prex = item.x;
          let prey = item.y;
          //移动时关闭头像显示
          item.open = false;
          item.x = e.clientX - this.pointOffsetX;
          item.y = e.clientY - this.pointOffsetY;
          //超出边界回到原点
          if(item.x<76.8 || item.y<51.5){
            item.x = this.pointX;
            item.y = this.pointY;
          }
          //避免在循环内定义变量
          let line; //线
          let path;//线路径
          let pathString;//新的线路径
          //遍历该节点上的线:左边
          for (let i = 0; i < this.PointLineList.length; i++) {
               line = document.getElementById(this.PointLineList[i].lineid.substring(1));
               console.log(line.getAttribute("d"));
              //重绘
               path = line.getAttribute("d").split(' ');
              if (this.PointLineList[i].lineid.substring(0, 1) === 'R') {
                 let role = Math.atan2((item.x - path[0].slice(1)), (item.y - path[1]));
                //变化速率
                 let kx = Math.abs(item.x-prex)/2;
                 let ky = Math.abs(item.y-prey)/2;
                 path[0] = "M" + (item.x);
                 path[1] = (item.y).toString();
                 path[2] = "C" + (parseFloat(path[2].slice(1)) + Math.sin(role) * kx);
                 path[3] = (parseFloat(path[3]) + Math.cos(role) * ky).toString();
                 path[4] = (parseFloat(path[4]) + Math.sin(role) * kx).toString();
                 path[5] = (parseFloat(path[5]) + Math.cos(role) * ky).toString();
              } else {
                 let role = Math.atan2((item.x - path[6]), (item.y - path[7]));
                //变化速率
                 let kx = Math.abs(item.x-prex)/2;
                 let ky = Math.abs(item.y-prey)/2;
                 path[2] = "C" + (parseFloat(path[2].slice(1)) + Math.sin(role) * kx);
                 path[3] = (parseFloat(path[3]) + Math.cos(role) * ky).toString();
                 path[4] = (parseFloat(path[4]) + Math.sin(role) * kx).toString();
                 path[5] = (parseFloat(path[5]) + Math.cos(role) * ky).toString();
                 path[6] = (item.x).toString();
                 path[7] = (item.y).toString();
              }
              pathString = path.join(' ');
              line.setAttribute("d", pathString);
          }
        },
        pointEnd(event,item) {
            //记录节点放置位置
            this.pointX = event.clientX - event.offsetX;
            this.pointY = event.clientY - event.offsetY;
            //节点落下时更新
            this.$api.point.editPoint({
              id:item.id,
              x:item.x,
              y:item.y
            }).then((res)=>{
              if(res.retCode !== '200'){
                console.log("get user line error");
                return false;
              }
            }).catch((err)=>{
              console.error(err);
            })
        },
        ShowHeadPic(e,item){
          //控制盒子离开条件
          console.log(this.mouseState);
          if(this.mouseState !== "lineins_state") {
            this.leaveFast = 0;
            this.seasonFlag = 'spring';
            item.open = !item.open;
            //这个点击两个不同的点会相互影响，后续可以采用数组增加的方式，同时展现多个节点的图片
            this.downFlag = !this.downFlag;
            if(item.open) {
              let userHeadPic;
              this.$nextTick(()=>{
                 userHeadPic = document.getElementsByClassName("UHP" + item.id);
                if (userHeadPic != null) {
                  for (let i = 0, l = userHeadPic.length; i < l; i++) {
                    userHeadPic[i].style.left =  (70 - 40 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)) + item.x + "px";
                    userHeadPic[i].style.top = (70 + 40 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)) + item.y + "px";
                  }
                }
              });
            }
          }else{
            if(this.firstPoint == null){
              this.firstPoint = item;
            }else if(item.id !== this.firstPoint.id){
              this.secondPoint = item;
              //绘制路线
              this.drawLine(this.firstPoint,this.secondPoint);
              //把记录的第一个点重新赋值为null
              this.firstPoint = null;
            }
          }
          //记录该次点击的节点
          this.prePoint = item;
        },
        //获取规定范围内所有的点,范围为头像显示半径
        getNearbyPoint(e){
          let letf = e.style.left;
          let top = e.style.top;
          for(let i = 0;i<=this.PointList.length;i++){
            let point = this.PointList[i];
            if(point.x<=letf && point.y <=top){
              this.LittleList.push(point); //后续根据ID匹配
            }
          }
        },
        //画图
        drawLine(start,end){
          //计算两点的中间点
          let midPot = {x:null,y:null};
          midPot.x = (start.x + end.x)/2;
          midPot.y = (start.y + end.y)/2;
          //垂直偏移很小的值（0.001px），让圆弧看起来是一条直线
          let a = 0.001;
          let length = Math.sqrt(Math.pow((start.x - end.x),2)+Math.pow((start.y-end.y),2));
          let role1 = Math.atan(Math.abs(start.y-end.y)/Math.abs(start.x-end.x));
          let role2 = Math.atan(a/(length/2));
          let side = Math.sqrt(Math.pow(a,2)+Math.pow(length/2,2));
          let role = role1+role2;
          let topOffset = side*Math.sin(role);
          let leftOffset = side*Math.cos(role);

          //定义控制点1、2
          let controlOne,controlTwo;
          //参照点置换
          if(start.x>=end.x && start.y>=end.y){
            //二、四象限
            controlOne = {x:end.x+leftOffset,y:end.y+topOffset};
          }else if(start.x>=end.x && start.y<=end.y){
            //一、三象限
            controlOne = {x:end.x+leftOffset,y:end.y-topOffset};
          }else if(start.x<=end.x && start.y<=end.y){
            //不进行置换
            controlOne = {x:start.x+leftOffset,y:start.y+topOffset};
          }else if(start.x<=end.x && start.y>=end.y){
            controlOne = {x:start.x+leftOffset,y:start.y-topOffset}
          }
          //初始化，把控制点1复制给控制点2，两个点重合
          controlTwo = controlOne;
          //端点二
          let pointTwo = {x:end.x,y:end.y};
          //判断两点之间是否已有连线、（问题保留，后续会有时间的判断）

          //开始画线
          let line = {
            id:"line"+Date.now(),
            x1:start.x+10,
            y1:start.y+10,
            x2:controlOne.x+10,
            y2:controlOne.y+10,
            x3:controlTwo.x+10,
            y3:controlTwo.y+10,
            x4:pointTwo.x+10,
            y4:pointTwo.y+10};
          this.LineList.push(line);
          //判断左槽
          let keys1 = this.leftLinePointMapper.keys();//该方法返回的是一个Iterator类型
          let arr1 = Array.from(keys1);
          let leftKeys = arr1.toString();
          if(leftKeys.indexOf(start.id)> -1){
            this.leftLinePointMapper.get(start.id).push("L"+line.id);
          }else{
            let left = [];
            left.push("L"+line.id);
            this.leftLinePointMapper.set(start.id,left);
          }
          //判断右槽
          let keys2 = this.rightLinePointMapper.keys();
          let arr2 = Array.from(keys2);
          let rightKeys = arr2.toString();
          if(rightKeys.indexOf(end.id)> -1){
            this.rightLinePointMapper.get(end.id).push("R"+line.id);
          }else{
            let right = [];
            right.push("R"+line.id);
            this.rightLinePointMapper.set(end.id,right);
          }

        },
        //改变线条形状
        ChangeLineShape(e){
          let line = e.target;
          //把路径参数分组
          let pathString = line.getAttribute("d").split(' ');
          let lenOne = Math.sqrt(Math.pow(e.clientX-pathString[0].slice(1),2)
                       +Math.pow(e.clientY-pathString[1],2));
          let lenTwo = Math.sqrt(Math.pow(e.clientX-pathString[6],2)
                       +Math.pow(e.clientY-pathString[7],2));
          document.onmousemove=function (event) {
            //调整第一个控制点
            if(lenOne<=lenTwo) {
              pathString[2] = "C"+event.clientX;
              pathString[3] = event.clientY.toString();
              let path = pathString.join(' ');
              line.setAttribute("d", path);
            }else{
              //调整第二个控制点
              pathString[4] = event.clientX.toString();
              pathString[5] = event.clientY.toString();
              let path = pathString.join(' ');
              line.setAttribute("d", path);
            }
          };
          //抬起停止拖动
          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        },
        //设置鼠标状态
        ChangeMouseState(e){
          let el = e.target;
          this.show = false;
          if(el.className == "linepic"){
            this.mouseState = "lineins_state";
            //改变鼠标指针样式
            this.changePlainMouse = false;
          }
        },
        //右键详细信息
        getMsgStartPoint(e){
          // alert("hello"
          let msgBox = e.target;
          this.showMsgBox = !this.showMsgBox;
          this.msgStartPoint.id = msgBox.id;
          this.msgStartPoint.x = parseInt(msgBox.style.left);
          this.msgStartPoint.y = parseInt(msgBox.style.top);
        },
        //获取子组件返回的信息
        changePointColor(data){
          let curPoint = document.getElementById(data.id);
          if(curPoint){
            curPoint.style.backgroundColor = data.context;
          }
        },
        //添加群聊
        addGroupToChat(data){
          this.curGroupChat = data;
          this.highlight = true;
        },
        //用户界面
        showFriendGroup(){
          this.showUserPage = !this.showUserPage;
        },
        //全局设置
        showGlobeSetting(){
          this.showGlobePage = !this.showGlobePage;
        },
        //蓝星上
        showEarthPage(){
          this.earthPageShow = !this.earthPageShow;
        },
        showJupiterPage(){
          this.jupiterPageShow = !this.jupiterPageShow;
        },
        //动画
        beforeEnter: function (el) {
          el.style.opacity = 0;
          el.style.transformOrigin = 'center';  //设置动画的基点
        },
        enter: function (el, done) {
          velocity(el, { scale: '0.1'},{duration: 0});
          velocity(el, { opacity: 1,scale:'1.1',rotateZ:'1440deg' }, { duration: 1000});
          velocity(el, { scale: '1' }, { complete: done });
        },
        leave: function (el, done) {
          if(this.leaveFast === 0){
            velocity(el, {scale: '1.2'}, {duration: 200});
            velocity(el, {scale: '0.1', rotateZ: '-1800deg', opacity: '0'},
              {duration: 1000, complete: done});
            }else {
            velocity(el,{opacity:'0'},{duration: 200, complete: done})
          }
        },
        downPicturesBeforeEnter(el,done){
          //这里记得适配屏幕尺寸
          el.style.top = (-0 * (Math.random()+0.5)) + 'px';
          el.style.left = (1536 * Math.random()) + 'px';
          el.setAttribute('time',Date.now());
        },
        downPicturesEnter(el,done){
          let progress = function (elements,complete,remaining,start){
            //20为精度，小于20ms，认为是一个时间点
            if(Math.abs(el.getAttribute('time') - start) <= 20 && el.getAttribute('speed') === 'slow'){
              el.setAttribute('time',Date.now());
              velocity(el,{scale:2.5},{duration:1000,queue:false,complete:done});
              velocity(el,{translateY:'1000px'},{duration:20000,queue:false,
                progress:function (elements,complete,remaining,start) {
                if(Math.abs(el.getAttribute('time') - start) <= 20 && el.getAttribute('speed') === 'fast'){
                  el.setAttribute('time',Date.now());
                  velocity(el, {scale: 1}, {duration: 1000, queue: false, complete: done});
                  velocity(el, {translateY: '1000px'}, {duration: 10000, queue: false,progress:progress});
                }
              }});
            }
          };
          velocity(el,{translateY:'1000px'},{duration:10000,queue:false,progress: progress});
        },
        downPicturesLeave(el,done){
          //queue:false,会先过度该方法里的所有动画
          velocity(el,{opacity:0},{duration:200,queue:false,complete:done});
          velocity(el,{display:'none'},{complete:done});
        },
        pageEnter(e,done){
          velocity(e,{opacity:1},{duration:200,complete:done});
        },
        pageLeave(e,done){
          velocity(e,{opacity:0},{duration:200,complete:done});
        },
        downPictureSlow(e){
          let target = e.target;
          target.setAttribute('speed','slow')
        },
        downPictureFast(e){
          let target = e.target;
          target.setAttribute('speed','fast');
        },
        //登出
        showLoginOutOpa(){
          let loginOutContext = this.$refs.loginOutContext;
          if(loginOutContext.style.height === '0px'){
            loginOutContext.style.height = '60px';
          }else{
            loginOutContext.style.height = '0px'
          }
        },
        //显示下边界面
        showFootPage(id){
          let curPage = document.getElementById(id);
          if(curPage.style.top === '0px'){
            let pageFlag = id.slice(0,2);
            let top;
            switch (pageFlag) {
              case 'ch':top = '-392px';break;
              case 'mu':top = '-462px';break;
              case 'mo':top = '-512px';break;
              case 'ga':top = '-562px';break;
            }
            curPage.style.top = top;
          }else{
            curPage.style.top = '0px'
          }
        },
      }
    }
</script>

<style scoped>

#mainpage{
  height: 100%;
  width: 100%;
  cursor: url("../../assets/mouse/pointer_16px_1231389_easyicon.net.ico"),pointer;
}
.plainMouseShape{
  cursor: url("../../assets/mouse/mouse_32px_1214889_easyicon.net.ico"),pointer;
}
#head{
  height: 10%;
  background-color: cornflowerblue;
}
.head-webicon{
  height: 72px;
  width: 300px;
  float: left;
}
.head-opation{
  height: 20px;
  width: 60px;
  float: right;
  margin-top: 42px;
  margin-right: 30px;
  padding: 2px 1px;
  box-sizing: border-box;
  /*background-color: white;*/
}
.login-out{
  height: 100%;
  width: 50%;
  float: left;
  font-size: 10px;
  border-right: 1px solid black;
  box-sizing: border-box;
  /*background-color: white;*/
  padding-left: 1px;
  opacity: 0.8;
}
.login-out:hover{
  opacity: 1;
}
.web-help{
  height: 100%;
  width: 50%;
  float: left;
  font-size: 10px;
  padding-left: 3px;
  /*background-color: white;*/
  box-sizing: border-box;
  opacity: 0.8;
}
.web-help:hover{
  opacity: 1;
}
.login-out-context{
  width: 70px;
  float: right;
  margin-top: 60px;
  margin-right: -60px;
  overflow: hidden;
  transition: all 0.2s linear 0s;
  /*background-color: black;*/
}
.login-out-opa{
  height: 50px;
  width: 70px;
  padding: 5px;
  background-color: white;
  box-sizing: border-box;
  text-align: center;
}
.change-account{
  width: 100%;
  height: 50%;
  font-size: 10px;
  box-sizing: border-box;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
}
.login-out-real{
  width: 100%;
  height: 50%;
  font-size: 10px;
  padding-top: 5px;
  box-sizing: border-box;
}
#user{
  height: 90%;
  width: 62px;
  /*没有这个z-index不会生效*/
  position: absolute;
  background-color: #6c3049;
  float: left;
  z-index: 9999;
}
#line{
  height: 83%;
  margin-left: 62px;
  background-color: #9b494d;
}

#foot{
  position: absolute;
  height: 7%;
  width: 100%;
  /*margin-left: 62px;*/
  /*left: 62px;*/
  padding-left: 62px;
  top: 93%;
  box-sizing: border-box;
  z-index: 100;
}
.foot-page{
  position: absolute;
  height: 7%;
  width: 100%;
  padding-left: 62px;
  top: 93%;
  box-sizing: border-box;
}
.foot-page-context{
  position: relative;
  width: 100%;
  height: 100%;
}
@keyframes highlight {
  0%{
    background-color: rgba(255, 215, 0, 1);
  }
  10%{
    background-color: rgba(255, 215, 0, 0.9);
  }
  20%{
    background-color: rgba(255, 215, 0, 0.8);
  }
  30%{
    background-color: rgba(255, 215, 0, 0.7);
  }
  40%{
    background-color: rgba(255, 215, 0, 0.6);
  }
  50%{
    background-color: rgba(255, 215, 0, 0.5);
  }
  60%{
    background-color: rgba(255, 215, 0, 0.6);
  }
  70%{
    background-color: rgba(255, 215, 0, 0.7);
  }
  80%{
    background-color: rgba(255, 215, 0, 0.8);
  }
  90%{
    background-color: rgba(255, 215, 0, 0.9);
  }
  100%{
    background-color: rgba(255, 215, 0, 1);
  }
}
.chat-display{
  width: 33.3%;
  height: 100%;
  float: left;
  /*padding-left: 5px;*/
  box-sizing: border-box;
}
.chat-display-add{
  animation: highlight 1s;
  animation-iteration-count: 3;
  animation-fill-mode: forwards;
}
.chat-opation{
  width: 35%;
  height: 100%;
  float: right;
}
.chat-context{
  position: absolute;
  left: 5px;
  height: 380px;
  width: 420px;
  transition: all 0.2s linear 0s;
  z-index: 10;
}
.chat-groups{
  width: 28%;
  height: 380px;
  float: left;
  background-color: white;
  opacity: 0.2;
  padding-right: 5px;
  overflow: hidden;
  box-sizing: border-box;
}
.chat-group-ins{
  width: 360px;
  height: 50px;
}
.chat-main{
  width: 72%;
  height: 380px;
  float: left;
}
.message-list{
  width: 100%;
  height: 93%;
  background-color: white;
  opacity: 0.4;
}
.input-message{
  width: 100%;
  height: 7%;
  background-color: white;
  opacity: 0.6;
}
.game-context{
  position: absolute;
  left: 12.5%;
  height: 550px;
  width: 1000px;
  transition: all 0.2s linear 0s;
}
.game-first{
  height: 5%;
  width: 100%;
  background-color: white;
  opacity: 0.2;
}
.game-second{
  height: 95%;
  width: 100%;
  background-color: white;
  opacity: 0.4;
}
.movie-context{
  position: absolute;
  left: 20%;
  height: 500px;
  width: 840px;
  transition: all 0.2s linear 0s;
}
.movie-first{
  height: 6%;
  width: 100%;
  background-color: white;
  opacity: 0.2;
}
.movie-second{
  height: 94%;
  width: 100%;
  background-color: white;
  opacity: 0.4;
}
.music-context{
  position: absolute;
  left: 75%;
  height: 450px;
  width: 360px;
  /*float: left;*/
  transition: all 0.2s linear 0s;
  z-index: 9;
}
.music-first{
  width: 100%;
  height: 7%;
  background-color: white;
  opacity: 0.4;
}
.music-second{
  width: 100%;
  height: 93%;
  background-color: white;
  opacity: 0.2;
}
.chat{
  height: 100%;
  width: 25%;
  float: left;
  background-color: #66CCFF;
}
.group-head-pic{
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  background-color: black;
  border-radius: 50%;
  background-size: cover;
}
.group-name{
  height: 20px;
  width: 70px;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  font-size: 15px;
  line-height: 20px;
}
.group-new-message{
  height: 15px;
  width: 70px;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  font-size: 10px;
  line-height: 15px;
}
.chat-icon{
  height: 45%;
  width: 100%;
  background-color: black;
}
.chat-input{
  height: 55%;
  width: 100%;
  padding: 2px 0px;
}
/*后续把宽度得百分比改为定值*/
.music{
  height: 100%;
  width: 25%;
  float: left;
  background-color: steelblue;
}
.music-svg{
  height: 50px;
  width: 50px;
  float: left;
  background-color: white;
}
.music-p{
  position: relative;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  left: 5px;
  top: 10px;
  background-image: url("/static/img/唱片CD.png");
  background-size: 112%;
  background-position: center;
  border: 1px solid black;
}
.music-l{
  position: relative;
  height: 12px;
  width: 35px;
  left: 12px;
  top: -35px;
  background-color: black;
}
.music-bar{
  height: 100%;
  width: 230px;
  float: left;
  background-color: gray;
}
.music-msg{
  width: 230px;
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  box-sizing: border-box;
}
.music-name{
  height: 100%;
  width: 35%;
  float: left;
  background-color: white;
}
.music-model{
  height: 20px;
  width: 20px;
  float: left;
  margin-top: 5px;
  margin-left:8px;
  background-color: white;
}
.music-volume{
  height: 20px;
  width: 20px;
  float: left;
  margin-top: 5px;
  margin-left: 8px;
  background-color: white;
}
.music-ktv{
  height: 20px;
  width: 20px;
  float: left;
  margin-top: 5px;
  margin-left:8px;
  background-color: white;
}
.music-praise{
  height: 20px;
  width: 20px;
  float: left;
  margin-top: 5px;
  margin-left:8px;
  background-color: white;
}
.music-list{
  height: 20px;
  width: 20px;
  float: left;
  margin-top: 5px;
  margin-left:8px;
  background-color: white;
}
.music-schedule{
  width: 230px;
  height: 20px;
}
.music-bar-out{
  height: 6px;
  width: 160px;
  /*border-top-left-radius: 10% 50%;*/
  border-radius: 4px;
  margin-top: 2px;
  margin-left: 2px;
  float: left;
  background-color: black;
}
.music-start-date{
  height: 12px;
  width: 30px;
  float: left;
  background-color: white;
}
.music-end-date{
  height: 12px;
  width: 30px;
  float: left;
  margin-left: 2px;
  background-color: white;
}
.music-bar-inlen{
  width: 100px;
  height: 6px;
  float: left;
  border-radius: 4px;
  background-color: #733544;
}
.music-bar-incir{
  width: 10px;
  height: 10px;
  float: left;
  margin-top: -2px;
  margin-left: -5px;
  border-radius: 50%;
  background-color: #9b494d;
}
.music-opa{
  width: 88px;
  height: 50px;
  float: left;
}
.music-pre{
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 15px;
  border-radius: 50%;
  background-color: white;
}
.music-pause{
  width: 30px;
  height: 30px;
  float: left;
  margin-left: 4px;
  margin-top: 10px;
  border-radius: 50%;
  background-color: white;
}
.music-after{
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 4px;
  margin-top: 15px;
  border-radius: 50%;
  background-color: white;
}
.movie{
  height: 100%;
  width: 25%;
  float: left;
  background-color: green;
}
.movie-svg{
  height: 50px;
  width: 50px;
  float: left;
  background-color: white;
}
.movie-bar{
  height: 50px;
  width: 230px;
  float: left;
}
.movie-msg{
  height: 30px;
  width: 230px;
}
.movie-schedule{
  height: 20px;
  width: 230px;
  background-color: #66CCFF;
}
.movie-start-date{
  width: 30px;
  height: 12px;
  float: left;
  background-color: white;
}
.movie-end-date{
  width: 30px;
  height: 12px;
  float: left;
  margin-left: 2px;
  background-color: white;
}
.movie-opa{
  width: 88px;
  height: 50px;
  float: left;
}
.movie-pre{
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 15px;
  border-radius: 50%;
  background-color: white;
}
.movie-pause{
  width: 30px;
  height: 30px;
  float: left;
  margin-left: 4px;
  margin-top: 10px;
  border-radius: 50%;
  background-color: white;
}
.movie-after{
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 4px;
  margin-top: 15px;
  border-radius: 50%;
  background-color: white;
}
.movie-bar-out{
  height: 6px;
  width: 160px;
  /*border-top-left-radius: 10% 50%;*/
  border-radius: 4px;
  margin-top: 2px;
  margin-left: 2px;
  float: left;
  background-color: black;
}
.game{
  height: 100%;
  width: 25%;
  float: left;
  background-color: blueviolet;
}
.game-svg{
  height: 50px;
  width: 50px;
  float: left;
  background-color: white;
}
.game-bar{
  height: 50px;
  width: 250px;
  float: left;
  background-color: salmon;
}
.game-opa{
  height: 50px;
  width: 68px;
  float: left;
  background-color: sandybrown;
}
.pointkind{
  height: 5%;
  background-color: #ef907a;
  padding: 3px 20px;
  box-sizing: border-box;
}
.commonpoint{
  position: absolute;
  margin: 0px;
  /*margin-top: 10px;*/
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: yellow;
  z-index: 2;
  /*text-align: center;*/
}
.lineins{
  /*鼠标样式，需要在webpack.base.conf.js里面加上ico格式*/
  cursor: url("../../assets/mouse/move_16px_1231394_easyicon.net.ico"),pointer;
}
.linepic{
  position: absolute;
  /*margin-top: 10px;*/
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: olive;
  z-index: 2;
  margin-left: 30px;
  /*text-align: center;*/
}
.ring{
  width: 200px;
  height: 200px;
  position: relative;
  margin: auto;
}
.circle{
    width: 200px;
    height: 200px;
    /*position: absolute;*/
    margin-left: -145px;
    margin-top: -145px;
    /*left: -400px;  !*设置初始位置，不要挡住*!*/
    /*top:-400px;*/
    /*background-color: black;*/
}
  /*.head-pic{*/
  /*  width: 300px;*/
  /*  height: 300px;*/
  /*}*/
.userHeadPic{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;  /*relative会导致margin-right失效*/
  background-size: 100%;  /*背景图片缩放*/
  margin-left: -85px;
  margin-top: -85px;
  background-image:url("../../assets/image/528865114564200.jpg");
}
#user-head{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-top: 50px;
    margin-left: 7px;
    background-color: #66CCFF;
}
.page-item{
  width: 31px;
  height: 31px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 14px;
}
#globe-setting{
    background-color: #66CCFF;
}
#earth-page{
  background-color: #66CCFF;
}
#jupiter-page{
  background-color: #66CCFF;
}
.userpage{
    position: absolute;
    left: -400px;
    top:107px;
    z-index: 200;
    opacity: 0;
    transition: all 0.2s linear 0s;
}
.userpage-after{
    opacity: 1;
    left: 66px;
}
.down-picture{
  position: absolute;
  left: 0px;
  top: -80px;
  height: 90px;
  width: 70px;
  /*background-color: white;*/
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.down-picture-spring{
  background-image: url("/static/img/水滴.png");
}
.down-picture-ins{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-top: 43px;
  margin-left: 18px;
  opacity: 0.8;
  background-size: cover;
  /*这个属性会让元素无法执行鼠标事件*/
  pointer-events: none;
}
</style>
