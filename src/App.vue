<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin:0;padding:0;}
.clearfix{ zoom:1;}
.clearfix:after{ content:''; display:block; clear:both;}
html,body,#app{height:100%;}
ul,li{list-style: none;}
a{text-decoration: none;}
</style>
