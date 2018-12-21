<!--
 * @Author: caojing
 * @Date: 2018-12-21 14:36:23
 * @LastEditors: caojing
 * @LastEditTime: 2018-12-21 15:59:04
 * @Description: vFooter component
 -->
<template>
    <footer>
        <a href="https://github.com/Mirror198829/vue-roomReservationPlugin/tree/master" target="blank">江苏南京 前端开发工程师 曹静</a>
        <a href="https://github.com/Mirror198829/vue-roomReservationPlugin/tree/master" target="blank">Github:https://github.com/Mirror198829/vue-roomReservationPlugin/tree/master</a>
    </footer>
</template>

<script>
export default {
  name:'vFooter',
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
footer{
    background:#fff;
    padding:20px 0;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    box-shadow:3px 1px 0px rgba(26, 26, 26, 0.1);
    a{
        color:@fontColor;
        font-size:14px;
        &:first-child{
            margin-bottom:5px;
        }
    }
}
</style>