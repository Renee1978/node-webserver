const express=require('express')
const path=require('path')
const hbs = require('hbs');
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
  res.render('index',{
    title:"Weather APP",
    content:"这里是正文，我没啥可说的"
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'about ouro company'
  })
})
app.get('/help',(req,res)=>{
  res.render('help',{
    title:"帮助页面",
    content:"其实我现在啥也帮不了"
  })
})
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:"no help article found",
  })
})
app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'NO SEARCH PROVIDED'
    })
  }
  res.send({
    products:[]
  })
})
app.get('/weather',(req,res)=>{
  const address=req.query.address
  if(!address){
    return res.send({
      error:'PLEASE PROVIDE AN ADDRESS'
    })
  }  
  forecast(address, (error,response)=>{
    if(error){
      return res.send({error})
    }
    const temp=response.temperature
    const feelslike=response.feelslike
    const des=response.weather_descriptions
    res.send({
      city:des,
      temperature:temp,
      feelslike:feelslike
    })
  })    
  })
app.get('/*',(req,res)=>{
  res.render('404',{
    title:"404.ohoooo",
  })
})
app.listen(3000,()=>{
  console.log('server is up and runnning at port 3000');
})

