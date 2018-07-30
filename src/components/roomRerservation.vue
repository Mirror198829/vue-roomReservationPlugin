<!-- 
- Author:CaoJing
- Date:2018/7/30
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
          <li class="dateItem" v-for="(date,key) in dateLst"><span>{{date}}</span></li>
        </ul>
        <div class="arrowHourWrap">
          <i class="arrow arrowLeft fa fa-caret-left" :class="{'disabled': isPmHour == false}"  @click = "isPmHour = false"></i>
          <div class="roomTopHour">
            <ul class="hourNavLst" :class="{'pmHour':isPmHour}">
              <li class="hourNavItem" v-for="(item,index) in 24">{{index+1}}:00</li>
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
              <li class="roomGrid" 
                  v-for="(grid,key) in item.gridLst" 
                  :class="{'isSelect':grid.status == 1}"></li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="noneBox"></div>
    </div>
  </div>
</template>

<script>
import roomLst from '../mock/room.js'
export default {
  name: 'roomRerservation',
  data () {
    return {
      isPmHour:false,
      dateLst:['2018-07-30','2018-07-30','2018-07-30','2018-07-30','2018-07-30','2018-07-30','2018-07-30'],
      roomLst:[
        {name:'会议室',startTime:'11:00',endTime:'13:00',gridLst:[
          {'status':1},
          {'status':1},
          {'status':1},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0}
        ]},
        {name:'会议室',startTime:'11:00',endTime:'13:00',gridLst:[
          {'status':1},
          {'status':1},
          {'status':1},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0},
          {'status':0}
        ]}
      ]
    }
  },
  methods:{
    getRoomLst(){
      this.roomLst = roomLst.roomLst 
    }
  },
  mounted(){
    this.getRoomLst()
  },
  created(){}
}
</script>

<style  scoped lang="less">
@barGridH:25px;
@baseColor:#ccc;
@roomTopSideW:120px;
@themeColor:#00c484;
@sumW:800px;
@topRightW:@sumW - @roomTopSideW;
@gridW:(@topRightW - @barGridH - @barGridH) / 24;
@gridH:@gridW;
@baseBorder:1px solid @baseColor;
#roomRerservation{width:@sumW;border:1px solid @baseColor;margin:30px auto}
.roomTop{width:100%;height:70px;display:flex;}
.roomTopSide{width:@roomTopSideW;border-bottom:@baseBorder;box-sizing:border-box;position:relative;
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
  .titleTime,.titleName{position:absolute;font-size:14px;}
  .titleTime{top:13px;right:20px;}
  .titleName{bottom:15px;left:20px}
}
.roomTopTime{flex:1;}
.roomDate{height:calc(100% - @barGridH);display: flex;background-color:#fff;
  .dateItem{flex:1;font-size:14px;text-align: center;box-sizing: border-box;border:@baseBorder;height:100%;display:flex;align-items: center;justify-content: center;cursor: pointer;border-top:none;}
}
.arrowHourWrap{width:100%;display:flex;height:@barGridH;
  .arrow{width:@barGridH;height:100%;box-sizing:border-box;border:@baseBorder;font-size:22px;text-align:center;position: relative;cursor:pointer;}
  .arrow.disabled{color:@baseColor;cursor:not-allowed;}
  .roomTopHour{box-sizing:border-box;width:calc(@topRightW - @barGridH - @barGridH);overflow: hidden;
    .hourNavLst{white-space: nowrap;position:relative;left:0;transition:all 0.3s;
      .hourNavItem{display:inline-block;width:calc(100% / 12);height:@barGridH;line-height:@barGridH;text-align:center;box-sizing:border-box;border:@baseBorder;font-size:14px;}
    } 
    .hourNavLst.pmHour{left:-(@topRightW - 2*@barGridH);}
  }
}
.roomMain{height:10*@gridH;display:flex;width:100%;}
.roomLst{}
.roomItem{height:@gridH;box-sizing:border-box;border:@baseBorder;border-right: none;display:flex;
  .roomName{width:@roomTopSideW + @barGridH - 1px;box-sizing: border-box;text-align:center;font-size:14px;height:@gridH;line-height:@gridH;font-weight: 400;border-right:@baseBorder;}
  .roomGridWrap{box-sizing:border-box;overflow:hidden;width:@sumW - @barGridH - 145px;
    .roomGridLst{white-space: nowrap;position:relative;left:0;transition:all 0.3s;
      .roomGrid{display:inline-block;width:@gridW;height:@gridH;box-sizing:border-box;border:@baseBorder;}
      .roomGrid.isSelect{background-color:@themeColor;}
    }
    .roomGridLst.pmHour{left:-(@topRightW - 2*@barGridH);}
  }
}
.noneBox{width:@barGridH;border-left:@baseBorder;box-sizing:border-box}
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
