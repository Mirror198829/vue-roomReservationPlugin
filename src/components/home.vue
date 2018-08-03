<template>
  <div class="resRoomWrap">
    <h1 class="resRoomTitle">会议室预订</h1>
    <room-rerservation></room-rerservation>
  </div>
</template>

<script>
import roomRerservation from './roomRerservation.vue'
export default {
  name: 'HelloWorld',
  components:{
    roomRerservation
  },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resRoomWrap{width:1000px;margin:30px auto;background-color: #fff;min-height: 100%;box-sizing: border-box;}
.resRoomTitle{font-size:16px;font-weight: 400;padding:14px 20px;border-bottom:2px solid #f6f6f6;}
</style>
