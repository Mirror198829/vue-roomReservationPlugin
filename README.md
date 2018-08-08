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
## NPM(vue-res-room plugin)使用
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
## 功能列表
| 序号 | 内容 |
| ------ | ------ |
| 1 | 区域删选切换会议室列表 |
| 2 | 设施checkbox切换状态更新会议室列表 |
| 3 | 会议室选择——日期切换 |
| 4 | 会议室选择——时间轴过渡移动 |
| 5 | 会议室选择——会议室信息展示（已占用展示） |
| 6 | 会议室选择——鼠标点击选择时间段 |
| 7 | 会议室选择——鼠标滑动选择时间段 |
| 8 | 预订信息与选择事件关联 |
## 数据格式
会议室预订表格的数据格式如下：
``` javascript
Mock.mock({
    "roomLst|10": [
      {
        "id":'@id',
        "name": '@name',
        "date":"@date('yyyy/MM/dd')",
        "resTimes|0-2":[
          {
            "startTime|+1":["8:00",'13:30','16:00'],
            "endTime|+1":["10:30",'15:00','18:30'],
            "resUser":"@cname"
          }
        ]
      }
    ]
})
```
#### 请注明代码来源：https://github.com/Mirror198829/vue-roomReservationPlugin
