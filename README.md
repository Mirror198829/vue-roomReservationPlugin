# vue-roomReservationPlugin
![avatar](https://mirror198829.github.io/static/github/resRoom.png)
## 技术栈
` vue+element-ui+momentjs+mockjs+less `
## git源码修改
``` javascript
 git clone https://github.com/Mirror198829/vue-roomReservationPlugin.git
 npm install 
 npm run dev
```
## NPM(vue-res-room)使用
`npm install vue-res-room --save-dev`
个人项目 main.js:
``` javascript
import RoomRes from 'vue-room-res'
import 'vue-room-res/dist/room-res.min.css'
Vue.use(RoomRes)
```
在项目需要的位置引入插件：
``` html
<div id="app">
    <router-view/>
    <room-res></room-res>
</div>
```
## 数据格式
``` javascript
roomData:[
  {name:'会议室',startTime:'11:00',endTime:'24:00'}
]
```
自动转换成格式
``` javascript
roomData:[
  {name:'会议室',hours:[
    {status: 0|1|2,index:0+,startHour:index + ':30',endHour: 'index+1'}
  ]}
]
```
## 预订方式
### 滑动模块预定
### 点击模块预订

## 功能
