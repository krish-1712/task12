async function getCountry(num){
    try{
    var country= await fetch(`https://restcountries.com/v3.1/all`)
    var res=await country.json()
    var alreadyActive = document.getElementsByClassName('active');
    if(alreadyActive.length>0){
        console.log(alreadyActive)
        alreadyActive[0].classList.remove('active');
    }
    
    console.log(num)
    var active = document.getElementById(num.toString());
    console.log(active);
    active.classList.add("active");
    console.log(res) 
    var start =0;
    var end =25;
    if(num>1){
        start = (num-1)*25
        end = start+25;
    }
     for(let i=start;i<end;i++){
        var CountryNames= (res[i].name.common)
        console.log(CountryNames)
        var Countrycapital= (res[i].capital)
        console.log(Countrycapital)
        var Countryregion= (res[i].region)
        console.log(Countryregion)
        var Countrycodes= (res[i].cca3)
        console.log(Countrycodes)
        var Countryflag= (res[i].flags.png)
        console.log(Countryflag)
        var Countrylatlng= (res[i].capitalInfo.latlng)
        console.log(Countrylatlng)
        var container = document.getElementById('container');
        var restcountries=document.createElement('div')
        restcountries.setAttribute('class','country')
        restcountries.innerHTML=`<div style="border:solid 1px;"><img src="${Countryflag}"alt="" style= "width:200px;"></div><p class="text" id ="countryName">Capital: ${Countrycapital}</p>
        <p  class=text1>Region: ${Countryregion}</p>
        <p class="text2">Country Code: ${Countrycodes}</p>
        <p>Countrylatlng: ${Countrylatlng}</p>
        <button  "type="button" onclick="getweatherdata(${Countrycapital})">Click For Weather</button>
        <div id="${Countrycapital}"></div> `
     
        
        container.appendChild(restcountries)   
    }
     }
    catch(err){
        console.log("Some error occured"+ err)
    }   

}
async function getweatherdata(element){
var dec=element.id
console.log("dec",dec)
console.log('ele : ',element)
var countryNames=document.getElementById("countryName").innerText
console.log(countryNames)
var countryName=countryNames.split(":")[1];
var weatherdata =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${dec}&appid=38b841c2fac06fc20dcd3522becdd0e4`)
var data= await weatherdata.json()
console.log(data)
let temperature= data.main.temp
console.log(temperature)

let ws= data.wind.speed
console.log(ws)
let humidity= data.main.humidity
console.log(humidity)

var container=document.getElementById(dec)
console.log(container)
var weather=document.createElement("div")
weather.innerHTML=`<p>Temperature : ${data.main.temp}</p>
<p>Windspeed: ${data.wind.speed}</p>
<p>Humidity : ${data.main.humidity}</p>`
container.after(weather) 
}
function previous (){
    let lis = document.getElementById('list').getElementsByTagName('li');
    for(var element of lis){
        if(element.classList.contains('active') && element.id !== '1'){
            getCountry(Number(element.id)-1);
        }
    }
}

function next (){
    let lis = document.getElementById('list').getElementsByTagName('li');
    for(var element of lis){
        if(element.classList.contains('active') && element.id !== '10'){
            getCountry(Number(element.id)+1);
        }
    }
}
getCountry(1)






