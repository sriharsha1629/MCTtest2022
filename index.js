
const api = {
    key: "6b37cb3b3ed2d2a302e8142e34329705",
    base: "https://api.openweathermap.org/data/2.5/weather?q=hyderabad&units=metric&appid=6b37cb3b3ed2d2a302e8142e34329705"
}


function setQuery(evt) {
        getResults(document.getElementsByClassName('input')[0].value);
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}
getWeatherData()
function getWeatherData () {
    
        

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=hyderabad&units=metric&appid=6b37cb3b3ed2d2a302e8142e34329705`).then(res => res.json()).then(data => {

        console.log(data);
        const city = data.name;
        const country = data.sys.country;
        const humidity = data.main.humidity;
        const temp = data.main.temp;
        const des = data.weather[0].description;
        const speed =data.wind.speed;
        
        document.getElementById("city").innerHTML = city;
        document.getElementById("county").innerHTML = "country " + country;
        document.getElementById("humidity").innerHTML =  "humidity " + humidity ;
        document.getElementById("temperature").innerHTML = "temp " + temp;
        document.getElementById("description").innerHTML = des;
        document.getElementById("speed").innerHTML = "speed  " + speed;
        showWeatherData(data);
        })


}
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;


data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}