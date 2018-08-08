<!-- 
- Author:CaoJing
- Date:2018/8/7
- github:https://github.com/Mirror198829
-->
<template>
<div class="resRoomWrap">
  <h1 class="resRoomTitle">会议室预订-npm版本</h1>
  <div id="roomReserveMain">  
    <div class="conditionBox">
       <li class="conditionItem">
         <h3 class="conditionTitle">区域选择：</h3>
         <ul class="regionLst">
           <li class="region" v-for="(item,key) in regionLst" :class="{'active':item.status}" @click="selectRegionCondition(key)">{{item.name}}</li>
         </ul>
       </li>
       <li class="conditionItem">
         <h3 class="conditionTitle">会议设施：</h3>
         <ul class="facility">
             <el-checkbox-group v-model="facilityList" @change="getRoomLst();getPagination()">
              <el-checkbox label="视频"></el-checkbox>
              <el-checkbox label="投影"></el-checkbox>
              <el-checkbox label="白板"></el-checkbox>
              <el-checkbox label="麦克"></el-checkbox>
              <el-checkbox label="电视"></el-checkbox>
            </el-checkbox-group>
         </ul>
       </li>
    </div>
    <div id="resRoomPluginBox">
      <div class="resHead">
        <h2 class="resHeadRegionName">【南京】 会议室（ {{regionName}} ）</h2>
        <div class="identifyLst">
          <li class="identify" v-for="(item,key) in identifyLst">
            <i :class="{'nooccupy':key ==1,'select':key == 2}"></i><span>{{item}}</span>
          </li>
        </div>
      </div>
      <div id="roomRerservation">
        <div class="roomTop">
          <div class="roomTopSide">
            <span class="titleTime">时间</span>
            <span class="titleName">名称</span>
          </div>
          <div class="roomTopTime">
            <ul class="roomDate">
              <li class="dateItem" v-for="(date,key) in dateLst" :class="{'active':date.active}" @click="changeDate(key)"><span>{{date.week}}<br/>{{date.date}}</span></li>
            </ul>
            <div class="arrowHourWrap">
              <i class="arrow arrowLeft fa fa-caret-left" :class="{'disabled': moveStep == 1}"  @click = "moveHour(true)"></i>
              <div class="roomTopHour">
                <ul class="hourNavLst" :class="{'stepOne':moveStep == 1,'stepTwo':moveStep == 2,'stepThree':moveStep == 3,'stepFour':moveStep == 4}">
                  <li class="hourNavItem" v-for="(item,index) in 24">{{index}}:00</li>
                </ul>
              </div>
              <i class="arrow arrowRight  fa fa-caret-right" :class="{'disabled': moveStep == 4}" @click = "moveHour(false)"></i>
            </div>
          </div>
        </div>
        <div class="roomMain">
          <ul class="roomLst">
            <li class="roomItem"  v-for="(item,key) in roomLst">
              <h3 class="roomName" :title="item.name">{{item.name}}</h3>
              <div class="roomGridWrap">
                <ul class="roomGridLst"  
                :class="{'stepOne':moveStep == 1,'stepTwo':moveStep == 2,'stepThree':moveStep == 3,'stepFour':moveStep == 4}"
                >
                  <div v-if="markLine.isShow" class="markLeftLine" :style="{'left':markLine.leftLine+'px'}"></div>
                  <div v-if="markLine.isShow" class="markRightLine" :style="{'left':markLine.rightLine+'px'}"></div>
                  <li class="roomGrid" 
                      v-for="(grid,index) in item.gridLst" 
                      :class="{'isOccupy':grid.status == 1,'isSelect':grid.status == 2}"
                      @mousedown="mouseDownGrid(key,index,$event)"
                      @mouseup = 'mouseUpGrid(key,index,$event)'
                      @mouseover = 'mouseOverGrid(key,index)'
                  ></li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="noneBox"></div>
        </div>
      </div>
      <div id="roomResPag">
        <el-pagination
          @current-change="getRoomLst()"
          :current-page="pagination.currentPage"
          layout="total,  prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
    <div id="resRoomInfo">
      <h1>会议室预订信息：</h1>
      <ul>
        <li class="resRoomInfoItem">
          <span class="resRoomInfoItemTitle">会议室区域：</span>
          {{resRoomInfo.region}}
        </li>
        <li class="resRoomInfoItem">
          <span class="resRoomInfoItemTitle">会议室名称：</span>
          {{resRoomInfo.roomName}}
        </li>
        <li class="resRoomInfoItem">
          <span class="resRoomInfoItemTitle">预 订 时 间：</span>
          {{resRoomInfo.date}}
          <span v-if="resRoomInfo.week">（</span>
          {{resRoomInfo.week}}
          <span v-if="resRoomInfo.week">）</span> 
          {{resRoomInfo.startTime}}
          <span v-if="resRoomInfo.startTime">——</span>
          {{resRoomInfo.endTime}}
        </li>
        <li class="resRoomInfoItem">
          <span class="resRoomInfoItemTitle">预订人姓名：</span>
          {{resRoomInfo.user}}
        </li>
      </ul>
    </div>
    <div id="resBtnWrap">
      <el-button type="primary">确定预订</el-button>
    </div>
  </div>
</div>
</template>

<script>
import getRoomLst from '../mock/room.js'
import getUserName from '../mock/getUserName.js'
import getPagination from '../mock/pagination.js'
import moment from 'moment'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
export default {
  name: 'roomResPlug',
  data () {
    return {
      facilityList:[],//设施列表
      regionLst:[{name:'全部',status:true},{name:'集团总部楼会议中心',status:false},{name:'易购楼会议中心',status:false},{name:'研发二区会议中心',status:false},{name:'集团总部楼',status:false},{name:'易购楼',status:false},{name:'研发二区-B1栋',status:false},{name:'研发二区-B2栋',status:false},{name:'研发二区-C1栋',status:false},{name:'研发二区-C2栋',status:false},{name:'雨花基地',status:false},{name:'金融城',status:false},{name:'高尔夫俱乐部',status:false}],//区域列表
      regionName:null,
      dateLst:[],
      roomLst:[],
      identifyLst:['被占用','空闲','选择中'],
      isMoving:false,   //滑动状态
      triggerIndex:null, //点击的行数
      moveStep:3,
      initGrid:{
        startIndex:null,
        endIndex:null
      },
      markLine:{
        isShow:false,
        leftLine:0,
        rightLine:0
      },
      resRoomInfo:{
        region:null,
        date:null,
        week:null,
        startTime:null,
        endTime:null,
        roomName:null,
        user:null
      },
      userName:null,
      pagination:{
        total:0,
        currentPage:0
      }
    }
  },
  methods:{
    //根据地域删选会议室信息
    selectRegionCondition(key){
      this.regionLst.forEach((item,key) => {
        item.status = false
      })
      this.regionLst[key].status = true
      this.getRoomLst()
      this.getRegionName()
      this.moveStep = 3
      this.getPagination()
    },
    //根据地域的激活状态获插件的地域名称
    getRegionName(){
      this.regionLst.forEach((item,key) => {
        if(item.status) this.regionName = item.name
      })
    },
    mouseOverGrid(key,index){ 
      let isMoving = this.isMoving     
      if(!isMoving) return false
      let triggerIndex = this.triggerIndex
      let curGrid = this.roomLst[triggerIndex]     //使得其他行的移动也可触发mouseDown行的状态变化
      let initStartIndex = this.initGrid.startIndex   //第一次点击的grid信息
      let initEndIndex =  this.initGrid.endIndex
      let gridStatus = curGrid.gridLst[index].status
      let curStartIndex = curGrid.startSelectIndex 
      let curEndIndex = curGrid.endSelectIndex 
      if(gridStatus == 1){
        curGrid.startSelectIndex = null
        curGrid.endSelectIndex = null
        curGrid.gridLst.forEach((grid,index) => {
          if(grid.status == 2) grid.status = 0
        })
        this.$message({
          message: '选择时间段中有被占用，请重新选择！',
          type: 'warning'
        })
        this.hideMarkLine()
        this.initResRoom()
        this.initState() 
        return false
      }else{
        if(index <= initStartIndex) {
          curStartIndex = index
          curEndIndex = initEndIndex
        }else if(index >= initEndIndex){
          curEndIndex = index
          curStartIndex = initStartIndex
        }
      }
      //清除所有状态
      this.roomLst[triggerIndex].gridLst.forEach((grid,index)=>{
        if(grid.status == 2) grid.status = 0
      })
      this.roomLst[triggerIndex].startSelectIndex = curStartIndex
      this.roomLst[triggerIndex].endSelectIndex = curEndIndex

      for(let i = curStartIndex; i <= curEndIndex; i++){
        this.roomLst[triggerIndex].gridLst[i].status = 2
      }
      this.getMarkLinePostion(curStartIndex,curEndIndex) //获取markLine的信息 
    },
    mouseDownGrid(key,index,event){
      this.triggerIndex = key //保存当前触发行
      if(event.button != 0) return false 
      let curGrid = this.roomLst[key]      
      let startSelectIndex = curGrid.startSelectIndex
      let endSelectIndex =  curGrid.endSelectIndex
      let gridStatus = curGrid.gridLst[index].status  
      this.removeOtherLineCss(key) //清除所有选中样式
      this.isMoving = true //启动滑动状态      
      if(gridStatus == 1){
        this.hideMarkLine()  //隐藏markLine
        this.$message({
          message: '时间已占用，请重新选择！',
          type: 'warning'
        })
        this.initResRoom()
        this.initState()
        return false //如果是占用状态，不可点击
      }else if(gridStatus == 2){   //如果是已选择状态
        if(index ==  startSelectIndex && index == endSelectIndex){   //一行已选择的只有一个格子
          startSelectIndex = null
          endSelectIndex = null
          this.roomLst[key].gridLst[index].status = 0
          this.hideMarkLine()  //隐藏markLine
        }else if( index == startSelectIndex){
          this.isMoving = false
          startSelectIndex = index + 1  
          this.roomLst[key].gridLst[index].status = 0
        }else if(index == endSelectIndex){
          this.isMoving = false
          endSelectIndex = index - 1
          this.roomLst[key].gridLst[index].status = 0
        }
      }else{ 
          if(startSelectIndex == null){
            startSelectIndex = index
            endSelectIndex = index                        
          }else if(index <= startSelectIndex){
            startSelectIndex = index
          }else if(index >= endSelectIndex){
            endSelectIndex = index
          }
      }
      this.roomLst[key].startSelectIndex = startSelectIndex
      this.roomLst[key].endSelectIndex = endSelectIndex
      this.initGrid.startIndex = startSelectIndex //用于全局保存当前grid的index信息
      this.initGrid.endIndex = endSelectIndex
      if(startSelectIndex!=null){
        for(let i = startSelectIndex; i <= endSelectIndex; i++){
          if(this.roomLst[key].gridLst[i].status == 1){
            this.roomLst[key].startSelectIndex = null
            this.roomLst[key].endSelectIndex = null
            curGrid.gridLst.forEach((grid,index) => {
              if(grid.status == 2) grid.status = 0
            })
            this.$message({
              message: '选择时间段中有被占用，请重新选择！',
              type: 'warning'
            })
            this.hideMarkLine()
            this.initResRoom()
            this.initState()
            break;  
           }                   
          this.roomLst[key].gridLst[i].status = 2
          this.getMarkLinePostion(startSelectIndex,endSelectIndex) //获取markLine的信息
        } 
      } 
    },
    mouseUpGrid(key,index,event){
      if(event.button != 0) return false      
      this.getResRoomInfo()//获取会议室预订信息
      this.initState() //初始化所有信息
     // this.triggerIndex = null //恢复初始值,屏蔽，当快速划过时会有小概率出现this.triggerIndex = null，导致this.roomLst[triggerIndex]无法获取正确的值
    },
    //获取会议室预订信息
    getResRoomInfo(){
      let triggerIndex = this.triggerIndex
      if(triggerIndex == null) {
        alert(1233243)
        return false
      }
      let triggerRoom = this.roomLst[triggerIndex]
      let startSelectIndex = triggerRoom.startSelectIndex
      let endSelectIndex = triggerRoom.endSelectIndex
      let roomName = triggerRoom.name
      if(startSelectIndex!=null){
        this.resRoomInfo.region = '【南京】（'+ this.regionName+'）'
        this.resRoomInfo.roomName = roomName
        this.resRoomInfo.startTime = this.getTimeFromIndex(startSelectIndex,0)
        this.resRoomInfo.endTime = this.getTimeFromIndex(endSelectIndex,1)
        this.resRoomInfo.user = this.userName
        this.dateLst.forEach((item,key)=>{
          if(item.active){
            this.resRoomInfo.week = item.week
            this.resRoomInfo.date = item.date
          }
        })
      }else{
        this.initResRoom() //初始resRoomInfo
      }      
    },
    //根据index获取开始结束时间
    getTimeFromIndex(index,type){
      if(type) index = index+1
      let hourTime = parseInt(index / 2)
      let complement = index % 2
      let minuteTime = complement == 1 ? "30":"00"
      let time = hourTime + ":" + minuteTime
      return time
    },
    //初始化预订信息
    initResRoom(){
      this.resRoomInfo.date = null
      this.resRoomInfo.week = null
      this.resRoomInfo.startTime = null
      this.resRoomInfo.endTime = null
      this.resRoomInfo.roomName = null
      this.resRoomInfo.region = null
      this.resRoomInfo.user = null
    },
    //初始化相关信息
    initState(){
      this.isMoving = false   //关闭滑动状态
      this.initGrid.startIndex = null
      this.initGrid.endIndex = null
    },
    //单行选择，清除其他行样式
    removeOtherLineCss(index){
      this.roomLst.forEach((item,key)=>{        
          item.startSelectIndex = null
          item.endSelectIndex = null
          item.gridLst.forEach((grid,key) => {
            if(grid.status == 2) grid.status = 0
          })      
      })
    },
    //获取markLine的位置信息
    getMarkLinePostion(startSelectIndex,endSelectIndex){
      let gridW = $('.roomGrid').outerWidth()
      this.markLine.leftLine = -1 + startSelectIndex * (gridW)
      this.markLine.rightLine = -1 + (endSelectIndex + 1) * (gridW)
      this.markLine.isShow = true
    },
    //隐藏markLine
    hideMarkLine(){
      this.markLine.isShow = false
    },
    //移动时间标尺
    moveHour(isMoveLeft){
      if(isMoveLeft){
        if(this.moveStep>1) this.moveStep --
      }else{
        if(this.moveStep<4) this.moveStep ++
      }
    },
    //获取会议室列表
    getRoomLst(){
      this.roomLst = getRoomLst().roomLst 
      this.handleRoomLst() //对数据进行处理
      this.hideMarkLine()
    },
    //修改会议室列表的数据格式
    handleRoomLst(){
      this.roomLst.forEach((room,index) => {
        room.startSelectIndex = null
        room.endSelectIndex = null
        let resTimes = room.resTimes
        resTimes.forEach((time,key) => {
          let startTime = time.startTime
          let endTime = time.endTime
          let startIndex = this.getIndexFromTime(startTime,0)
          let endIndex = this.getIndexFromTime(endTime,1)
          for(let i = startIndex ;i <= endIndex; i ++){
            room.gridLst[i].status = 1
          }       
        })
      })
    },
    getIndexFromTime(time,type){
      let hourTime = parseInt(time.split(':')[0])
      let minuteTime
      if(type == 0){
        minuteTime = time.split(':')[1] == '30' ? 1 : 0
      }else{
        minuteTime = time.split(':')[1] == '30' ? 0 : 1
      }
      let index = type == 0 ? 2*hourTime + minuteTime : 2*hourTime - minuteTime
      return index
    },
    getDateLst(){
      for(let i = 0; i < 7; i++){
        let active = false
        let date = moment().add(i,'days').format('YYYY/MM/DD')
        let weekLst = new Array("日", "一", "二", "三", "四", "五", "六")
        let dateLocal = moment().add(i,'days')
        let week = '星期'+weekLst[dateLocal._d.getDay()]
        if(i == 0) active = true
        this.dateLst.push({
          week,
          date,
          active
        })
      }
    },
    changeDate(key){
      this.dateLst.forEach((item,key) => {
        item.active = false
      })
      this.dateLst[key].active = true
      this.getRoomLst()
      this.hideMarkLine()
    },
    getUserName(){
      this.userName = getUserName().userName
    },
    getPagination(){
      let pagination = getPagination() 
      this.pagination.total = pagination.total
      this.pagination.currentPage = pagination.currentPage
    }
  },
  mounted(){
    this.getRoomLst() //获取会议室信息
    this.getDateLst() //获取日期列表
    this.getRegionName() //获取选中的地区名称
    this.getUserName()
    this.getPagination()
  },
  created(){}
}
</script>

<style  scoped lang="less">
@baseColor:#ba78cd;//基础色，比如border
@disabledColor:#c8c9cc; //not-allowd颜色
@themeColor:@baseColor;//主题颜色
@themeColor2:@baseColor;//日期选中颜色
@hourColor:fadeout(@themeColor,80%);//时间滚条颜色
@markLineColor:#f76262;//markline颜色
@barGridH:25px;
@roomTopSideW:120px;
@sumW:900px;
@topRightW:@sumW - @roomTopSideW;
@gridW:(@topRightW - @barGridH - @barGridH) / 24;
@gridH:@gridW;
@baseBorder:1px solid @baseColor;
@fontColor:#606266;
*{user-select:none}
.resRoomWrap{width:1000px;margin:30px auto;min-height: 100%;box-sizing: border-box;background-color: #fff;}
.resRoomTitle{font-size:16px;font-weight: 400;padding:14px 20px;border-bottom:2px solid #f6f6f6;}
#roomReserveMain{width:@sumW;min-width:@sumW;margin:0 auto;}
// 删选条件样式
.conditionBox{margin-top:25px;margin-bottom:40px;
  .conditionItem{display:flex;
    .conditionTitle{font-size:14px;padding:10px 0;width:90px;color:@fontColor;}
    .facility{padding-top:10px;}
    .regionLst{display:flex;flex-wrap:wrap;flex:1;
      .region{font-size:14px;padding:10px 15px;cursor: pointer;color:@fontColor;
        &:hover{color:@themeColor;}
      }
      .region.active{background-color:fadeout(@themeColor,80%);border-radius: 6px;color:@themeColor;font-weight:700;}
    }
  }
}
//预订信息卡片
#resRoomInfo{margin-top:30px;margin-bottom:30px;color:@fontColor;
  h1{font-size:16px;margin-bottom:10px;}
  .resRoomInfoItem{padding:5px 0;
    .resRoomInfoItemTitle{margin-right: 10px;}
  }
}
// 预订表格插件样式
#resRoomPluginBox{width:100%;}
.resHead{display:flex;
  .resHeadRegionName{font-weight:400;color:@fontColor;font-size:14px;position:relative;top:10px;}
  .identifyLst{display:flex;justify-content:flex-end;flex:1;
    .identify{padding:8px 0;margin-left:10px;
      i{display:inline-block;width:15px;height:15px;background-color:@disabledColor;position:relative;top:3px;box-sizing:border-box;}
      i.nooccupy{background-color:#fff;border:1px solid @disabledColor;}
      i.select{background-color:@themeColor;}
      span{font-size:12px;margin-left:2px;color:@fontColor;}
    }
  }
}
#roomRerservation{width:100%;border:1px solid @baseColor;background-color:#fff;}
.roomTop{width:100%;height:70px;display:flex;}
.roomTopSide{width:@roomTopSideW;border:@baseBorder;box-sizing:border-box;position:relative;height:100%;
  &:before{content:"";position:absolute;left:15px;top:-15px;width:100%;height:50px;box-sizing:border-box;border-bottom:@baseBorder;transform-origin:center center;transform:rotateZ(30deg) scale(1.18);
  }
  .titleTime,.titleName{position:absolute;font-size:14px;color:@fontColor;}
  .titleTime{top:13px;right:20px;}
  .titleName{bottom:15px;left:20px}
}
.roomTopTime{flex:1;height:100%}
.roomDate{height:calc(100% - @barGridH);display: flex;background-color:#fff;
  .dateItem{flex:1;font-size:13px;text-align: center;box-sizing: border-box;border:@baseBorder;height:100%;display:flex;align-items: center;justify-content: center;cursor: pointer;color:@fontColor;}
  .dateItem.active{background-color:@themeColor2;color:#fff;}
}
#roomResPag{display:flex;justify-content:flex-end;padding:15px 0;}
.arrowHourWrap{width:100%;display:flex;height:@barGridH;
  .arrow{width:@barGridH;height:100%;box-sizing:border-box;border:@baseBorder;font-size:22px;text-align:center;position: relative;cursor:pointer;}
  .arrow.disabled{color:@disabledColor;cursor:not-allowed;}
  .roomTopHour{box-sizing:border-box;width:calc(@topRightW - @barGridH - @barGridH);overflow: hidden;
    .hourNavLst{white-space: nowrap;position:relative;transition:all 0.3s;
      .hourNavItem{display:inline-block;width:calc(100% / 12);height:@barGridH;line-height:@barGridH;text-align:center;box-sizing:border-box;border:@baseBorder;font-size:13px;background-color:@hourColor;color:@fontColor;}
    } 
    .hourNavLst.stepFour{left:-(@topRightW - 2*@barGridH);}    
    .hourNavLst.stepThree{left:-(@topRightW - 2*@barGridH)/24*16}
    .hourNavLst.stepTwo{left:-(@topRightW - 2*@barGridH)/24*8}
    .hourNavLst.stepOne{left:0}
  }
}
.roomMain{height:10*@gridH;display:flex;width:100%;overflow:hidden;}
.roomLst{}
.roomItem{height:@gridH;box-sizing:border-box;border-right: none;display:flex;
  .roomName{width:@roomTopSideW + @barGridH;box-sizing: border-box;text-align:center;font-size:14px;height:@gridH;line-height:@gridH;font-weight: 400;border:@baseBorder;user-select:none;color:@fontColor;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;box-sizing:border-box;padding:0 10px;}
  .roomGridWrap{box-sizing:border-box;overflow:hidden;width:@sumW - @barGridH - 145px;
    .roomGridLst{white-space: nowrap;position:relative;transition:all 0.3s;position:relative;
      .markLeftLine,.markRightLine{width:2px;height:100%;background-color:@markLineColor;position:absolute;z-index:10;}
      .roomGrid{display:inline-block;width:@gridW;height:@gridH;box-sizing:border-box;border:@baseBorder;}
      .roomGrid.isOccupy{background-color:@disabledColor;cursor: not-allowed;}
      .roomGrid.isSelect{background-color:@themeColor;}
    }
    .roomGridLst.stepFour{left:-(@topRightW - 2*@barGridH);}   
    .roomGridLst.stepThree{left:-(@topRightW - 2*@barGridH)/24*16}
    .roomGridLst.stepTwo{left:-(@topRightW - 2*@barGridH)/24*8}
    .roomGridLst.stepOne{left:0}

  }
}
#resBtnWrap{text-align:center;padding:20px 0}
.noneBox{width:@barGridH;border:@baseBorder;box-sizing:border-box}
// screen >= 1200
@media screen and (min-width:1200px){

}
// 1200>= screen >=992
@media screen and (max-width:1200px){
}

@media screen and (max-width:992px){
}

@media screen and (max-width:768px){
}

@media screen and (max-width:480px){
}
</style>
