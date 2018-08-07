<template>
  <div class="resRoomWrap">    
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

</style>
