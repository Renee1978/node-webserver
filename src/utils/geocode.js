const request = require("request")

// })
const geocode=(address,callback)=>{
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicmd4cmVuIiwiYSI6ImNsMnd5anIzbzAxanAzam8wZXp3OXhrZ2kifQ.eHPdItDQplhK5A4m2isj4A'
  request({url:url,json:true},(error,res)=>{
    if(error){
      callback('unable to connect to location services',undefined)
    }else if(res.body.message){
      callback('Not Found.',undefined)
    }else{
      const city=res.body.features[0].place_name
      const lat=res.body.features[0].center[1]
      const lon=res.body.features[0].center[0]
      callback(undefined,{lat:lat,lon:lon,city:city})
    }
  })

}
module.exports=geocode