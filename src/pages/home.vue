<!--
 * @Author: caojing
 * @Date: 2018-12-21 14:14:36
 * @LastEditors: caojing
 * @LastEditTime: 2018-12-21 14:43:30
 * @Description: 首页
 -->
<template>
  <div class="resRoomWrap">    
    <v-header></v-header>
    <div class="main">
      <room-res-plug></room-res-plug>
    </div>
    
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from '@/components/vHeader'
import vFooter from '@/components/vFooter'
import roomResPlug from '../components/roomRerservation'
export default {
  name: 'homePage',
  components:{
    roomResPlug,
    vHeader,
    vFooter
  },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resRoomWrap{
  height:100%;
  display: flex;
  flex-direction: column;
}
.main{
  flex:1;
  overflow: auto;
}
</style>
