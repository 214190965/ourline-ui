<template>
      <div class="context"
           :class="{'context-after':styleTwo !== 'none'}"
           ref="context"
           :style="{'left':contextPostion.x,
                    'top':contextPostion.y,
                    'right':contextPostion.z}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          class="border"
          :class="{'border-after':onLeft}"
          width="20"
          height="520">
          <path id="borderPath"
                fill="white"
                stroke="grey"
                stroke-width="1"
          ></path>
        </svg>
        <div class="main"
             ref="main"
             :class="{'main-left':onLeft,'main-right':!onLeft}">
        <div class="initpage"
             :class="{'initpage-after':styleTwo !=='none','initpage-left':onLeft}"
             ref="initpage">
        <div class="information-pre"
             :class="{'information-after':styleAfter}"
             :style="{'background-color':backStyle.message.color,
                    'background-image':backStyle.message.image}">
          <div
            class="opation-set"
            id="setting"
            @click="setPointShowStyle"></div>
          <div
            class="opation-close"
            @click="setPointShowStyle"></div>
        </div>
        <div class="picture-pre"
             :class="{'picture-after':styleAfter}"
             :style="{'background-color':backStyle.picture.color,
                    'background-image':backStyle.picture.image}">
          <div class="context-head-pre"
               v-bind:class="{'context-head-after':styleAfter}">
              {{ pictitle }} </div>
          <div class="context-body-pre"
               v-bind:class="{'context-body-after':styleAfter}">
            <!--照片存放显示 SP show picture-->
            <div class="picture-ins"
            v-for="(item,index) in curPicInsList"
            :key="index"
            :id="'SP'+index"
            @click="changePictureSize(index)"></div>
          </div>
          <!--音频播放器-->
          <div class="context-foot-pre"
               v-bind:class="{'context-foot-after':styleAfter}">
            <div class="point-music">
              <div class="point-music-name"></div>
              <div class="point-music-bar">
                <div class="start-time"></div>
                <div class="music-bar-out">
                  <div class="music-bar-inlen"></div>
                  <div class="music-bar-incir"></div>
                </div>
                <div class="end-time"></div>
              </div>
            </div>
            <div class="mid-opation">
              <div class="music-opation"></div>
              <div class="more-opation"
                   @click="showMorePicture"></div>
            </div>
          </div>
        </div>
        <div class="whisper-pre"
             :class="{'whisper-after':styleAfter}"
             :style="{'background-color':backStyle.whisper.color,
                    'background-image':backStyle.whisper.image}">
          <!--后期用背景图片代替-->
          <div class="context-head">whisper</div>
          <div class="context-body"
               id="msgIns"
               v-infinite-scroll="load"
               style="overflow:auto;"
               infinite-scroll-distance="1"
               infinite-scroll-disabled="busy"
          >
            <table border="0"
                   id="infinite-list"
                   class="infinite-list">
              <tr v-for="(item,index) in whisper"
                  class="infinite-list-item"
                  :key="index">
                <el-tooltip placement="top-start"
                            :content="item.userid"
                            class="tips"
                            effect="light">
                <td style="width: 25%;
                           white-space: nowrap;
                           overflow : hidden;
                           text-overflow: ellipsis;"
                    valign="top"
                    @click="showUserMessage">{{ item.userid }}</td>
                </el-tooltip>
                <td style="width: 75%;word-break:break-all;">:&nbsp{{ item.text }}</td>
              </tr>
            </table>
          </div>
          <div class="context-foot">
            <el-input
              class="sometext"
              placeholder="Say Something"
              clearable
              size="mini"
              v-model="input"
              @keypress.native.enter="sendYouText"
            ></el-input>
            <el-button
              class="option"
              type="primary"
              size="mini"
              icon="el-icon-s-promotion"
              @click="sendYouText"></el-button>
          </div>
         </div>
        </div>
        <!--           设置页面          -->
        <div ref="setpage"
             class="setpage"
             :class="{'setpage-after':styleTwo === 'setpage','setpage-left':onLeft}">
          <div class="set-head">setting</div>
          <div class="set-context">
          <el-tabs
            tab-position="left"
            type="border-card"
            class="point-set"
            id="point-set">
            <el-tab-pane label="point">
              <div id="point-first">
                <p>Add Partner</p>
                <div
                  class="head-pic-context"
                  v-for="(item,index) in teamMember"
                  :key="index">
                  <!--头像-->
                  <p class="head-pic"
                     :style="{'backgroundImage':'url('+item.headPic+')'}"
                     @click="selectPartner(item)"></p>
                  <!--勾选-->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="16"
                    style="position: relative;left: 40px;top: -13px;"
                    height="12">
                    <path
                      d="M3 6 L8 12 16 0"
                      :id="item.userId"
                      style="display: none"
                      fill="none"
                      stroke="red"
                      stroke-width="1">
                    </path>
                  </svg>
                </div>
              </div>
              <div
                id="point-second">
                <p>background color</p>
                <back-color
                  location="PO"
                  v-on:update:change-color="getChildData"></back-color>
              </div>
              <!--节点权限设置-->
              <div id="point-third">
                <p>permission setting</p>
                <el-checkbox>是否对游客开放</el-checkbox>
              </div>
              <div id="point-forth">
                <el-button size="mini" @click="cancelSetting">取消</el-button>
                <el-button size="mini" @click="saveSetting">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="message">
              <div id="message-first" class="first">This Is A Good Day</div>
              <div id="message-extra" class="extra">
                <!--时间-->
                <el-date-picker
                  type="date"
                  v-model="datePicker"
                  size="mini"
                  style="width: 30%"
                  placeholder="选择日期"></el-date-picker>
                <!--地点-->
                <el-cascader
                  size="mini"
                  :options="options"
                  style="width: 38%"
                  v-model="selectedOptions"></el-cascader>
                <!--天气情况-->
                <el-select
                  v-model="weatherIns"
                  size="mini"
                  style="width: 25%;"
                  placeholder="请选择">
                  <el-option
                    v-for="(item,index) in weatherList"
                    :key="index"
                    :label="item.name"
                    :value="index">
                  </el-option>
                </el-select>
              </div>
              <div id="message-second" class="second">
                <p>background color</p>
                <back-color
                  location="M"
                  v-on:update:change-color="getChildData"></back-color>
              </div>
              <div id="message-third" class="third">
                <p>background image</p>
                <div style="height: 90%;padding-top: 1%">
                <back-image
                  location="M"
                  style="height: 96%;overflow: auto;"
                  v-on:update:change-image="getChildData"
                ></back-image>
                </div>
              </div>
              <div id="message-forth" class="forth">
                <el-button size="mini" @click="cancelSetting">取消</el-button>
                <el-button size="mini" @click="saveSetting">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="picture">
              <div id="picture-fisrt">
                <p>preview</p>
                <el-checkbox>开启雪花动画</el-checkbox>
              </div>
              <div id="picture-second">
                <p>background color</p>
                <back-color
                  location="P"
                  v-on:update:change-color="getChildData"></back-color>
              </div>
              <div id="picture-third">
                <p>background image</p>
                <div style="height: 90%;padding-top: 1%">
                  <back-image
                    location="P"
                    style="height: 96%;overflow: auto;"
                    v-on:update:change-image="getChildData"
                  ></back-image>
                </div>
              </div>
              <div id="picture-forth">
                <el-button size="mini" @click="cancelSetting">取消</el-button>
                <el-button size="mini" @click="saveSetting">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="whisper">
              <div id="whisper-first">
                <p>preview</p>
                <el-checkbox>开启弹幕</el-checkbox>
              </div>
              <div id="whisper-second">
                <p>show</p>
                <el-radio v-model="whisperShow" label="1">表格</el-radio>
                <el-radio
                  v-model="whisperShow"
                  label="2"
                  v-on:change="selectWhisperShape">留言板</el-radio>
              </div>
              <!--用于存放留言形状-->
              <div id="whisper-extra">

              </div>
              <div id="whisper-third">
                <p>background color</p>
                <back-color
                  location="W"
                  v-on:update:change-color="getChildData"></back-color>
              </div>
              <div id="whisper-forth">
                <p>background image</p>
                <div style="height: 90%;padding-top: 1%">
                  <back-image
                    location="W"
                    style="height: 96%;overflow: auto;"
                    v-on:update:change-image="getChildData"
                  ></back-image>
                </div>
              </div>
              <div id="whisper-fifth">
                <el-button size="mini" @click="cancelSetting">取消</el-button>
                <el-button size="mini" @click="saveSetting">保存</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
          </div>
        </div>
        <!--   更多图片   -->
        <div class="morepic"
             :class="{'morepic-after':styleTwo === 'morepic','morepic-left':onLeft}">
         <div class="morepic-head">pictures and music</div>
         <div class="morepic-list">
           <el-tabs
             tab-position="left"
             type="border-card"
             class="point-set">
             <el-tab-pane label="pictures">
                <div class="picture-main">
                  <div class="picbox"
                       v-for="(item,index) in morePictureList"
                       :style="{'backgroundImage':'url('+item.url+')'}"
                       :id="item.id"
                       :key="index"
                       @mouseover="showPictureOptions(item.id)">
                    <div class="picoptions"
                         :class="{'picoptions-after':picOptionFlag === 'OPA'+item.id}"
                         :id="'OPA'+item.id">
                      <div class="showpic"
                           @click="showPicOnMinipage"></div>
                      <div class="previewpic"></div>
                      <div class="removepic"></div>
                    </div>
                  </div>
                </div>
                <div class="picture-sub">
                  <el-button size="mini" @click="cancelSetting">取消</el-button>
                  <el-button size="mini" @click="saveSetting">保存</el-button>
                </div>
             </el-tab-pane>
             <el-tab-pane label="music">
               <div class="cur-music">
                 <div class="cur-music-name">最后的time</div>
                 <div class="cur-music-part"></div>
               </div>
               <div class="ins-music">
                 <div class="ins-music-head">Change Music</div>
                 <div class="new-music">
                   <div class="new-music-main">
                     <div class="new-music-input">
                       <el-input v-model="pointMusic" size="mini" clearable></el-input>
                     </div>
                     <div class="new-music-seach"></div>
                     <div class="new-music-upload"></div>
                   </div>
                   <div class="new-music-sub">(注：*表示该音乐曾经被使用，它会默认显示在列表中)</div>
                 </div>
                 <div class="list-music">
                   <div class="list-music-ins"
                        v-for="(item,index) in pointMusicList"
                        @click="editMusic(item.name)"
                        :key="index">
                    <div class="music-ins-name">{{ item.name}}</div>
                    <div class="music-ins-owner">{{ item.owner}}</div>
                   </div>
                 </div>
               </div>
               <div class="edit-music">
                 <div class=edit-music-head>Edit Music</div>
                 <div class="edit-music-main">
                   <div class="edit-music-msg">
                     <div class="edit-music-name">{{curMusic}}</div>
                     <div class="edit-music-bar">
                       <div class="edit-start-time"></div>
                       <div class="edit-music-bar-out">
                         <div class="edit-music-bar-inlen"></div>
                         <div class="edit-music-bar-incir"></div>
                       </div>
                       <div class="edit-end-time"></div>
                     </div>
                   </div>
                   <div class="edit-music-opation">
                     <div class="edit-music-opation-pause"></div>
                     <div class="edit-music-opation-cut"></div>
                   </div>
                 </div>
                 <div class="edit-music-sub">
                   <el-button size="mini" @click="cancelSetting">取消</el-button>
                   <el-button size="mini" @click="saveSetting">保存</el-button>
                 </div>
               </div>
             </el-tab-pane>
           </el-tabs>
         </div>
        </div>
       </div>
      </div>
</template>

<script>
  import backColor from "../card/backColor"
  import backImage from "../card/backImage"
  import { provinceAndCityData, CodeToText } from "element-china-area-data";
  export default {
      name: "pointMassage",
      components:{backColor,backImage},
      props:{
        startPoint:{
          required:true,
          type:Object
        },
        boxVisible:{
          required: true,
          type:Boolean
        },
        // dialogVisible:{
        //   required:true,
        //   type:Boolean
        // }
      },
      // props:['start-point','box-visible','test-string'],
      //禁止父组件属性传入，class和style会智能一些
      inheritAttrs:false,
      data(){
        return{
          showBorder:false,
          dialogVisible:false,
          curPicInsList:[
            {id:"img0",name:"name1",message:'testa1'},
            {id:"img1",name:"name2",message:'testb2'},
            {id:"img2",name:"name3",message:'testc3'}],//pic列表，最大长度为3
          pictitle:'picture',//默认显示
          changePicFlag:false,
          stylePre:true,
          styleAfter:false,
          count:12,
          busy:false,//滚动是否执行，为true表示繁忙则不执行
          input:'',
          whisper:[
            {userid:'u1',text:'hello'},
            {userid:'u2',text:'world'}
          ],
          // showSetButton:true,
          onLeft:false,
          contextPostion:{x:null,y:null,z:null},
          diffVal:0,
          activeName:"message",
          backStyle:{
            message:{
              color:null,
              image:null
            },
            picture:{
              color:null,
              image:null
            },
            whisper:{
              color:null,
              image:null
            }
          },
          datePicker:'',
          options:provinceAndCityData,
          selectedOptions: [],
          weatherIns:'',
          weatherList:[
            {
              name:'test1'
            },
            {
              name:'test2'
            }
          ],
          saved:false,
          childData:{},
          teamMember:[
            {
              userId:"pl",
              headPic:require("../../assets/image/528865114564200.jpg")
            },
            {
              userId:"ll",
              headPic:require("../../assets/image/528865114564200.jpg")
            },
            {
              userId:"sj",
              headPic:require("../../assets/image/528865114564200.jpg")
            }
          ],
          whisperShow:'1',//留言显示形式
          morePictureList:[
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
          ],//更多图片
          picOptionFlag:'',
          styleTwo:'none',
          pointMusic:'',
          curMusic:'最后的time',
          pointMusicList:[{
            name:'test1',
            owner:'pl',
          },{name:'test1',
            owner:'pl',},{name:'test1',
            owner:'pl',}]
        }
      },
      methods:{
        //边框
        createBorder(show){
          let context = this.$refs.context;
          if(show) {
            context.style.display = "block";
            let borderPath = document.getElementById('borderPath');
            let path = '';
            let start = {x: null, y: null};
            //判断边界情况、如果靠近右边界，则显示在左边、默认在右边
            if(this.startPoint.x > 900){
              this.onLeft = true;
              start.x = 1541 - this.startPoint.x;
              this.contextPostion.x = 'unset';
              this.contextPostion.z = start.x + 'px';
            }else {
              this.onLeft = false;
              start.x = this.startPoint.x + 25;
              this.contextPostion.x = start.x + 'px';
              this.contextPostion.z = 'unset';
            }
            start.y = this.startPoint.y - 98;
            let position = this.onLeft === false ? 20 : 0;
            let circle = this.onLeft === false ? 0 : 1;
            let temp = 20 - position;
            if(start.y <= 20){
              path = 'M'+position+ ' 10 L'+temp+' '+(start.y+10)+' 10 50 10 500 A10 10 0 0 '+circle+' '+position+' 510';
              start.y = 108;
            }else if(start.y >= 540){
              path = 'M'+ position + ' 10 A10 10 0 0 '+circle+' 10 20 L10 470 '+temp+' '+(start.y-50)+' '+ position+' 510';
              start.y = 168;
            }else{
              if(start.y <= 260){
                path = 'M'+position+' 10 A10 10 0 0 '+circle+' 10 20 L10 '+start.y+' '+temp+' '+(start.y+10)+' 10 '+(start.y+20)+
                       ' 10 500 A10 10 0 0 '+circle+' '+position+' 510';
                start.y = 108;
              }else if(start.y >= 300){
                path = 'M'+position+' 10 A10 10 0 0 '+circle+' 10 20 L10 '+(start.y-60)+' '+temp+' '+(start.y-50)+' 10 '+(start.y-40)+
                       ' 10 500 A10 10 0 0 0 '+position+' 510';
                start.y = 168;
              }else{
                path = 'M'+position+' 10 A10 10 0 0 '+circle+' 10 20 L10 260 ' +temp+ ' 270 10 280'+
                       ' 10 500 A10 10 0 0 '+circle+' '+position+' 510';
                start.y = start.y - 152;
              }
            }
            borderPath.setAttribute('d',path);
            this.contextPostion.y = start.y + 'px';
          }else{
            //隐藏内容
            context.style.display = "none";
          }

        },
        //改变pic的大小，显示为全框
        changePictureSize(index){
          this.styleAfter = !this.styleAfter;
          for(let i = 0; i < this.curPicInsList.length; i++) {
            let picture = document.getElementById('SP' + i);
            if (this.styleAfter) {
              if(i !== index) {
                picture.style.marginLeft = '-0.5px';
                picture.style.width = "0px";
              }else{
                picture.style.width = '310px';
              }
            }else{
              picture.style.marginLeft = "4px";
              picture.style.width = "100px";
              this.pictitle = "picture";
            }
          }
        },
        load(){
          // alert("asdf");
          //this.count += 1;
          //这里用于加载whisper
        },
        //发送消息
        sendYouText(){
          //从session获取user信息、目前先自定义代替、记得判空
          let userid = 'plsssssssssssssssss';
          this.whisper.push({userid:userid,text:this.input});
          //清空输入空
          this.input = '';
          //控制滚动条在最底部、显示刚添加的信息
          this.$nextTick(function () {
            let msgIns = document.getElementById("msgIns");
            msgIns.scrollTop = msgIns.scrollHeight;
          });
        },
        //展示用户的粗略信息
        showUserMessage(){
          alert("hello");
        },
        //设置节点样式
        setPointShowStyle(){
          //放大盒子为正方形
          this.styleTwo = 'setpage';
        },
        //获取子组件返回的数据
        getChildData(data){
          this.childData = data;
        },
        //地区转地区码
        areaChange() {
          let loc = "";
          for (let i = 0; i < this.selectedOptions.length; i++) {
            loc += CodeToText[this.selectedOptions[i]];
          }
          alert(loc)
        },
        //回到原始状态
        rePreSize(){
          this.styleTwo = 'none';
        },
        //取消当前设置
        cancelSetting(){
          this.rePreSize();
        },
        //保存当前设置
        saveSetting(){
          this.rePreSize();
          let childData = this.childData;
          //更改背景颜色和背景图片
            if (childData.type === "COLOR") {
              if (childData.location === "M") {
                this.backStyle.message.color = childData.context;
                this.backStyle.message.image = null;
              }
              if (childData.location === "P") {
                this.backStyle.picture.color = childData.context;
                this.backStyle.picture.image = null;
              }
              if (childData.location === "W") {
                this.backStyle.whisper.color = childData.context;
                this.backStyle.whisper.image = null;
              }
              //判断是否为更改节点颜色
              if(childData.location === "PO"){
                childData.id = this.startPoint.id;
                this.$emit("update:change-color",childData);
              }
            } else if (childData.type === "IMAGE") {
              if (childData.location === "M") {
                this.backStyle.message.image = childData.context;
              }
              if (childData.location === "P") {
                this.backStyle.picture.image = childData.context;
              }
              if (childData.location === "W") {
                this.backStyle.whisper.image = childData.context;
              }
            }
        },
        //选择人员
        selectPartner(item){
          let path = document.getElementById(item.userId);
          // canvas.height = 15;
          // canvas.width = 20;
          let dispaly = path.style.display;
          if(dispaly === "block"){
            path.style.display = "none";
          }else{
            path.style.display = "block";
          }
        },
        //选择留言显示背景
        selectWhisperShape(){
          //背景颜色缩放
          // let whisperThird = document.getElementById("whisper-third");
          // whisperThird.style.height = "0px";
          alert("not finish");
        },
        //展示更多图片
        showMorePicture(){
          //放大盒子为正方形
          this.styleTwo = 'morepic';
        },
        //显示图片操作
        showPictureOptions(curid){
          //选择当前图片
          this.picOptionFlag = 'OPA'+curid;
        },
        //关闭图片操作
        closePictureOptions(){
          //不选择任何图片
          this.picOptionFlag = "none of all";
        },
        //选中该图片在初始界面显示
        showPicOnMinipage(){
          //设置当前遮罩
          alert("ss");
        },
        editMusic(name){
          this.curMusic = name;
        }
      },
      watch:{
        startPoint:{
            handler(newval){
            }
        },
        boxVisible:{
          //监听boxVisible,发生改变时调用,并把改变后的值（父组件的属性）返回
          handler(newval){
            this.createBorder(newval);
          }
        }
      }
    }
</script>
<!--scoped会阻止样式穿透、方便修改element-ui的默认样式可用一下方法、参考书签-->
<style>
</style>
<style scoped>
.border{
  display:block;
  float: left;
  margin-top: -10px;
}
.border-after{
  float: right;
}
/deep/ .distpicker{
  height: 10px;
}
/deep/ .el-tabs__content{
  height: 100%;
  padding: 0px;
}
/deep/ .el-tab-pane{
  height: 100%;
}
.first{
  box-sizing: border-box;/*固定大小*/
  height: 10%;
  padding-top: 10px;
}
.extra{
  height: 9%;
}
.second{
  height: 18%;
}
.third{
  box-sizing: border-box;/*固定大小*/
  height: 55%;
  /*overflow: auto;*/
}
.forth{
  padding-left: 65%;
  height: 8%;
}
.context{
  height: 500px;
  width:330px;
  /*display: none;*/
  border-radius: 10px;
  position: absolute;
  transition: all 0.3s linear 0s;
}
.context-after{
  width: 500px;
}
.main{
  height: 100%;
  width: 96.5%;
  overflow: hidden;
  border-radius: 10px;
  border-top: 1px solid black;
  box-sizing: border-box;
}
.main-right{
  float: left;
  margin-left: -10px;
}
.main-left{
  float: right;
  margin-right: -10px;
}
.initpage{
  height: 100%;
  width: 100%;
  float: right;
  display: block;
  transition: all 0.3s linear 0s;
  overflow: hidden;
}
.initpage-after{
  width: 0%;
}
.initpage-left{
  float: left;
}
.setpage{
  height: 100%;
  width: 0%;
  float: left;
  transition: all 0.3s linear 0s;
  background-color: white;
  overflow: hidden;
}
.setpage-after{
  width: 100%;
}
.setpage-left{
  float: right;
}
.morepic{
  height: 100%;
  width: 0%;
  float: left;
  transition: all 0.3s linear 0s;
  background-color: white;
  overflow: hidden;
}
.morepic-after{
  width: 100%;
}
.morepic-left{
  float: right;
}
.set-head{
  box-sizing: border-box;/*固定大小*/
  width: 482.5px;
  height: 8%;
  padding: 10px;
}
.set-context{
  box-sizing: border-box;/*固定大小*/
  /*border: 1px solid red;*/
  width: 482.5px;
  height: 92%;
  /*padding: 2px 2px 0px 2px;*/
}
/deep/ .point-set{
  height: 100%;
  width: 100%;
  border: 0px;
  display: block;
}
.head-pic{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: 50px;  /*背景图片缩放*/
  margin: 0px;
  border: 1px solid black;
}
.head-pic-context{
  /*width: 20%;*/
  /*height: auto;*/
  margin: 1.5%;
  float: left;
}
#point-first{
  height: 40%;
  width: 100%;
  padding-top: 10px;
  box-sizing: border-box;
}
#point-second{
  height: 20%;
  /*padding: 2%;*/
  box-sizing: border-box;
}
#point-third{
  height: 32%;
  /*padding: 2%;*/
  box-sizing: border-box;
}
#point-forth{
  /*box-sizing: border-box;!*固定大小*!*/
  padding-left: 65%;
  height: 8%;
}
#picture-fisrt{
  height: 15%;
  padding-top: 10px;
  box-sizing: border-box;
}
#picture-second{
  height: 22%;
  box-sizing: border-box;
}
#picture-third{
  height: 55%;
  box-sizing: border-box;
}
#picture-forth{
  height: 8%;
  padding-left: 65%;
}
#whisper-first{
  height: 10%;
  padding-top: 10px;
  box-sizing: border-box;
}
#whisper-second{
  height: 10%;
  padding-top: 1%;
  box-sizing: border-box;
}
#whisper-extra{
  height: 0%;
}
#whisper-third{
  height: 17%;
  box-sizing: border-box;
}
#whisper-forth{
  height: 55%;
  box-sizing: border-box;
}
#whisper-fifth{
  height: 8%;
  padding-left: 65%;
}
.morepic-head{
  height: 8%;
  width: 482.5px;
  padding: 10px;
  box-sizing: border-box;
}
.morepic-list{
  height: 92%;
  width: 482.5px;
  box-sizing: border-box;
}
.picture-main{
  width: 100%;
  height: 92%;
  padding-top: 1px;
  padding-bottom: 1px;
  box-sizing: border-box;
}
.picture-sub{
  width: 100%;
  height: 8%;
  padding-left: 65%;
}
.picbox{
  height: 24%;
  width: 24%;
  float: left;
  margin-right: 1%;
  margin-bottom: 1.2%;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid black;
}
.picoptions{
  position: relative;
  height: 100%;
  width: 100%;
  top:-100%;
  background-color: black;
  opacity: 0.5;
  transition: all 0.1s linear 0s;
  z-index: 11;
  overflow: hidden;
}
.picoptions-after{
  top: 0px;
}
.showpic{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 35px;
  margin-top: 10px;
  background-color: white;
}
.previewpic{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 35px;
  margin-top: 10px;
  background-color: white;
}
.removepic{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 35px;
  margin-top: 10px;
  background-color: white;
}
.opation-set{
  height: 18px;
  width: 30px;
  margin-left: 260px;
  background-color: black;
  border-radius: 0px 0px 0px 5px;
}
.opation-close{
  height: 18px;
  width: 30px;
  margin-left: 290px;
  margin-top: -18px;
  background-color: white;
}
.setting-after{
  height: 0%;
  transition: all 0.3s linear 0s;
}
/*过渡动画*/
.information-pre{
  box-sizing: border-box;/*固定大小*/
  width: 320px;
  height: 50px;
  background-color:blueviolet;
  transition: all 0.3s linear 0s;
  background-size: 100% 100%;
}
.information-after{
  height: 0%;
}
.picture-pre{
  width: 320px;
  height: auto;
  background-size: 100% 100%;
  background-color:green;
  /*transition: all 10s linear 0s;*/
}
.whisper-pre{
  width: 320px;
  height: 225px;
  background-color:lavenderblush;
  /*transition: all 10s linear 0s;*/
  background-size: 100% 100%;
}
.whisper-after{
  /*!*height: 0%;*!后期改变高度*/
}
@font-face {
  font-family: 'neo';
  src: url("../../assets/icon/NEOTERICc.ttf");
}

.picture-ins{
  /*inline-block避免与float联用*/
  display: inline-block;
  box-sizing: border-box;/*固定大小*/
  width: 100px;
  height: 100%;
  margin-left: 4px;
  /*border: 1px solid black;*/
  background-image: url("/static/img/528865114564200.jpg");
  transition: all 0.3s linear 0s;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.pic-size-pre:hover{
  opacity: 0.8;
}
.context-head-pre{
  font-family: "neo";
  background-color: #66CCFF;
  box-sizing: border-box;/*固定高度*/
  padding: 1.5%;
  height: 30px;
  letter-spacing: 3px;/*字体间隔*/
  /*transition: all 0.3s;*/
}

.context-body-pre{
  box-sizing: border-box;/*固定高度*/
  padding: 6px 5.2px 6px 0px;
  height: 145px;
  width: 100%;
  transition: all 0.3s linear 0s;
  text-align: center;
  white-space: nowrap;
}
.context-body-after{
  height: 470px;
}
.context-foot-pre{
  box-sizing: border-box;/*固定高度*/
  width: 100%;
  height: 50px;
}
.point-music{
  height: 100%;
  width: 75%;
  float: left;
  background-color: white;
}
.point-music-name{
  width: 100%;
  height: 50%;
  padding-left: 5px;
  box-sizing: border-box;
  background-color: #66CCFF;
}
.point-music-bar{
  width: 100%;
  height: 50%;
  padding-left: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  background-color: wheat;
}
.start-time{
  height: 12px;
  width: 30px;
  float: left;
  background-color: white;
}
.end-time{
  height: 12px;
  width: 30px;
  float: left;
  margin-left: 2px;
  background-color: white;
}
.music-bar-out{
  height: 6px;
  width: 170px;
  /*border-top-left-radius: 10% 50%;*/
  border-radius: 4px;
  margin-top: 2px;
  margin-left: 2px;
  float: left;
  background-color: black;
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
.mid-opation{
  height: 100%;
  width: 25%;
  float: left;
}
.music-opation{
  width: 30px;
  height: 30px;
  float: left;
  border-radius: 50%;
  margin-top: 8px;
  margin-left: 7px;
  background-color: #66CCFF;
}
.more-opation{
  width: 30px;
  height: 30px;
  float: left;
  border-radius: 50%;
  margin-top: 8px;
  margin-left: 7px;
  background-color: #66CCFF;
}
.context-head{
  box-sizing: border-box;/*固定高度*/
  padding: 1.5%;
  height: 15%;
  border-bottom: 1px solid black;
  letter-spacing: 3px;/*字体间隔*/
  font-family: 'neo';
}
.context-body{
  box-sizing: border-box;/*固定高度*/
  padding: 3px 10px;
  border-bottom: 1px solid black;
  height: 68%;
}
.context-foot{
  box-sizing: border-box;/*固定高度*/
  padding: 4px 3px;
  height: 17%;
}
.sometext{
  width: 83%;
}
.infinite-list{
  table-layout: fixed;/*表格固定*/
  width: 100%;
  transition: all .3s linear 0s;
}
.cur-music{
  width: 100%;
  height: 10%;
  background-color: aqua;
  opacity: 0.4;
}
.cur-music-name{
  height: 100%;
  width: 75%;
  float: left;
  background-color: white;
  font-size: 20px;
  box-sizing: border-box;
  padding-top: 5px;
}
.cur-music-part{
  height: 100%;
  width: 25%;
  float: left;
}
.ins-music-head{
  height: 10%;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 0px;
}
.ins-music{
  width: 100%;
  height: 65%;
  background-color: white;
  opacity: 0.6;
}
.new-music{
  width: 100%;
  height: 15%;
  background-color: #ef907a;
}
.new-music-main{
  height: 70%;
  width: 100%;
  box-sizing: border-box;
}
.new-music-input{
  width: 76%;
  float: left;
  height: 100%;
}
.new-music-seach{
  width: 32px;
  height: 28px;
  background-color: black;
  float: left;
  margin-left: 10px;
  border-radius: 10%;
}
.new-music-upload{
  width: 32px;
  height: 28px;
  background-color: black;
  float: left;
  margin-left: 10px;
  border-radius: 10%;
}
.new-music-sub{
  height: 30%;
  width: 100%;
  font-size: 10px;
  line-height: 10px;
}
.list-music{
  width: 98%;
  height: 75%;
  border: 1px solid black;
  border-radius: 3px;
  background-color: lightblue;
  box-sizing: border-box;
  overflow: hidden;
}
.list-music-ins{
  width: 100%;
  height: 10%;
}
.list-music-ins:hover{
  background-color: gray;
}
.music-ins-name{
  height: 100%;
  width: 50%;
  float: left;
  padding-left: 10px;
  box-sizing: border-box;
}
.music-ins-owner{
  height: 100%;
  width: 50%;
  float: left;
  padding-left: 10px;
  box-sizing: border-box;
}
.edit-music{
  width: 100%;
  height: 25%;
  background-color: beige;
  opacity: 0.8;
}
.edit-music-head{
  width: 100%;
  height: 30%;
  background-color: #66CCFF;
  padding-top: 7px;
  box-sizing: border-box;
}
.edit-music-main{
  width: 100%;
  height: 37%;
  background-color: rosybrown;
}
.edit-music-msg{
  height: 100%;
  width: 76%;
  float: left;
}
.edit-music-name{
  width: 100%;
  height: 60%;
  box-sizing: border-box;
  padding-top: 3px;
}
.edit-music-bar{
  width: 100%;
  height: 60%;
}
.edit-start-time{
  height: 12px;
  width: 30px;
  float: left;
  background-color: white;
}
.edit-end-time{
  height: 12px;
  width: 30px;
  float: left;
  margin-left: 2px;
  background-color: white;
}
.edit-music-bar-out{
  height: 6px;
  width: 226.5px;
  /*border-top-left-radius: 10% 50%;*/
  border-radius: 4px;
  margin-top: 2px;
  margin-left: 2px;
  float: left;
  background-color: black;
}
.edit-music-bar-inlen{
  width: 100px;
  height: 6px;
  float: left;
  border-radius: 4px;
  background-color: #733544;
}
.edit-music-bar-incir{
  width: 10px;
  height: 10px;
  float: left;
  margin-top: -2px;
  margin-left: -5px;
  border-radius: 50%;
  background-color: #9b494d;
}
.edit-music-opation{
  height: 100%;
  width: 24%;
  float: left;
  padding-top: 7px;
  box-sizing: border-box;
}
.edit-music-opation-pause{
  width: 32px;
  height: 28px;
  background-color: black;
  float: left;
  margin-left: 10px;
  border-radius: 10%;
}
.edit-music-opation-cut{
  width: 32px;
  height: 28px;
  background-color: black;
  float: left;
  margin-left: 10px;
  border-radius: 10%;
}
.edit-music-sub{
  width: 100%;
  height: 33%;
  padding-left: 65%;
  background-color: salmon;
}
</style>
