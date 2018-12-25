<!--
 * @Author: caojing
 * @Date: 2018-12-25 16:11:25
 * @LastEditors: caojing
 * @LastEditTime: 2018-12-25 16:29:09
 * @Description: 预订信息
 -->
<template>
  <div class="resRoomInfo">
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
</template>

<script>
  export default {
    name: 'vRoomResInfo',
    data() {
      return {

      }
    },
    components: {

    },
    props: {
      resRoomInfo: {}
    },
    methods: {

    },
    mounted() {

    },
    created() {}
  }

</script>

<style lang="less">

</style>
<style lang="less" scoped>
  //预订信息卡片
  .resRoomInfo {
    margin-top: 30px;
    margin-bottom: 30px;
    color: @fontColor;
    text-align:left;
    h1 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .resRoomInfoItem {
      padding: 5px 0;

      .resRoomInfoItemTitle {
        margin-right: 10px;
      }
    }
  }

</style>
