const Mock = require('mockjs')
function getRoomLst(){
 let roomLst = Mock.mock({
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
 return roomLst
} 

export default getRoomLst