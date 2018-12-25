<!--
 * @Author: caojing
 * @Date: 2018-08-08 15:33:12
 * @LastEditors: caojing
 * @LastEditTime: 2018-12-25 16:28:33
 * @Description: 会议室预订系统
 -->
<template>
  <div class="resRoomMain">
    <div class="roomReserveMain">
      <v-room-con-filter 
        @change="getRoomLst();getPagination()"></v-room-con-filter>
      <v-room-plugin 
        @click="getRoomLst()" 
        :room-lst="roomLst"
        @getResInfo="getResInfo"></v-room-plugin>
      <div id="roomResPag">
        <el-pagination @current-change="getRoomLst()" :current-page="pagination.currentPage" layout="total,  prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
      <v-room-res-info :resRoomInfo="resRoomInfo"></v-room-res-info>
      <div id="resBtnWrap">
        <el-button type="primary">确定预订</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import vRoomConFilter from '@/components/vRoomConFilter'
  import vRoomPlugin from '@/components/vRoomPlugin'
  import vRoomResInfo from '@/components/vRoomResInfo'
  import getRoomLst from '../mock/room.js'
 
  import getPagination from '../mock/pagination.js'

  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'font-awesome/css/font-awesome.css'
  import 'element-ui/lib/theme-chalk/index.css'

  Vue.use(ElementUI)
  export default {
    name: 'roomResPlug',
    data() {
      return {
        regionName: null,
        roomLst:[],
        resRoomInfo: {
          region: null,
          date: null,
          week: null,
          startTime: null,
          endTime: null,
          roomName: null,
          user: null
        },
        pagination: {
          total: 0,
          currentPage: 0
        }
      }
    },
    components: {
      vRoomConFilter,
      vRoomPlugin,
      vRoomResInfo
    },
    methods: {
      getRoomLst() {
        this.roomLst = getRoomLst().roomLst //传递会议室信息
      },
      getPagination() {
        let pagination = getPagination()
        this.pagination.total = pagination.total
        this.pagination.currentPage = pagination.currentPage
      },
      getResInfo(param){
        this.resRoomInfo = param
      }
    },
    mounted() {
      this.getRoomLst() //获取会议室信息
      this.getPagination()

    },
    created() {}
  }

</script>

<style scoped lang="less">
  @sumW: 900px;
  @roomTopSideW: 120px;
  @topRightW: @sumW - @roomTopSideW;

  .resRoomMain {
    width: @centerW;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px 0;
  }

  .roomReserveMain {
    width: @sumW;
    min-width: @sumW;
    margin: 0 auto;
  }
  #roomResPag {
    display: flex;
    justify-content: flex-end;
    padding: 15px 0;
  }
  #resBtnWrap {
    text-align: center;
    padding: 20px 0
  }

  // screen >= 1200
  @media screen and (min-width:1200px) {}

  // 1200>= screen >=992
  @media screen and (max-width:1200px) {}

  @media screen and (max-width:992px) {}

  @media screen and (max-width:768px) {}

  @media screen and (max-width:480px) {}

</style>
