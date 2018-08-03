const Mock = require('mockjs')
function getPagination(){
 let pagination = Mock.mock({
    "total|12-50":0,
    "currentPage":1
  })
 return pagination
} 

export default getPagination