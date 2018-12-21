<!--
 * @Author: caojing
 * @Date: 2018-12-21 14:29:09
 * @LastEditors: caojing
 * @LastEditTime: 2018-12-21 17:26:53
 * @Description: vHeader组件
 -->
<template>
    <header class="header">
        <div class="headerMain">
        会议室预订系统
        </div>
    </header>
</template>

<script>
export default {
  name:'vHeader',
  data(){
   return {

   }
  },
  components: {

  },
  methods:{

  },
  mounted(){

  },
  created(){}
}
</script>

<style lang="less">

</style>
<style lang="less" scoped>
.header{
    background:#fff;
    box-shadow:0 1px 3px rgba(26, 26, 26, 0.1);
    height:52px;
    display:flex;
    justify-content: center;
    align-items:center;
    .headerMain{
        width:@centerW;
        text-align:left;
        font-size:16px;
        color:@themeColor;
    }
}
</style>