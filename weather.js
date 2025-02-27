const apikey = "fba18511f6f74436ee1b6b7c15e63664";

const weatherDataEl = document.getElementById('weather-data');
const cityInputEl = document.querySelector('.city-input');
const formEl = document.querySelector('form');

formEl.addEventListener("submit", (event)=>{
 event.preventDefault();
 const cityValue = cityInputEl.value;
 getWeatherData(cityValue);
 
});

async function getWeatherData(cityValue){
   try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
  
    if(!response.ok){
        throw new Error("Notwork respose was not ok");

    }
   
    const data = await response.json();
  
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    console.log(data);
  
    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
    ];


    weatherDataEl.querySelector(".icon").innerHTML= `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weatherIcon">`;
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;
   
    weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail} </div>`).join("");
    } catch (error) {
       
    }
   
}

