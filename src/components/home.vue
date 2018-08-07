<template>
  <div class="resRoomWrap">    
    <room-res-plug></room-res-plug>
  </div>
</template>

<script>
import roomResPlug from './roomRerservation.vue'
export default {
  name: 'homePage',
  components:{
    roomResPlug
  },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
