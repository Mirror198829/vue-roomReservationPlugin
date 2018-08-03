const Mock = require('mockjs')
function getUserName(){
 let userName = Mock.mock({
    "userName": "@cname"
  })
 return userName
} 

export default getUserName