const Mock = require('mockjs')
const roomLst = Mock.mock({
  "roomLst|10": [
    {
      "name": '会议室-@cname',
      "startTime":'@time',
      "endTime":'@time',
      "gridLst|48":[
        {
          "status|1":[0,1]
        }
      ]
    }
  ]
})
export default roomLst