<template>
  <div id="app">
<!--     <router-view/> -->
	<res-room></res-room>
  </div>
</template>

<script>
import resRoom from './components/roomRerservation.vue'
export default {
  name: 'App',
  components:{
  	resRoom
  }
}
</script>

<style>
*{margin:0;padding:0;}
.clearfix{ zoom:1;}
.clearfix:after{ content:''; display:block; clear:both;}
html,body,#app{height:100%;}
body{background-color: #f6f6f6}
ul,li{list-style: none;}
a{text-decoration: none;}
</style>
