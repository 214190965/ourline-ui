<template>
  <div>
    <div id="left-border">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="10"
      style="display: block;"
      height="560">
      <path
        d="M10 0 L10 29 0 34 10 39 10 560"
        fill="none"
        stroke="black"
        stroke-width="1">
      </path>
    </svg>
    </div>
    <div id="context"
         class="context-pre"
         :class="{'context-after':styleAfter}">
      <div id="user-opation"
           class="user-opation-pre"
           :class="{'user-opation-after':styleAfter}">
        <div class="user-opa-back"
             ref="userBack">
          <div class="chang-user-opapic">
            <div class="user-opapic-head"
                 @click="changeCurPage('T')">
              <img class="opapic" src="../../assets/icon/clothes_shirt_32px_1115981_easyicon.net.png">
              更换封面
            </div>
            <div class="back"
                 @click="showMoreUserOpation"></div>
            <div class="close"></div>
          </div>
          <!--该盒子用于填充中间空白区域-->
          <div class="extra-div" ref="extraDiv"></div>
          <div style="height: 70px;width: 400px">
           <div class="user-opa-head">
            <div class="user-opa-headpic"
                 @click="changeCurPage('H')">
              <div class="user-opa-headpic-size"
                   :style="{'left':headPicEndSize.left,
                            'top':headPicEndSize.top,
                            'width':headPicEndSize.size,
                            'height':headPicEndSize.size,
                            'transform':headPicEndSize.rotate,
                            'background-image':headPicEndSize.image}"></div>
            </div>
            <div class="user-opa-name">
              <el-input class="user-new-name"
                        v-model="newName"></el-input>
            </div>
            <div class="user-opa-sign">
              <el-input class="user-new-sign"
                        v-model="newSign"></el-input>
            </div>
          </div>
          <div class="user-opa-praise"
               @click="changeCurPage('P')">
            <img class="praise-pic" src="../../assets/icon/thumb_21.288364249578px_1195462_easyicon.net.png">
            282
          </div>
         </div>
        </div>
        <div class="user-msg"
             ref="userMsg">
          <el-form
            ref="userMessage"
            :inline="true"
            :model="userMessage"
            :rules="rules"
          >
            <el-form-item  label="姓名" class="base-item" :show-message="false" style="margin-top: 7px">
              <el-input class="user-base-msg" size="mini" v-model="userMessage.name"></el-input>
            </el-form-item>
            <el-form-item label="性 别" prop="gender" class="base-item" style="margin-top: 7px">
              <el-input class="user-base-msg" size="mini" v-model="userMessage.gender"></el-input>
            </el-form-item>
            <el-form-item label="生 日" class="base-item">
              <el-date-picker
                type="date"
                v-model="userMessage.birthday"
                size="mini"
                style="width: 100%;"
                placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="血 型" class="base-item">
              <el-input class="user-base-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <!--记得加提示，后期自己写一个提示组件-->
            <el-form-item label="标 签" class="more-item">
              <div class="user-label-list"
                   @click="addNewLabel">
                <div v-for="(item,index) in userLabelList"
                     class="user-label-ins"
                     :id="'label-'+index"
                     @mouseover="showRemoveBtn(index)"
                     @mouseleave="noShowRemoveBtn(index)"
                     :style="{'background-color':item.color}"
                     :key="index"> {{ item.name }}
                  <div class="label-remove"
                       :id="'label-btn-'+index"
                       @click="removeCurrLabel(index)"></div>
                </div>
                <div id="newLabel"
                     ref="newLabel">
                <el-input size="mini"
                          id="labelInput"
                          placeholder="按回车添加"
                          class="user-new-label"
                          @keypress.native.enter="pushNewLabelToList"
                          v-model="newLabel"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="职 业" class="more-item">
              <el-input class="user-more-msg  " size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item label="公 司" class="more-item">
              <el-input class="user-more-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item label="住 址" class="more-item">
              <el-input class="user-more-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item label="故 乡" class="more-item">
              <el-input class="user-more-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item label="手 机" class="more-item">
              <el-input class="user-more-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" class="more-item">
              <el-input class="user-more-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item label="简 介" class="more-item">
              <el-input class="user-more-msg" size="mini" v-model="userMessage.blood"></el-input>
            </el-form-item>
            <el-form-item class="more-item" style="margin-left: 77%;width: 20%;margin-top: -5px">
              <el-button size="mini">保 存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="change-theme"
             ref="changeTheme">
          <!--名称、设计者-->
          <div style="width: 400px;
                      height: 100%;
                      overflow: auto;
                      padding: 6px 0px;
                      box-sizing: border-box"
               @scroll="showThemeBtn">
          <div v-for="(item,index) in themePicList"
               class="theme-pic-ins"
               @click="changeThemePicture"
               :style="{'backgroundImage':'url('+item.url+')'}"
               :key="index"></div>
          </div>
          <div class="theme-btn" ref="themeBtn">
            <el-button size="mini"
                       @click="cancelCurOpation">取消</el-button>
            <el-button size="mini"
                       type="primary">保存</el-button>
          </div>
        </div>
        <div class="change-headpic"
             ref="changeHeadpic">
          <div style="height: 76%;width: 400px">
          <div class="head-pic-main"
               ref="headPicMain">
            <div style="width: 308px;height: 308px;overflow: hidden;margin-left: 6px;margin-top: 6px">
              <div class="head-pic-size"
                   style="transform: rotate(0deg)"
                   :style="{'background-image':headPicEndSize.image}"
                   ref="headPicSize">
             </div>
            </div>
            <div style="width: 308px;height: 308px;position: relative;top:-308px;"
                 @mousedown="moveHeadPicStart($event)"
                 @mousemove="moveHeadPictures($event)"
                 @mouseup="moveHeadPicEnd()">
            <svg
              class="linediv"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              style="margin-left: 6px"
              width="100%"
              height="100%">
              <path class="lineins"
                    d="M0 0 L0 154 A154 154 0 0 1 154 0 L0 0"
                    fill="#000000"
                    fill-opacity="0.6"
                    stroke="black"
                    stroke-width="0">
              </path>
              <path class="lineins"
                    d="M0 154 L0 308 154 308 A154 154 0 0 1 0 154"
                    fill="#000000"
                    fill-opacity="0.6"
                    stroke="black"
                    stroke-width="0">
              </path>
              <path class="lineins"
                    d="M154 308 L308 308 308 154 A154 154 0 0 1 154 308"
                    fill="#000000"
                    fill-opacity="0.6"
                    stroke="black"
                    stroke-width="0">
              </path>
              <path class="lineins"
                    d="M308 154 L308 0 154 0 A154 154 0 0 1 308 154"
                    fill="#000000"
                    fill-opacity="0.6"
                    stroke="black"
                    stroke-width="0">
              </path>
            </svg>
            </div>
            <div class="head-pic-size-opa">
              <el-button circle icon="el-icon-minus" size="mini"
                         @click="()=>{if(this.headPicSize > 0){this.headPicSize--;this.changeHeadPicSize()}}"
                         style="float: left;
                                margin: 6px 14px 0px 2px;"></el-button>
              <el-slider v-model="headPicSize" :show-tooltip="false"
                         @input="changeHeadPicSize"
                         @change="changeHeadPicSizeEnd"
                         style="width: 145px;float: left;margin-top: 1px">
              </el-slider>
              <el-button circle icon="el-icon-plus" size="mini"
                         @click="()=>{if(this.headPicSize < 100){this.headPicSize++;this.changeHeadPicSize()}}"
                         style="margin: 6px 4px 0px 14px"></el-button>
              <el-button circle icon="el-icon-refresh-left" size="mini"
                         @click="rotateHeadPicture('L')"
                         style="margin: 6px 4px 0px 0px"></el-button>
              <el-button circle icon="el-icon-refresh-right" size="mini"
                         @click="rotateHeadPicture('R')"
                         style="margin: 6px 4px 0px 0px"></el-button>
            </div>
          </div>
          <div class="head-pic-more-btn"
               ref="picMoreBtn"
               @click="showHeadPicInSquare">
            <div class="head-pic-more-arrow"
                 ref="picMoreBtnArrow">
            </div>
          </div>
          <div class="head-pic-ins"
               ref="headPicIns">
            <div class="head-pic-ins-uploan"
                 ref="headPicInsUploan"></div>
            <!--HP head picture-->
            <div class="head-pic-ins-list"
                 v-for="(item,index) in themePicList"
                 :ref="index"
                 :id="'HP'+index"
                 :style="{'backgroundImage':'url('+item.url+')'}"
                 @click="changeHeadPicIns('HP'+index)"></div>
          </div>
          </div>
          <div class="head-pic-history">
            <div style="height: 20%;
                        width: 100%;
                        font-size: 10px;
                        margin-top: 5px;
                        margin-bottom: 2px;
                        padding-left: 9px;
                        white-space: nowrap;
                        overflow: hidden;
                        box-sizing: border-box">我使用过的头像：</div>
            <div class="head-pic-history-btn"
                 style="background-image: url('/static/img/左箭头.png')"
                 @click="showHeadPicHistory('L')"></div>
            <div style="height: 60px;
                        width: 382px;
                        float: left;
                        white-space: nowrap">
              <!--HPH head picture history-->
              <div class="head-pic-history-ins"
                 v-for="(item,index) in showSevenHeadPic"
                 :ref="index"
                 :id="'HPH'+index"
                 :style="{'background-image':item}"
                 @click="changeHeadPicIns('HPH'+index)">
              </div>
            </div>
            <div class="head-pic-history-btn"
                 style="background-image: url('/static/img/箭头.png')"
                 @click="showHeadPicHistory('R')"></div>
          </div>
          <div class="head-pic-btn">
            <el-button size="mini"
                       @click="cancelCurOpation">取消</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="savePicWhitNewSize">保存</el-button>
          </div>
        </div>
        <div class="show-praise"
             ref="showPraise">
          <!--这里只统计30天內发生的点赞-->
          <div class="praise-head">
            <div class="praise-today">
              <div style="height: 60%;
                          width: 100%;
                          font-size: 60px;
                          text-align: center">12</div>
              <div style="height: 40%;
                          width: 100%;
                          padding-top: 5px;
                          box-sizing: border-box;
                          font-size: 18px;
                          text-align: center">今日获赞</div>
            </div>
            <div class="praise-all">
              <div style="height: 60%;
                          width: 100%;
                          font-size: 60px;
                          text-align: center">356</div>
              <div style="height: 40%;
                          width: 100%;
                          padding-top: 5px;
                          box-sizing: border-box;
                          font-size: 18px;
                          text-align: center">获赞总数</div>
            </div>
          </div>
          <div class="praise-context">
            <el-tabs tab-position="top"
                     type="border-card">
              <el-tab-pane label="谁赞过我">
                <div v-for="(item,index) in praiseYouList"
                     :key="index">
                  <p style="padding-left: 10px">{{ item.date }}</p>
                  <div v-for="(userMsg,userIndex) in item.userlist"
                       :key="userIndex"
                       class="praise-user-ins">
                    <div class="praise-user-ins-pic"
                         :style="{'background-image':userMsg.userPic}"></div>
                    <div class="praise-user-ins-name">{{ userMsg.userName }}</div>
                    <div class="praise-user-ins-sign">{{ userMsg.userSign }}</div>
                    <div class="praise-user-ins-icon">
                      <p style="float: left;margin-top: 2px">praise you {{ userMsg.nums}}!</p>
                      <div class="praise-icon"
                           @click="praiseCurUser($event,index,userIndex)"
                           style="float: left;
                           width: 20px;height: 20px;
                           margin-left: 10px;">
                        <!--PI praise icon-->
                        <svg
                          class="linediv"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          width="20px"
                          height="20px">
                          <path d="M0 8 L3 7.5
                                   A10 10 0 0 0 8 2
                                   A2 2 0 0 1 11 4
                                   A8 8 0 0 1 9 7.5
                                   L13 8
                                   A2 2 0 0 1 14.5 10
                                   L12 17.5
                                   A3 3 0 0 1 8 17.5
                                   L3 15 0 15 0 7.5"
                                :id="'PI' + index + userIndex"
                                fill="none"
                                stroke="blue"
                                stroke-width="1"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="我赞过谁">
                <div v-for="(item,index) in youPraiseList"
                     :key="index">
                  <p style="padding-left: 10px">{{ item.date }}</p>
                  <div v-for="(userMsg,userIndex) in item.userlist"
                       :key="userIndex"
                       class="praise-user-ins">
                    <div class="praise-user-ins-pic"
                         :style="{'background-image':userMsg.userPic}"></div>
                    <div class="praise-user-ins-name">{{ userMsg.userName }}</div>
                    <div class="praise-user-ins-sign">{{ userMsg.userSign }}</div>
                    <div class="praise-user-ins-icon">
                      <p style="float: left;margin-top: 2px">you praise {{ userMsg.nums}}!</p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div id="user-message"
           class="user-message-pre"
           :class="{'user-message-after':styleAfter}">
      <div class="close-user-message" style="height: 24px;width: 300px;background-color: white;
                                             padding-left: 260px;box-sizing: border-box">
        <div style="width: 40px;height: 20px;background-color: black"></div>
      </div>
      <div id="head">
        <div id="user-head-pic"
             @mouseover="showFloatMessage($event,{target:userid,main:name,sub:sign})"
             @mouseleave="closeFloatMessage"
             @click="showMoreUserOpation">
          <div class="user-head-pic-size"
               :style="{'left':headPicEndSize.left,
                        'top':headPicEndSize.top,
                        'width':headPicEndSize.size,
                        'height':headPicEndSize.size,
                        'transform':headPicEndSize.rotate,
                        'background-image':headPicEndSize.image}">
          </div>
        </div>
        <!--用户头信息-->
        <div id="user-name">{{name}}</div>
        <div id="user-sign">{{sign}}</div>
      </div>
      <div id="group">
        <div id="search">
          <el-input size="mini"
                    prefix-icon="el-icon-search"
                    class="search-input"
                    clearable
                    @input="searchSomething"
                    style="opacity: 0.5;"
                    v-model="searchString"></el-input>
        </div>
        <div id="group-list">
          <div
            v-for="(item,index) in groupList"
            class="group-ins"
            :key="index">
            <!--GD group display-->
            <div class="group-display"
                 :id="'GD'+item.groupid"
                 @mouseover="showGroupChat(item.groupid)"
                 @mouseleave="hiddenGroupChat(item.groupid)">
              <!--GHP group head pic-->
              <div class="group-head"
                   @click="openGroupMembers(item.groupid)"
                   @contextmenu.prevent="openGroupSet(item.groupid)">
                <div class="group-pic"
                     :style="{'background-image':item.groupheadpic}"
                     @mouseover="showFloatMessage($event,{target:item.groupid,main:item.groupname,sub:item.groupsign})"
                     @mouseleave="closeFloatMessage"
                     :id="'GHP'+item.groupid"></div>
                <div class="group-name"> {{item.groupname}}</div>
                <div class="group-sign"> {{item.groupsign}}</div>
              </div>
              <!--GCP group chat picture-->
              <div class="group-chat"
                   :id="'GCP'+item.groupid"
                   @click="addGroupToChat(item)"></div>
            </div>
            <!--GM group members-->
            <div class="cur-group-list"
                 style="display: none;"
                 :id="'GM'+item.groupid">
              <div class="member-list"
                   v-for="member in item.groupMemberlist">
                <div class="member-head"
                     @mouseover="showFloatMessage($event,{target:'id',main:'sysConfig.json',sub:'sysConfig.json'})"
                     @mouseleave="closeFloatMessage"></div>
                <div class="member-name"> {{ member }}</div>
                <div class="member-sign">Hello,How old are you?</div>
              </div>
            </div>
            <!--GS group setting-->
            <div class="cur-group-set"
                 style="display: none"
                 :id="'GS'+item.groupid">
              <div class="group-view" style="height: 100px;width: 300px">
                <div class="group-echarts">
                  <div class="echarts-ins" :id="'E1'+item.groupid"></div>
                  <p class="echarts-title">人数</p>
                </div>
                <div class="group-echarts">
                  <div class="echarts-ins" :id="'E2'+item.groupid"></div>
                  <p class="echarts-title">参与率</p>
                </div>
                <div class="group-echarts">
                  <div class="echarts-ins" :id="'E3'+item.groupid"></div>
                  <p class="echarts-title">test</p>
                </div>
              </div>
              <div class="group-user-name group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,1)">
                  <p class="group-set-name" style="width: 30px;float: left">名称</p>
                  <p class="group-set-message" style="width: 220px;">{{groupSet.groupUserName}}一群快乐的沙雕</p>
                  <p class="group-set-arrow" :id="'GA1'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC1'+item.groupid" style="display: none">
                  <el-input size="mini" placeholder="input you nickname" v-model="groupSet.groupUserName"></el-input>
                </div>
              </div>
              <div class="group-user-name group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,2)">
                  <p class="group-set-name" style="width: 30px;float: left">简介</p>
                  <p class="group-set-message" style="width: 220px;">{{groupSet.groupUserName}}一群快乐的沙雕，快来关注我们把</p>
                  <p class="group-set-arrow" :id="'GA2'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC2'+item.groupid" style="display: none">
                  <el-input size="mini" placeholder="input you nickname" v-model="groupSet.groupUserName"></el-input>
                </div>
              </div>
              <div class="group-notice group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContextNotice(item.groupid)">
                  <p class="group-set-name" style="width: 40px;float: left">群公告</p>
                  <p class="group-set-arrow" :id="'GNA'+item.groupid"></p>
                </div>
                <div class="group-set-context"
                     style="display: block;height: 64px;overflow: hidden">
                  <div :id="'GNC'+item.groupid" style="display: none">
                    <el-input type="textarea" placeholder="say something" v-model="groupSet.groupNotice"></el-input>
                  </div>
                  <p style="width: 265px;height: 64px;word-break: break-word">{{groupSet.groupNotice}}sssssssssssssssssssssssssssssssssssssssssssss</p>
                </div>
              </div>
              <div class="group-head-pic group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,4)">
                  <p class="group-set-name">群头像</p>
                  <p class="group-set-arrow" :id="'GA4'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC4'+item.groupid"
                     style="height: 150px;overflow: auto;padding-right: 0px;display: none">
                  <div class="group-head-pic-upload"></div>
                  <!--GSHP group setting head pic-->
                  <div class="group-head-pic-list"
                       v-for="(ins,index) in groupHeadPicList"
                       :id="'GSHP'+index"
                       :key="index"
                       :style="{'background-image':ins}"
                       @click="changeGroupHeadPic(item.groupid,index)"></div>
                </div>
              </div>
              <!--这里预留一个：群路线背景（改方节点栏）-->
              <div class="group-back-pic group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,5)">
                  <p class="group-set-name">你的聊天背景</p>
                  <p class="group-set-arrow" :id="'GA5'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC5'+item.groupid"
                     style="height: 150px;overflow: auto;padding-right: 0px;display: none" >
                  <div class="group-back-pic-upload"></div>
                  <div class="group-back-pic-list"
                       v-for="(item,index) in groupHeadPicList"
                       :key="index"
                       :style="{'background-image':item}"></div>
                </div>
              </div>
              <div class="group-user-name group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,6)">
                  <p class="group-set-name" style="width: 90px;float: left">你在群里的备注</p>
                  <p class="group-set-message" style="width: 160px;">{{groupSet.groupUserName}}你们的亲爹</p>
                  <p class="group-set-arrow" :id="'GA6'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC6'+item.groupid" style="display: none">
                  <el-input size="mini" placeholder="input you nickname" v-model="groupSet.groupUserName"></el-input>
                </div>
              </div>
              <div class="group-shield group-set-item">
                <div class="group-set-head">
                  <p class="group-set-name">消息免打扰</p>
                  <div style="float: right;margin-top: 5px">
                    <el-switch v-model="groupSet.groupShield"
                               active-color="#13ce66"
                               inactive-color="#ff4949">
                    </el-switch>
                  </div>
                </div>
              </div>
              <div class="group-send group-set-item">
                <div class="group-set-head">
                  <p class="group-set-name">发布到蓝星</p>
                  <div style="float: right;margin-top: 5px">
                    <el-switch v-model="groupSet.groupShield"
                               active-color="#13ce66"
                               inactive-color="#ff4949">
                    </el-switch>
                  </div>
                </div>
              </div>
              <div class="group-honour group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,7)">
                  <p class="group-set-name">群荣誉</p>
                  <p class="group-set-arrow" :id="'GA7'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC7'+item.groupid"  style="display: none"></div>
              </div>
              <div class="group-add group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,8)">
                  <p class="group-set-name">邀请好友</p>
                  <p class="group-set-arrow" :id="'GA8'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC8'+item.groupid" style="display: none">
                  <!--这里采用及时索引的方式（@input）-->
                  <el-input size="mini" placeholder="input username"></el-input>
                  <div style="height: 30px;padding-top: 5px">
                    <div class="user-results">214190965</div>
                    <div class="user-result-btn">
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-romove group-set-item">
                <div class="group-set-head"
                     @click="showGroupSetContext(item.groupid,9)">
                  <p class="group-set-name">退出该群</p>
                  <p class="group-set-arrow" :id="'GA9'+item.groupid"></p>
                </div>
                <div class="group-set-context" :id="'GC9'+item.groupid" style="display: none">
                  <p>你确定吗？</p>
                  <div style="width: 265px;height: 30px;padding-top: 5px;padding-left: 135px">
                    <el-button size="mini" type="primary">取消</el-button>
                    <el-button size="mini" type="danger">确定</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="foot">
<!--        <div class="more-selection">-->
<!--        </div>-->
      </div>
     </div>
      <!--动画-->
      <transition-group
        tag="div"
        appear
        v-bind:css="true"
        v-on:enter="praiseEnter">
        <div class="praise-icon-float"
             v-for="(item) in praiseFloatNums"
             :key="item.date"
             :style="{'top':praiseFloatTop}"
             id="praiseIconFloat">
          <svg
            class="linediv"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="20px"
            height="20px">
            <!--PFI  praise float icon-->
            <path d="M0 8 L3 7.5
                     A10 10 0 0 0 8 2
                     A2 2 0 0 1 11 4
                     A8 8 0 0 1 9 7.5
                     L13 8
                     A2 2 0 0 1 14.5 10
                     L12 17.5
                     A3 3 0 0 1 8 17.5
                     L3 15 0 15 0 7.5"
                  :fill="item.color"
                  stroke="black"
                  stroke-width="0"
            ></path>
          </svg>
        </div>
      </transition-group>
      <!--悬浮信息-->
      <transition
        appear
        tag="div"
        v-bind:css="true"
        v-on:enter="floatMsgEnter"
        v-on:leave="floatMsgLeave">
        <float-message
          class="float-message"
          :show="userFloatMsg.show"
          :main="userFloatMsg.main"
          :sub="userFloatMsg.sub"
          offset-x="315px"
          :offset-y="userFloatMsg.offsetY"
          :list="userFloatMsg.list"
        ></float-message>
      </transition>
    </div> <!--context-->
  </div>
</template>

<script>
  import velocity from 'velocity-animate/velocity.min'
  import Moment from 'moment'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'zrender/lib/svg/svg';
  import floatMessage from '../card/floatMessage'
  export default {
        name: "userPage",
        components:{floatMessage},
        props:{
          userid:{
            required:true,
            type:String
          }
        },
        data(){
          return{
            searchString:"",//搜索关键字
            groupList:[
              {groupid:"group01",groupname:"test01",groupsign:'test01',
                groupheadpic:'url("/static/img/528865114564200.jpg")',groupsize:16,groupMemberlist:["name1","name2","name3"]},
              {groupid:"group02",groupname:"test02",groupsign:'test01',
                groupheadpic:'url("/static/img/3432675308033973.jpg")',groupsize:15,groupMemberlist:["name1","name2","name3"]},
              {groupid:"group03",groupname:"test03",groupsign:'test01',
                groupheadpic:'url("/static/img/528865114564200.jpg")',groupsize:14,groupMemberlist:["name1","name2","name3"]},
            ],
            stylePre:true,
            styleAfter:false,
            titleMsg:'',
            name:'那道光被白光遮盖',
            sign:'不知道说什么',
            newName:'',
            newSign:'',
            userMessage:{
              name:'',
              gender:'',
              birthday:'',
              blood:'',
            },
            //表单验证规则,通过item上的prop同名绑定
            rules:{
              name:{required: true,max:5}
            },
            userLabelList:[
              {
              name:'he is so fat',
              color:'red'
            },
            {
              name:'she is beautiful',
              color:'yellow'
            },
            {
              name:'i am hot',
              color:'green'
            }],
            newLabel:'',
            themePicList:[
              {
                id:"test1",
                url:require("../../assets/image/528865114564200.jpg")
              }
            ],
            timer:'',//延迟执行队列
            clickFlag:'N',
            headPicSize:0,
            endHeadPicSize:0,//图片最后的尺寸
            isMoveDown:false,
            //图片初始位置
            headPicInitPos:{left:0,up:0,right:0,down:0,initX:0,initY:0},
            headPicEndPos:{left:0,top:0,leftUnit:0,topUnit:0},
            headPicMove:false,//图片是否移动
            //最终呈现的头像效果
            headPicEndSize:{
              left:'0px',
              top:'0px',
              size:'100%',
              rotate:'',
              image:'url("/static/img/3432675308033973.jpg")',
            },
            //历史头像
            headPicHisList:['url("/static/img/3432675308033973.jpg")'],
            headPicHisListLength:0,
            showSevenHeadPic:[],//显示的个数
            showSevenPos:0,//历史头像数组位置
            clickTimer:1,//对于放大展示的点击次数
            //今天和昨天可在查询的时候做好
            praiseYouList:[
              {
              date:"今天",
              userlist:[{date:"2020-11-25",
                userId:"test1",
                userPic:"url('/static/img/3432675308033973.jpg')",
              userName:"pl1",
              userSign:"hello",
              nums:"5"},
                {date:"2020-11-25",
                  userId:"test4",
                  userPic:"url('/static/img/3432675308033973.jpg')",
                userName:"pl2",
                userSign:"hello",
                nums:"5"}],
            },
              {
                date:"昨天",
                userlist:[{
                  date:"2020-11-24",
                  userId:"test2",
                  userPic:"url('/static/img/3432675308033973.jpg')",
                  userName:"pl3",
                  userSign:"hello",
                  nums:"2",
                }]
              },{
                date:"2020-11-16",
                userlist:[{
              date:"2020-11-16",
              userId:"test3",
              userPic:"url('/static/img/3432675308033973.jpg')",
              userName:"pl4",
              userSign:"hello",
              nums:"1",}]
            }],
            youPraiseList:[],
            praiseFloat:false,
            praiseFloatNums:[],
            praiseFloatTop:'',//图标开始漂浮的位置
            praiseFloatColor:'',//图标颜色
            //群设置
            groupSet:{groupHead:true,groupNotice:'',groupUserName:'',groupShield:true},
            groupHeadPicList:['url("/static/img/3432675308033973.jpg")',
              'url("/static/img/3432675308033973.jpg")'],
            //这里存放悬浮信息、提示信息也是悬浮信息的一种
            userFloatMsg:{
              show:false,
              main:'',
              sub:'',
              offsetY:'',
              list:[],
            }
          }
        },
        mounted(){
          //初始化历史头像数组
          this.showSevenHeadPic = this.headPicHisList.slice(0,6);
        },
        methods:{
          test(){
            alert("hello")
          },
          //打开群成员
          openGroupMembers(groupid){
            //显示成员
            let members = document.getElementById("GM"+groupid);
            let groupSet = document.getElementById("GS"+groupid);
            let display = document.getElementById("GD"+groupid);
            if(members.style.display === "none"){
              //显示成员
              members.style.display = "block";
              //设置几面设置为隐藏
              groupSet.style.display = 'none';
              this.groupSet.groupHead = true;
              display.style.backgroundColor = 'steelblue';
            }else{
              //显示成员
              members.style.display = "none";
              display.style.backgroundColor = '';
            }
          },
          //打开群设置
          openGroupSet(groupid){
            let groupSet = document.getElementById("GS"+groupid);
            let members = document.getElementById("GM"+groupid);
            let display = document.getElementById("GD"+groupid);
            if(groupSet.style.display === 'none') {
              //解锁群名称可编辑
              this.groupSet.groupHead = false;
              groupSet.style.display = 'block';
              //用户列表界面隐藏
              members.style.display = 'none';
              display.style.backgroundColor = 'steelblue';
              //echarts规定只能使用原生的dom获取方式,这里数据量小，采用svg渲染
              let chartOne = echarts.init(document.getElementById('E1' + groupid), 'light', {renderer: 'svg'});
              let chartTwo = echarts.init(document.getElementById('E2' + groupid), 'light', {renderer: 'svg'});
              let chartThree = echarts.init(document.getElementById('E3' + groupid), 'light', {renderer: 'svg'});
              let option = {
                tooltip: {
                  trigger: 'item',
                  position: [10, 30],
                },
                series: [
                  {
                    // name: '人数',
                    type: 'pie',
                    radius: '80%',
                    hoverOffset: 5,
                    color: ['blue', 'pink'],
                    label: {
                      show: false,
                      position: 'center'
                    },
                    data: [
                      {value: 335, name: '男生'},
                      {value: 31, name: '女生'},
                    ]
                  }
                ]
              };
              chartOne.setOption(option);
              chartTwo.setOption(option);
              chartThree.setOption(option);
            }else{
              this.groupSet.groupHead = true;
              //再次点击隐藏
              groupSet.style.display = 'none';
              display.style.backgroundColor = '';
            }
          },
          showGroupSetContext(groupid,itemindex){
            let curContext = document.getElementById('GC' + itemindex + groupid);
            let curArrow = document.getElementById('GA' + itemindex + groupid);
            if(curContext.style.display === 'none'){
              curContext.style.display = 'block';
              //箭头旋转
              curArrow.style.transform = 'rotate(90deg)';
            }else{
              curContext.style.display = 'none';
              //箭头旋转
              curArrow.style.transform = 'rotate(0deg)';
            }
          },
          //对于群公告，我们单独拿出来
          showGroupSetContextNotice(groupid){
            let curContext = document.getElementById('GNC' + groupid);
            let curArrow = document.getElementById('GNA' + groupid);
            if(curContext.style.display === 'none'){
              curContext.style.display = 'block';
              //箭头旋转
              curArrow.style.transform = 'rotate(90deg)';
            }else{
              curContext.style.display = 'none';
              //箭头旋转
              curArrow.style.transform = 'rotate(0deg)';
            }
          },
          //更换群头像
          changeGroupHeadPic(groupid,index){
            let groupHp = document.getElementById('GHP' + groupid);
            let groupSetHp = document.getElementById('GSHP' + index);
            groupHp.style.backgroundImage = groupSetHp.style.backgroundImage;
          },
          //显示群聊按钮
          showGroupChat(groupid){
            let groupChatPic = document.getElementById('GCP' + groupid);
            groupChatPic.style.opacity = '1';
          },
          //隐藏群聊按钮
          hiddenGroupChat(groupid){
            let groupChatPic = document.getElementById('GCP' + groupid);
            groupChatPic.style.opacity = '0';
          },
          //加入群聊
          addGroupToChat(item){
            let sendItem = {groupname:item.groupname,groupsign:item.groupsign,groupheadpic:item.groupheadpic};
            this.$emit('update:addgroup',sendItem);
          },
          //显示悬浮信息
          showFloatMessage(e,item){
            this.userFloatMsg.show = true;
            this.userFloatMsg.main = item.main;
            this.userFloatMsg.sub = item.sub;
            this.userFloatMsg.offsetY = (e.clientY - e.offsetY-130) + 'px';
          },
          //关闭显示悬浮信息
          closeFloatMessage(){
            this.userFloatMsg.show = false;
          },
          showMoreUserOpation(){
            this.stylePre = !this.stylePre;
            this.styleAfter = !this.styleAfter;
            this.closeFloatMessage();
          },
          searchSomething(){
            // alert("sss")
          },
          addNewLabel(){
            //显示输入框
            let newLabel = this.$refs.newLabel;
            //也许refs只作用于div元素
            let labelInput = document.getElementById("labelInput");
            newLabel.style.display = "block";
            labelInput.focus();
          },
          pushNewLabelToList(){
            let labelObj = {name:'',color:''};
            let colorList = ['#66CCFF','red','green','yellow','teal'];
            //判空
            if(this.newLabel.length !== 0) {
              labelObj.name = this.newLabel;
              //背景颜色随机
              labelObj.color = colorList[Math.floor(Math.random()*colorList.length)];
              this.userLabelList.push(labelObj);
            }
            //重置
            this.newLabel = '';
          },
          //显示删除按钮
          showRemoveBtn(index){
            let currLabelBtn = document.getElementById("label-btn-"+index);
            currLabelBtn.style.display = "block"
          },
          //隐藏删除按钮
          noShowRemoveBtn(index){
            let currLabelBtn = document.getElementById("label-btn-"+index);
            currLabelBtn.style.display = "none"
          },
          //删除当前标签
          removeCurrLabel(index){
            let currLabel = document.getElementById("label-"+index);
            currLabel.remove();
          },
          //切换当前界面
          changeCurPage(flag){
            this.$refs.userBack.style.height = "16.8%";
            this.$refs.userMsg.style.height = "0%";
            this.$refs.extraDiv.style.height = "0px";
            let changeTheme = this.$refs.changeTheme;
            let changeHeadpic = this.$refs.changeHeadpic;
            let showPraise = this.$refs.showPraise;
            if(this.clickFlag !== flag) {
              switch (flag) {
                case 'T': {
                  changeTheme.style.height = "83.2%";
                  changeTheme.style.display = "block";
                  changeHeadpic.style.height = "0%";
                  showPraise.style.height = "0%";
                  changeHeadpic.style.display = "none";
                  showPraise.style.display = "none";
                } break;
                case 'H': {
                  changeTheme.style.height = "0%";
                  changeTheme.style.display = "none";
                  changeHeadpic.style.height = "83.2%";
                  changeHeadpic.style.display = "block";
                  showPraise.style.height = "0%";
                  showPraise.style.display = "none";
                } break;
                case 'P': {
                  changeTheme.style.height = "0%";
                  changeTheme.style.display = "none";
                  changeHeadpic.style.height = "0%";
                  changeHeadpic.style.display = "none";
                  showPraise.style.height = "83.2%";
                  showPraise.style.display = "block";
                } break;
              }
              this.clickFlag = flag;
            }else{
              this.resizeCurPage();
              this.clickFlag = 'N';
            }
          },
          //选择主题
          changeThemePicture(){
            //主题不是图片
          },
          //显示按钮
          showThemeBtn(){
            //清除上一个延迟执行
            clearTimeout(this.timer);
            let themeBtn = this.$refs.themeBtn;
            themeBtn.style.top = "-8%";
            //把上一个延迟执行保存
            this.timer = setTimeout(()=>{
              themeBtn.style.top = "-8%";
            },2000);
          },
          //取消当前操作
          resizeCurPage(){
            this.$refs.userBack.style.height = "60%";
            let userMsg = this.$refs.userMsg;
            userMsg.style.height = "40%";
            this.$refs.extraDiv.style.height = "242px";
            let changeTheme = this.$refs.changeTheme;
            changeTheme.style.height = "0%";
            let changeHeadpic = this.$refs.changeHeadpic;
            changeHeadpic.style.height = "0%";
            let showPraise = this.$refs.showPraise;
            showPraise.style.height = "0%";
            setTimeout(()=>{
              changeTheme.style.display = "none";
              changeHeadpic.style.display = "none";
              showPraise.style.display = "none";
              userMsg.style.display = "block";
            },200);
          },
          cancelCurOpation(){
            this.resizeCurPage();
          },
          changeHeadPicSize(){
            if(this.headPicSize === 0){
              this.headPicMove = false;
            }
            let headPicSize = this.$refs.headPicSize;
            headPicSize.style.height = (this.headPicSize + 308)+'px';
            headPicSize.style.width = (this.headPicSize + 308)+'px';
            //如果移动了图片则才用如下方式
            if(this.headPicMove){
              headPicSize.style.left = (this.headPicEndPos.left +
                                      ((this.endHeadPicSize-this.headPicSize)
                                        * this.headPicEndPos.leftUnit))+'px';
              headPicSize.style.top = (this.headPicEndPos.top +
                                      ((this.endHeadPicSize-this.headPicSize)
                                        * this.headPicEndPos.topUnit))+'px';
            }else{
              headPicSize.style.left ="-"+(this.headPicSize/2)+'px';
              headPicSize.style.top = "-"+(this.headPicSize/2)+'px';
            }
          },
          //滑块移动结束时
          changeHeadPicSizeEnd(){
            this.endHeadPicSize = this.headPicSize;
            //移动滑动条时，重新获取位置
            let headPicSize = this.$refs.headPicSize;
            this.headPicEndPos.left = parseInt(headPicSize.style.left);
            this.headPicEndPos.top = parseInt(headPicSize.style.top);
          },
          //图片开始移动
          moveHeadPicStart(e){
            this.isMoveDown = true;
            let headPicSize = this.$refs.headPicSize;
            let left = parseInt(headPicSize.style.left);
            let up = parseInt(headPicSize.style.top);
            //初始的位置
            this.headPicInitPos.left = left;
            this.headPicInitPos.top = up;
            this.headPicInitPos.right = this.headPicSize*(-1) - left;
            this.headPicInitPos.down = this.headPicSize*(-1) -  up;
            this.headPicInitPos.initX = e.offsetX;
            this.headPicInitPos.initY = e.offsetY;
          },
          //移动图片过程中
          moveHeadPictures(event){
            if(this.isMoveDown) {
              let headPicSize = this.$refs.headPicSize;
              if ((event.offsetX - this.headPicInitPos.initX >= 0
                && event.offsetX - this.headPicInitPos.initX <= Math.abs(this.headPicInitPos.left))
                || (event.offsetX - this.headPicInitPos.initX < 0
                  && event.offsetX - this.headPicInitPos.initX >= this.headPicInitPos.right)) {
                headPicSize.style.left = (this.headPicInitPos.left + event.offsetX - this.headPicInitPos.initX) + 'px';
              }
              //上下移动
              if((event.offsetY-this.headPicInitPos.initY >= 0
                      && event.offsetY-this.headPicInitPos.initY <= Math.abs(this.headPicInitPos.top))
                || (event.offsetY-this.headPicInitPos.initY < 0
                      && event.offsetY-this.headPicInitPos.initY >= this.headPicInitPos.down)) {
                headPicSize.style.top = (this.headPicInitPos.top + event.offsetY - this.headPicInitPos.initY) + 'px';
              }
              this.headPicMove = true;
          }
          },
          //图片移动结束
          moveHeadPicEnd(){
            let headPicSize = this.$refs.headPicSize;
            this.headPicEndPos.left = parseInt(headPicSize.style.left);
            this.headPicEndPos.top = parseInt(headPicSize.style.top);
            this.headPicEndPos.leftUnit = Math.abs(parseInt(headPicSize.style.left))/this.headPicSize;
            this.headPicEndPos.topUnit = Math.abs(parseInt(headPicSize.style.top))/this.headPicSize;
            this.isMoveDown = false;
          },
          //旋转图片
          rotateHeadPicture(flag){
            let headPicSize = this.$refs.headPicSize;
            //先获取当前旋转角
            let rotate = headPicSize.style.transform;
            rotate = rotate.substring(rotate.indexOf("(")+1,rotate.indexOf("d"));
            //求余，避免角度过大
            rotate = (parseInt(rotate)+(90*(flag==='L'?(-1):1)))%360;
            rotate = "rotate(" + rotate + "deg)";
            headPicSize.style.transform = rotate;
          },
          //更换头像图片
          changeHeadPicIns(id){
            let curPic = document.getElementById(id);
            let headPicSize = this.$refs.headPicSize;
            headPicSize.style.backgroundImage = curPic.style.backgroundImage;
            //在更大区域展示的时候，点击图片回到小区域
            if(this.clickTimer === 2){
              this.showHeadPicInSquare();
            }
          },
          //展示历史头像
          showHeadPicHistory(flag){
            let newVal = this.showSevenPos + (flag==='R'?1:(-1))*6;
            //当没有超出下标时，重新赋值
            if(newVal >= 0 && newVal < this.headPicHisList.length){
              this.showSevenPos = newVal;
            }
            this.showSevenHeadPic = this.headPicHisList.slice(this.showSevenPos, this.showSevenPos + 6);
          },
          //在更大的区域展示图片
          showHeadPicInSquare(){
            let headPicIns = this.$refs.headPicIns;
            let headPicMain = this.$refs.headPicMain;
            let picMoreBtn = this.$refs.picMoreBtn;
            let picMoreBtnArrow = this.$refs.picMoreBtnArrow;
            if(this.clickTimer === 1) {
              headPicIns.style.width = "400px";
              headPicMain.style.width = "0px";
              picMoreBtn.style.width = "400px";
              picMoreBtnArrow.style.transform = "rotate(180deg)";
              this.clickTimer = 2;
            }else {
              headPicIns.style.width = "80px";
              headPicMain.style.width = "320px";
              picMoreBtn.style.width = "80px";
              picMoreBtnArrow.style.transform = "rotate(0deg)";
              this.clickTimer = 1;
            }
          },
          //点赞该用户
          praiseCurUser(e,preIndex,index){
            this.praiseFloatTop = (e.clientY-e.offsetY-115) + 'px';
            let colorList = ['#66CCFF','red','green','yellow','teal'];
            let color = colorList[Math.floor(Math.random()*colorList.length)];
            this.praiseFloatNums.push({date:new Date().getTime(),color:color});
            //设置图标的颜色
            let curPraise = document.getElementById('PI' + preIndex + index);
            if(curPraise.getAttribute("fill") === "none") {
              curPraise.setAttribute("fill", "blue");
            }
            //构造点赞用户信息
            let curUser = this.praiseYouList[preIndex].userlist[index];
            let userIns = {
              date: new Moment().format('YYYY-MM-DD'),
              userId:curUser.userId,
              userPic: curUser.userPic,
              userName: curUser.userName,
              userSign: curUser.userSign,
              nums:1
            };
            //加入youPraiseList数组,先获取今日数组
            let today = this.youPraiseList[this.youPraiseList.length - 1];
            let newIns = false;
            if(today != null){
              if(today.date === "今天"){
                newIns = true;
                //判断该用户是否已经加入今天数组
                let have = false;
                let i;
                for(i = 0;i < today.userlist.length;i++){
                  if(today.userlist[i].userId === curUser.userId){
                    have = true;
                    break;
                  }
                }
                //如果存在，则只增加点赞次数
                if(have){
                  // today.userlist[i].nums++;
                  //排序数组，把最新点赞的放到数组的第一位
                  let user = today.userlist[i];
                  user.nums++;
                  today.userlist.splice(i,1);
                  today.userlist.unshift(user);
                }else{
                  //从头添加
                  today.userlist.unshift(userIns);
                }
              }
            }
            if(!newIns){
              //今天没有点赞的话，则新加入
              this.youPraiseList.push({date:"今天",userlist:[userIns]});
            }
          },
          //动画
          praiseEnter(e){
            let random = Math.random() - 0.5;
            let x = 40 * random/Math.abs(random) * Math.random() + 'px';
            let praiseFloatNums = this.praiseFloatNums;
            //queue:是否加入动画队列，加入动画队列，那么动画按顺序执行，否则强制执行
            velocity(e,{translateY:'-120px',opacity:0},{duration:1000,queue:false});
            velocity(e,{translateX:x},{duration:1000});
            velocity(e,{complete:()=>{
                praiseFloatNums.splice(0,1);
              }});
          },
          floatMsgEnter(e,done){
            velocity(e,{opacity: 1},{duration:500,complete:done});
          },
          floatMsgLeave(e,done){
            //加了参数done,这个动画才会生效，也许done是动画的连接参数
            velocity(e,{opacity: 0},{duration:500,complete:done});
          },
          //保存图片
          savePicWhitNewSize(){
             //这里采用位置参数的方式
            let headPicSize = this.$refs.headPicSize;
            this.headPicEndSize.left = (parseInt(headPicSize.style.left)/308)*60 + 'px';
            this.headPicEndSize.top = (parseInt(headPicSize.style.top)/308)*60 + 'px';
            this.headPicEndSize.size = (parseInt(headPicSize.style.width)/308)*100 + '%';
            this.headPicEndSize.rotate = headPicSize.style.transform;
            this.headPicEndSize.image = headPicSize.style.backgroundImage;
            let have = false;
            //加入历史头像,先判断是否存在
            for(let i=0;i<this.headPicHisList.length;i++){
              if(this.headPicHisList[i] === this.headPicEndSize.image){
                have = true;
                break;
              }
            }
            if(!have) {
              this.headPicHisList.push(this.headPicEndSize.image);
              //刷新当前长度
              this.headPicHisListLength = this.headPicHisList.length;
            }
            //刷新当前显示的头像
            this.showSevenHeadPic = this.headPicHisList.slice(this.showSevenPos,this.showSevenPos+6);
          },
        },
    }
</script>

<style scoped>
#left-border{
  /*position: absolute;*/
  float: left;
  width: 10px;
}
/deep/ .el-form{
  /*inline-block水平垂直默认都会留间隙，下面设置可去除间隙*/
  font-size: 0;
  /*padding-top: 1%;*/
  padding-left: 16px;
  /*padding-bottom: 4%;*/
  height: 100%;
  width: 400px;
  box-sizing: border-box;
  /*padding-top: 6px;*/
  overflow: auto;
}
 .el-form::-webkit-scrollbar{
  width: 5px;
  height: 0px;
}
 .el-form::-webkit-scrollbar-thumb{
  border-radius   : 10px;
  background-color: black;
}
.el-form::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
}
/*.theme-btn-save{*/
/*  height: 22px;*/
/*  width: 45%;*/
/*}*/
/*.theme-btn-cancel{*/
/*  height: 22px;*/
/*  width: 45%;*/
/*}*/
.base-item{
  width: 172px;
  margin-right: 12px;
  margin-bottom: 0px;
}
.more-item{
  width: 368px;
  overflow: hidden;
  margin-right: 11px;
  margin-bottom: 0px;
}
/deep/ .base-item .el-form-item__label{
  width: 44px;
  padding-right: 10px;
  white-space: nowrap;
}
/deep/ .more-item .el-form-item__label{
  width: 44px;
  white-space: nowrap;
  padding-right: 10px;
}
/deep/ .base-item .el-form-item__content{
  width: 127px;
}
/deep/ .more-item .el-form-item__content{
  width: 308px;
}
/deep/ .search-input .el-input__inner{
  border:none;
  border-radius: 0px;
}
/deep/ .user-new-name .el-input__inner{
  border:none;
  font-size: 30px;
  /*background:background-image background-position background-repeat的集合，
  0 0表示位置从0 0开始，该代码表现为设置背景图片透明*/
  background: 0 0;
  padding: 0px;
  height: 36px;
}
/deep/ .user-new-sign .el-input__inner{
  border:none;
  font-size: 15px;
  background: 0 0;
  padding: 0px;
  height: 20px;
}
.group-new-name{
  border:none;
  font-size: 15px;
  /*background:background-image background-position background-repeat的集合，
  0 0表示位置从0 0开始，该代码表现为设置背景图片透明*/
  background: 0 0;
  padding: 0px;
  float: left;
  height: 25px;
  color: black;
}
.group-new-sign{
  border:none;
  /*font-size: 15px;*/
  background: 0 0;
  padding: 0px;
  height: 15px;
  color: black;
}
/deep/ .el-tabs{
  height: 100%;
  width: 100%;
}
/deep/ .el-tabs__nav{
  width: 100%;
}
/deep/ .el-tabs__item{
  width: 200.5px;
  padding-left: 70px;
}
/deep/ #tab-1{
  width: 200.5px;
  padding-left: 70px;
}
/deep/ .el-tabs__content{
  height: 100%;
  padding: 0px;
}
/deep/ .el-tabs__header{
}
/deep/ .theme-btn .el-button{
  display: block;
  float: left;
  margin: 0% 2%;
  padding: 0% 8%;
  width: 45%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  border: none;
}
/deep/ .head-pic-btn .el-button{
  display: block;
  float: left;
  margin: 0% 2%;
  padding: 0% 8%;
  width: 45%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  border: none;
}
#head{
  width: 300px;
  height: 70px;
  /*z-index: 2;*/
  box-sizing: border-box;
  padding: 5px 12px;
  background-color: saddlebrown;
}
#group{
  width: 300px;
  height: 437px;
  background-color: blueviolet;
}
#foot{
  width: 300px;
  height: 29px;
  /*z-index: 2;*/
  background-color: teal;
}
.back{
  width: 40px;
  height: 20px;
  background-color: white;
  margin-left: 320px;
  margin-top: -24px;
}
.close{
  width: 40px;
  height: 20px;
  background-color: black;
  margin-left:360px;
  margin-top: -20px;
}
#user-head-pic{
  /*position: absolute;*/
  width: 60px;
  height: 60px;
  border-radius: 50%;
  float: left;
  overflow: hidden;
}
.user-head-pic-size{
  position: relative;
  background-size: cover;
}
#user-name{
  /*position: absolute;*/
  width: 200px;
  height: 30px;
  float: left;
  margin: 3px 8px;
  line-height: 30px;
  background-color: hotpink;
}
#user-sign{
  /*position: absolute;*/
  width: 200px;
  height: 20px;
  line-height: 20px;
  margin-left: 8px;
  float: left;
  background-color: yellow;
  }
#search{
  height: 6.5%;
}
#group-list{
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 2%;
  height: 93.5%;
  box-sizing: border-box;
  /*文字不可选中*/
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.group-pic{
  float: left;
  width: 45px;
  height: 45px;
  background-size: 100%;
  transition: all 0.1s linear 0s;
  border-radius: 50%;
  margin-left: 10px;
  /*background-image: url("../../assets/image/528865114564200.jpg");*/
}
.group-name{
  width: 240px;
  margin-left: 5px;
  margin-top: 3px;
  height: 25px;
  font-size: 15px;
  float: left;
}
.group-sign{
  width: 240px;
  margin-left: 5px;
  height: 15px;
  float: left;
  font-size: 10px;
}
.group-head{
  height: 55px;
  padding: 5px 0px;
  box-sizing: border-box;
}
.group-chat{
  width: 25px;
  height: 25px;
  float: left;
  margin-top: -40px;
  margin-left: 275px;
  background-image: url("/static/img/chat.png");
  background-size: 100%;
  opacity: 0;
  transition: all .2s linear 0s;
}
.group-arrow-after{
  transform: rotate(90deg);
}
.cur-group-list{
  height: auto;
}
.cur-group-set{
  height: auto;
}
.member-list:hover{
  background-color: gray;
}
.member-list{
  height: 50px;
  padding-left: 20px;
  padding-top: 2.5px;
  box-sizing: border-box;
}
.member-head{
  height: 45px;
  width: 16.2%;
  border-radius: 50%;
  float: left;
  margin-right: 3%;
  background-color: peru;
}
.member-name{
  height: 20px;
  float: left;
  margin-top: 1%;
  width: 70%;
}
.member-sign{
  overflow: hidden;
  height: 20px;
  float: left;
  width: 70%;
}
.group-display{
  overflow: hidden;
  width: 300px;
  height: 55px;
  box-sizing: border-box;
}
.group-display:hover{
  background-color: steelblue;
}
.group-echarts{
  height: 100px;
  width: 100px;
  float: left;
  padding: 0px 10px;
  box-sizing: border-box;
}
.group-set-item{
  width: 300px;
  height: auto;
  background-color: white;
  opacity: 0.5;
}
.group-set-head{
  width: 300px;
  height: 30px;
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
}
.group-set-message{
  height: 30px;
  float: left;
  display: block;
  font-size: 10px;
  line-height: 30px;
  text-align: right;
}
.group-set-head:hover{
  background-color: gray;
}
.group-set-context{
  width: 300px;
  height: auto  ;
  padding: 5px 15px 5px 20px;
  box-sizing: border-box;
}
.user-results{
  width: 251px;
  height: 30px;
  float: left;
  line-height: 30px;
  font-size: 10px;
}
.user-result-btn{
  width:14px;
  height: 14px;
  float: left;
  border-radius: 50%;
  background-image: url("/static/img/加号.png");
  margin-top: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.user-result-btn:hover{
  background-color: gray;
}
.group-head-pic-upload{
  height: 45px;
  width: 45px;
  float: left;
  border-radius: 50%;
  margin-right: 9px;
  margin-bottom: 5px;
  background-image: url("/static/img/加号.png");
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}
.group-head-pic-upload:hover{
  background-color: gray;
}
.group-head-pic-list{
  height: 45px;
  width: 45px;
  float: left;
  border-radius: 50%;
  margin-right: 9px;
  margin-bottom: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
}
.group-head-pic-list:hover{
  border: 1px solid black;
}
.group-back-pic-upload{
  height: 45px;
  width: 45px;
  float: left;
  margin-right: 7px;
  margin-bottom: 5px;
  background-image: url("/static/img/加号.png");
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}
.group-back-pic-upload:hover{
  background-color: gray;
}
.group-back-pic-list{
  height: 45px;
  width: 45px;
  float: left;
  margin-right: 7px;
  margin-bottom: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
}
.group-back-pic-list:hover{
  border: 1px solid black;
}
.group-set-name{
  height: 30px;
  font-size: 10px;
  line-height: 30px;
  float: left;
}
/*浮动脱离文档流的元素，不会影响父元素的行高*/
.group-set-arrow{
  height: 20px;
  width: 20px;
  float: right;
  margin-top: 5px;
  background-image: url("/static/img/箭头.png");
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}
.echarts-ins{
  height: 80px;
  width: 80px;
}
.echarts-title{
  height: 20px;
  width: 80px;
  text-align: center;
  font-size: 10px;
}
.more-selection{
  position: absolute;
  /*left: 0px;*/
  top: 0px;
  float: right;
  height: 40px;
  width: 40px;
  background-size: 65%;
  background-repeat: no-repeat;
  background-image: url("../../assets/icon/view_agenda_64px_1182340_easyicon.net.png");
  background-position: center;
  box-sizing: border-box;
}
.more-selection:hover{
  background-color: gray;
}
.context-pre{
  float: right;
  height: 560px;
  width: 300px;
  overflow: hidden;
  transition: all .2s linear 0s;
}
.context-after{
  width: 400px;
}
.user-opation-pre{
  height: 100%;
  width: 0%;
  background-color: steelblue;
  float: left;
  transition: all .2s linear 0s;
}
.user-opation-after{
  width: 100%;
}
.user-message-pre{
  height: 100%;
  width: 100%;
  transition: all .2s linear 0s;
  float: right;
  overflow: hidden;
}
.user-message-after{
  width: 0%;
}
.title-msg{
  height: 8%;
  box-sizing: border-box;
  padding: 2%;
}
.userpage-set{
  height: 92%;
}
.opapic{
  width: 24px;
  height: 24px;
  float: left;
  margin-top: -4px;
}

/*行内嵌入后属性不会改变*/
.chang-user-opapic{
  width: 400px;
  font-size: 10px;
  height: 24px;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
}
.user-opapic-head{
  margin-top: 4px;
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0.7;
}
.user-opapic-head:hover{
  opacity: 1;
}
.user-opa-head{
  height: 70px;
  width: 328px;
  float: left;
  background-color: #ef907a;
}
.extra-div{
  height: 242px;
  transition: all .2s linear 0s;
}
/*宽度设置为百分比的主要目的是方父元素在缩放的时候，
盒子的位置会被挤压*/
/*高度就没有这个顾虑*/
.user-opa-headpic{
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 5px 7px 5px 13px;
  float: left;
  overflow: hidden;
}
.user-opa-headpic-size{
  position: relative;
  background-size: cover;
}
.user-opa-name{
  height: 36px;
  background-color: #733544;
  width: 230px;
  margin-top: 6px;
  margin-bottom: 2px;
  float: left;
}
.user-opa-sign{
  height: 20px;
  background-color: #733544;
  width: 230px;
  float: left;
}
.user-opa-praise{
  height: 70px;
  /*background-color: white;*/
  opacity: 0.6;
  overflow: hidden;
  width: 72px;
  padding-left: 22px;
  padding-top: 14px;
  box-sizing: border-box;
}
.user-opa-praise:hover{
  opacity: 1;
}
.praise-pic{
  margin-left: 10%;
}
.user-label-list{
  width: 100%;
  height: 107px;
  background-color: rgb(255,255,255);
  margin-top: 13px;
  margin-bottom: 7px;
  border: 1px solid rgb(220,223,230);
  border-radius: 4px;
  overflow: auto;
}
.user-label-ins{
  height: 20px;
  width: 31%;
  line-height: 20px;
  margin: 3px 1% 2px 1%;
  float: left;
  box-sizing: border-box;
  padding: 0px 2%;
  background-color: #66CCFF;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 4px;
}
/*定义关键帧*/
@keyframes shake {
  0% {
    transform: translate(0.5px, 0.5px);
  }

  25% {
    transform: translate(-0.5px, -0.5px);
  }

  50% {
    transform: translate(0px, 0px);
  }

  75% {
    transform: translate(0.5px, -0.5px);
  }

  100% {
    transform: translate(-0.5px, 0.5px);
  }
}
.user-label-ins:hover{
  /*infinite:循环*/
  -webkit-animation: shake 0.4s infinite;
  animation: shake 0.4s infinite;
}
#newLabel{
  display: none;
}
.user-new-label{
  width: 31%;
  height: 20px;
  line-height: 20px;
  margin: 3px 1% 2px 1%;
  float: left;
}
/deep/ .user-new-label .el-input__inner{
  border: none;
  height: 100%;
  border-radius: 0px;
  padding: 0px;
}
.label-remove{
  position: relative;
  display: none;
  left: 80px;
  top: -20px;
  height: 8px;
  width: 10%;
  background-image: url("../../assets/icon/close_24px_1249111_easyicon.net.png");
  background-size: cover;
  background-color: grey;
  opacity: 0.7;
}
.label-remove:hover{
  opacity: 1;
}
.user-opa-back{
  height: 60%;
  width: 100%;
  background-color: gray;
  transition: all .2s linear 0s;
  overflow: hidden;
}
.user-msg{
  height: 40%;
  width: 100%;
  transition: all .2s linear 0s;
  overflow: hidden;
}
.change-theme{
  display: none;
  width: 100%;
  height: 0%;
  /*overflow: auto;*/
  box-sizing: border-box;
  transition: all .2s linear 0s;
  overflow: hidden;
}
.change-headpic{
  display: none;
  width: 100%;
  height: 0%;
  transition: all .2s linear 0s;
  overflow: hidden;
}
.show-praise{
  display: none;
  width: 100%;
  height: 0%;
  transition: all .2s linear 0s;
  overflow: hidden;
}
.theme-pic-ins{
  height: 22.9%;
  width: 92px;
  float: left;
  margin: 0px 2px 7px 5px;
  border: 1px solid black;
  box-sizing: border-box;
  background-size: cover;
}
.theme-pic-ins:hover{
  border: 2px solid black;
}
.theme-btn{
  position: relative;
  height: 8%;
  width: 400px;
  top:0%;
  background-color: black;
  opacity: .5;
  /*里面的按钮为inline-block,加上这个去除间隙*/
  /*font-size: 2%;*/
  transition: all .2s linear 0s;
  padding: 7px 2% 7px 240px;
  box-sizing: border-box;
}
.head-pic-main{
  /*background-color: white;*/
  /*opacity: 0.2;*/
  float: left;
  height: 100%;
  width: 320px;
  box-sizing: border-box;
  /*padding: 6px;*/
  overflow: hidden;
  transition: all .2s linear 0s;
}
.head-pic-size{
  position: relative;
  height: 308px;
  width: 100%;
  background-image: url("../../assets/image/5824113092454100.jpg");
  background-size: 100%;
}
.head-pic-size-opa{
  position: relative;
  top: -308px;
  height: 12%;
  width: 308px;
  background-color: black;
  margin-left: 6px;
}
.head-pic-ins{
  background-color: white;
  float: left;
  height: 92%;
  width: 80px;
  box-sizing: border-box;
  overflow: auto;
  transition: all .2s linear 0s;
  white-space: nowrap;
  padding-left: 6px;
}
.head-pic-more-btn{
  width: 80px;
  height: 8%;
  float: left;
  background-color: white;
  transition: all .2s linear 0s;
}
.head-pic-more-arrow{
  height: 100%;
  width: 80px;
  background-position: center;
  background-size: 30%;
  background-repeat: no-repeat;
  background-image: url('/static/icon/左箭头.png');
  transition: all .2s linear .2s;
  margin: 0 auto;
}
.head-pic-more-btn:hover{
  background-color: rgb(220,223,230);
  opacity: 0.8;
}
.head-pic-ins-uploan{
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: white;
  opacity: 0.5;
  margin: 0px 1px 4.5px 3px;
  /*margin-bottom: 4.5px;*/
  /*margin-left: 12%;*/
  float: left;
  background-image: url("/static/img/加号.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  border: 1px solid rgb(220,223,230);
  box-sizing: border-box;
}
.head-pic-ins-uploan:hover{
  opacity: 0.8;
}
.head-pic-ins-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  float: left;
  margin: 0px 1px 4.5px 3px;
  /*margin-bottom: 4.5px;*/
  /*margin-left: 9.3px;*/
  background-size: cover;
  border: 1px solid rgb(220,223,230);
  box-sizing: border-box;
}

.head-pic-history{
  background-color: white;
  float: left;
  height: 18%;
  width: 400px;
  box-sizing: border-box;
}
.head-pic-history-ins{
  display: inline-block;
  width: 60px;
  height: 60px;
  background-size: cover;
  margin-right: 4px;
  border: 1px solid rgb(220,223,230);
  box-sizing: border-box;
}
.head-pic-history-btn{
  /*display: inline-block;*/
  height: 60px;
  width: 9px;
  float: left;
  /*background-color: black;*/
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.head-pic-history-btn:hover{
  background-color: rgb(220,223,230);
  opacity: 0.8;
}
.head-pic-btn{
  background-color: white;
  float: left;
  height: 6%;
  width: 400px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 240px;
  box-sizing: border-box;
}
.praise-head{
  width: 400px;
  height: 20%;
  /*background-color: white;*/
  /*opacity: 0.2;*/
}
.praise-today{
  width: 50%;
  height: 100%;
  background-color: white;
  opacity: 0.6;
  float: left;
  box-sizing: border-box;
}
.praise-all{
  width: 50%;
  height: 100%;
  float: left;
  background-color: white;
  opacity: 0.8;
}
.praise-context{
  width: 400px;
  height: 80%;
  background-color: white;
  opacity: 0.4;
}
.praise-user-ins{
  height: 60px;
  width: 100%;
}
.praise-user-ins-pic{
  height: 50px;
  width: 50px;
  float: left;
  border-radius: 50%;
  background-color: black;
  background-size: cover;
  margin: 5px 10px;
}
.praise-user-ins-name{
  height: 25px;
  width: 200px;
  float: left;
  margin-top: 7px;
  font-size: 20px;
}
.praise-user-ins-sign{
  height: 15px;
  width: 200px;
  float: left;
}
.praise-user-ins-icon{
  height: 20px;
  width: 130px;
  float: left;
  margin-top: -15px;
}
.praise-icon-float{
  position: absolute;
  left: 381px;
  width: 20px;
  height: 20px;
}
</style>
