const request = require("request")

const forecast=(address, callback)=>{  
  const url=`http://api.weatherstack.com/current?access_key=958299f1f294a77df2a8a1c4a9c1d5db&query=${address}`
  request({url:url,json:true},(error, res)=>{
    if(error){
      callback("no connection",undefined)
    }else if(res.body.error){
      callback('Access Restricted - Your current Subscription Plan does not support HTTPS Encryption.',undefined)      
    }else{
      callback(undefined, res.body.current)
    }
})
}
module.exports=forecast