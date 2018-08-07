import RoomRes from './components/roomRerservation.vue'
const roomRes={
  install:function (Vue) {
    Vue.component('roomRes',RoomRes)
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(roomRes)
}
export default roomRes