# vue-roomReservationPlugin
会议室预订插件
![avatar](https://mirror198829.github.io/static/github/resRoom.png)
## 技术栈
vue+element-ui+momentjs+mockjs+less
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
