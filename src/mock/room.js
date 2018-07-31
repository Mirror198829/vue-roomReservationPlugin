const Mock = require('mockjs')
function getRoomLst(){
 let roomLst = Mock.mock({
    "roomLst|10": [
      {
        "name|+1": ['会议室1','会议室2','会议室3','会议室4','会议室5','会议室6','会议室7','会议室8','会议室9','会议室10'],
        "date":"@date('yyyy/MM/dd')",
        "resTimes|0-1":[
          {
            "startTime|1":["8:00"],
            "endTime|1":["18:30"],
            "resUser":"@cname"
          }
        ],
        "gridLst|48":[
          {
            "status":0
          }
        ]
      }
    ]
  })
 return roomLst
} 

export default getRoomLst