<!--
 * @Author: caojing
 * @Date: 2018-12-21 16:12:41
 * @LastEditors: caojing
 * @LastEditTime: 2018-12-21 16:28:04
 * @Description: conditon filter cpt
 -->
<template>
  <div class="conditionBox">
    <li class="conditionItem">
      <h3 class="conditionTitle">区域选择：</h3>
      <ul class="regionLst">
        <li class="region" :key="key" v-for="(item,key) in regionLst" :class="{'active':item.status}" @click="selectRegionCondition(key)">{{item.name}}</li>
      </ul>
    </li>
    <li class="conditionItem">
      <h3 class="conditionTitle">会议设施：</h3>
      <ul class="facility">
        <el-checkbox-group v-model="facilityList" @change="changeRoom()">
          <el-checkbox label="视频"></el-checkbox>
          <el-checkbox label="投影"></el-checkbox>
          <el-checkbox label="白板"></el-checkbox>
          <el-checkbox label="麦克"></el-checkbox>
          <el-checkbox label="电视"></el-checkbox>
        </el-checkbox-group>
      </ul>
    </li>
  </div>
</template>

<script>
  export default {
    name: 'vRoomConFilter',
    data() {
      return {
        facilityList: [], //设施列表
        regionLst: [{
          name: '全部',
          status: true
        }, {
          name: '集团总部楼会议中心',
          status: false
        }, {
          name: '易购楼会议中心',
          status: false
        }, {
          name: '研发二区会议中心',
          status: false
        }, {
          name: '集团总部楼',
          status: false
        }, {
          name: '易购楼',
          status: false
        }, {
          name: '研发二区-B1栋',
          status: false
        }, {
          name: '研发二区-B2栋',
          status: false
        }, {
          name: '研发二区-C1栋',
          status: false
        }, {
          name: '研发二区-C2栋',
          status: false
        }, {
          name: '雨花基地',
          status: false
        }, {
          name: '金融城',
          status: false
        }, {
          name: '高尔夫俱乐部',
          status: false
        }], //区域列表
      }
    },
    components: {

    },
    methods: {
      changeRoom(){
          this.$emit('change')
      },
      //根据地域删选会议室信息
      selectRegionCondition(key) {
        this.regionLst.forEach((item, key) => {
          item.status = false
        })
        this.regionLst[key].status = true
        this.getRegionName()
        this.moveStep = 3
        this.changeRoom()
      },
      //根据地域的激活状态获插件的地域名称
      getRegionName() {
        this.regionLst.forEach((item, key) => {
          if (item.status) this.regionName = item.name
        })
      },
    },
    mounted() {

    },
    created() {}
  }

</script>

<style lang="less">

</style>
<style lang="less" scoped>
  // 删选条件样式
  .conditionBox {
    margin-bottom: 40px;
 
    .conditionItem {
      display: flex;

      .conditionTitle {
        font-size: 14px;
        padding: 10px 0;
        width: 90px;
        color: @fontColor;
      }

      .facility {
        padding-top: 10px;
      }

      .regionLst {
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        .region {
          font-size: 14px;
          padding: 10px 15px;
          cursor: pointer;
          color: @fontColor;

          &:hover {
            color: @themeColor;
          }
        }

        .region.active {
          background-color: fadeout(@themeColor, 80%);
          border-radius: 6px;
          color: @themeColor;
          font-weight: 700;
        }
      }
    }
  }

</style>
