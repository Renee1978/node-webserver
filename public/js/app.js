
// fetch('https://puzzle.mead.io/puzzle')


const weatherForm=document.querySelector('form')
const loc=document.querySelector('input')
const p1=document.querySelector('#p1')
const p2=document.querySelector('#p2')

p1.textContent='loading'
p2.textContent=''

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const cityy=loc.value
  fetch('http://api.weatherstack.com/current?access_key=958299f1f294a77df2a8a1c4a9c1d5db&query='+cityy)
  .then(res=>res.json())
  .then(data=>{
    if(data.error){
      console.log(data.error.info)
      p1.textContent=data.error.info
      p2.textContent=''
    }else{
    console.log(data.current)
    console.log(data.location)
    p1.textContent=data.location.country
    p2.textContent=data.current.weather_descriptions[0]}
})
})