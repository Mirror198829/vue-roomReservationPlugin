<!-- 
- Author:CaoJing
- Date:2018/8/1
- github:https://github.com/Mirror198829
-->
<template>
  <div id="roomRerservation">
    <div class="roomTop">
      <div class="roomTopSide">
        <span class="titleTime">时间</span>
        <span class="titleName">名称</span>
      </div>
      <div class="roomTopTime">
        <ul class="roomDate">
          <li class="dateItem" v-for="(date,key) in dateLst" :class="{'active':date.active}" @click="changeDate(key)"><span>{{date.date}}</span></li>
        </ul>
        <div class="arrowHourWrap">
          <i class="arrow arrowLeft fa fa-caret-left" :class="{'disabled': isPmHour == false}"  @click = "isPmHour = false"></i>
          <div class="roomTopHour">
            <ul class="hourNavLst" :class="{'pmHour':isPmHour}">
              <li class="hourNavItem" v-for="(item,index) in 24">{{index}}:00</li>
            </ul>
          </div>
          <i class="arrow arrowRight  fa fa-caret-right" :class="{'disabled': isPmHour == true}" @click = "isPmHour = true"></i>
        </div>
      </div>
    </div>
    <div class="roomMain">
      <ul class="roomLst">
        <li class="roomItem"  v-for="(item,key) in roomLst">
          <h3 class="roomName">{{item.name}}</h3>
          <div class="roomGridWrap">
            <ul class="roomGridLst"  :class="{'pmHour':isPmHour}">
              <div v-if="markLine.isShow" class="markLeftLine" :style="{'left':markLine.leftLine+'px'}"></div>
              <div v-if="markLine.isShow" class="markRightLine" :style="{'left':markLine.rightLine+'px'}"></div>
              <li class="roomGrid" 
                  v-for="(grid,index) in item.gridLst" 
                  :class="{'isOccupy':grid.status == 1,'isSelect':grid.status == 2}"
                  @mousedown="mouseDownGrid(key,index)"
                  @mouseup = 'mouseUpGrid(key,index)'
                  @mouseover = 'mouseOverGrid(key,index)'
              ></li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="noneBox"></div>
    </div>
  </div>
</template>

<script>
import getRoomLst from '../mock/room.js'
export default {
  name: 'roomRerservation',
  data () {
    return {
      isPmHour:false,
      dateLst:[],
      roomLst:[],
      isMoving:false,   //滑动状态
      triggerIndex:null, //点击的行数
      initGrid:{
        startIndex:null,
        endIndex:null
      },
      markLine:{
        isShow:false,
        leftLine:0,
        rightLine:0
      }
    }
  },
  methods:{
    mouseOverGrid(key,index){
      let curGrid = this.roomLst[key]  
      let initStartIndex = this.initGrid.startIndex   //第一次点击的grid信息
      let initEndIndex =  this.initGrid.endIndex
      let gridStatus = curGrid.gridLst[index].status
      let curStartIndex = curGrid.startSelectIndex 
      let curEndIndex = curGrid.endSelectIndex 
      let isMoving = this.isMoving
      let triggerIndex = this.triggerIndex
      if(!isMoving) return false
      if(triggerIndex != key) return false   //如果不是同一行没有滑动状态
      if(gridStatus == 1){
        curGrid.startSelectIndex = null
        curGrid.endSelectIndex = null
        curGrid.gridLst.forEach((grid,index) => {
          if(grid.status == 2) grid.status = 0
        })
        alert('此时间段已经被占用，请重新选择')
        this.hideMarkLine()
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
      this.roomLst[key].gridLst.forEach((grid,index)=>{
        if(grid.status == 2) grid.status = 0
      })
      this.roomLst[key].startSelectIndex = curStartIndex
      this.roomLst[key].endSelectIndex = curEndIndex

      for(let i = curStartIndex; i <= curEndIndex; i++){
        this.roomLst[key].gridLst[i].status = 2
      }
      this.getMarkLinePostion(curStartIndex,curEndIndex) //获取markLine的信息 
    },
    mouseDownGrid(key,index){ 
      let curGrid = this.roomLst[key]      
      let startSelectIndex = curGrid.startSelectIndex
      let endSelectIndex =  curGrid.endSelectIndex
      let gridStatus = curGrid.gridLst[index].status
      this.removeOtherLineCss(key) //只能选择一行的样式，清除其他行的样式
      this.isMoving = true //启动滑动状态
      this.triggerIndex = key //保存当前触发行
      if(gridStatus == 1){
        return false //如果是占用状态，不可点击
      }else if(gridStatus == 2){   //如果是已选择状态
        if(index ==  startSelectIndex && index == endSelectIndex){   //一行已选择的只有一个格子
          startSelectIndex = null
          endSelectIndex = null
          this.roomLst[key].gridLst[index].status = 0
          this.hideMarkLine()  //隐藏markLine
        }else if( index == startSelectIndex){
          startSelectIndex = index + 1  
          this.roomLst[key].gridLst[index].status = 0
        }else if(index == endSelectIndex){
          endSelectIndex = index - 1
          this.roomLst[key].gridLst[index].status = 0
        }else{
          return false
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
            alert('选择时间段中间有被占用时间，请重新选择')
            this.hideMarkLine()
            this.initState()
            break;  
           }                   
          this.roomLst[key].gridLst[i].status = 2
          this.getMarkLinePostion(startSelectIndex,endSelectIndex) //获取markLine的信息
        } 
      } 
    },
    mouseUpGrid(key,index){
      this.initState() //初始化所有信息
    },
    //初始化相关信息
    initState(){
      this.isMoving = false   //关闭滑动状态
      this.triggerIndex = null //恢复初始值
      this.initGrid.startIndex = null
      this.initGrid.endIndex = null
    },
    //单行选择，清除其他行样式
    removeOtherLineCss(index){
      this.roomLst.forEach((item,key)=>{
        if(key != index){
          item.startSelectIndex = null
          item.endSelectIndex = null
          item.gridLst.forEach((grid,key) => {
            if(grid.status == 2) grid.status = 0
          })
        }
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
    getRoomLst(){
      this.roomLst = getRoomLst().roomLst 
      this.handleRoomLst() //对数据进行处理
    },
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
        let date = this.$moment().add(i,'days').format('YYYY/MM/DD')
        if(i == 0) active = true
        this.dateLst.push({
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
      this.hideMarkLine()
      this.getRoomLst()
    }
  },
  mounted(){
    this.getRoomLst()
    this.getDateLst()
  },
  created(){}
}
</script>

<style  scoped lang="less">
@baseColor:#999;//基础色，比如border
@disabledColor:#c8c9cc; //not-allowd颜色
@themeColor:#37c6c0;//主题颜色
@themeColor2:#1db0b8;//日期选中颜色
@hourColor:#D0e9ff;//时间滚条颜色
@barGridH:25px;
@roomTopSideW:120px;
@sumW:800px;
@topRightW:@sumW - @roomTopSideW;
@gridW:(@topRightW - @barGridH - @barGridH) / 24;
@gridH:@gridW;
@baseBorder:1px solid @baseColor;
@fontColor:rgb(52, 73, 94);
*{user-select:none}
#roomRerservation{width:@sumW;border:1px solid @baseColor;background-color:#fff;min-width:@sumW;}
.roomTop{width:100%;height:70px;display:flex;}
.roomTopSide{width:@roomTopSideW;border:@baseBorder;box-sizing:border-box;position:relative;
  &:before{content:"";
  position:absolute;
  left:15px;
  top:-15px;
  width:100%;
  height:50px;
  box-sizing:border-box;
  border-bottom:@baseBorder;
  transform-origin:center center;
  transform:rotateZ(30deg) scale(1.18);
  }
  .titleTime,.titleName{position:absolute;font-size:14px;color:@fontColor;}
  .titleTime{top:13px;right:20px;}
  .titleName{bottom:15px;left:20px}
}
.roomTopTime{flex:1;}
.roomDate{height:calc(100% - @barGridH);display: flex;background-color:#fff;
  .dateItem{flex:1;font-size:14px;text-align: center;box-sizing: border-box;border:@baseBorder;height:100%;display:flex;align-items: center;justify-content: center;cursor: pointer;color:@fontColor;}
  .dateItem.active{background-color:@themeColor2;color:#fff}
}
.arrowHourWrap{width:100%;display:flex;height:@barGridH;
  .arrow{width:@barGridH;height:100%;box-sizing:border-box;border:@baseBorder;font-size:22px;text-align:center;position: relative;cursor:pointer;}
  .arrow.disabled{color:@disabledColor;cursor:not-allowed;}
  .roomTopHour{box-sizing:border-box;width:calc(@topRightW - @barGridH - @barGridH);overflow: hidden;
    .hourNavLst{white-space: nowrap;position:relative;left:0;transition:all 0.3s;
      .hourNavItem{display:inline-block;width:calc(100% / 12);height:@barGridH;line-height:@barGridH;text-align:center;box-sizing:border-box;border:@baseBorder;font-size:13px;background-color:@hourColor;color:@fontColor;}
    } 
    .hourNavLst.pmHour{left:-(@topRightW - 2*@barGridH);}
  }
}
.roomMain{height:10*@gridH;display:flex;width:100%;overflow:hidden;}
.roomLst{}
.roomItem{height:@gridH;box-sizing:border-box;border-right: none;display:flex;
  .roomName{width:@roomTopSideW + @barGridH;box-sizing: border-box;text-align:center;font-size:14px;height:@gridH;line-height:@gridH;font-weight: 400;border:@baseBorder;user-select:none;color:@fontColor;}
  .roomGridWrap{box-sizing:border-box;overflow:hidden;width:@sumW - @barGridH - 145px;
    .roomGridLst{white-space: nowrap;position:relative;left:0;transition:all 0.3s;position:relative;
      .markLeftLine,.markRightLine{width:2px;height:100%;background-color:red;position:absolute;z-index:10;}
      .roomGrid{display:inline-block;width:@gridW;height:@gridH;box-sizing:border-box;border:@baseBorder;}
      .roomGrid.isOccupy{background-color:@disabledColor;cursor: not-allowed;}
      .roomGrid.isSelect{background-color:@themeColor;}
    }
    .roomGridLst.pmHour{left:-(@topRightW - 2*@barGridH);}
  }
}
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
