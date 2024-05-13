
document.getElementById('search').addEventListener('click', function() {
    var city = document.getElementById('city').value;
    clearForecast();
    fetchCurrentWeather(city);
    fetchForecast(city);
    clearSearch(city);
    saveToLocalStorage(city);
    var ulElement = document.querySelector('.searchHistory ul');
    var newListItem = document.createElement('li');
    newListItem.textContent = city;
    ulElement.appendChild(newListItem);

});

function clearForecast() {
    var forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = ''; // Clear forecast section
}
function clearSearch(city) {
    document.getElementById('city').value = '';
}

function saveToLocalStorage(city) {
    localStorage.setItem('lastSearchedCity', city);
}

function fetchCurrentWeather(city) {
    var apiKey = '2b4d3eda7ae46f2ec2eab836e563b3a3';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            console.log(data);
        });
}


function fetchForecast(city) {
    var apiKey = '2b4d3eda7ae46f2ec2eab836e563b3a3';
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        });
}

function displayCurrentWeather(data) {
    var weatherSections = document.getElementsByClassName('cardBlock');
    for (var i = 0; i < weatherSections.length; i++) {
        weatherSections[i].innerHTML = `
            <h2>City: ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°F</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

function displayForecast(data) {
    var forecastSection = document.getElementById('forecast');
    for (let i = 0; i < data.list.length; i += 8) {
        var dayData = data.list[i];
        var forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <h3>${new Date(dayData.dt_txt).toDateString()}</h3>
            <p>Temp: ${dayData.main.temp}°F</p>
            <p>Humidity: ${dayData.main.humidity}%</p>
            <p>Wind Speed: ${dayData.wind.speed} m/s</p>
        `;
        forecastSection.appendChild(forecastItem);
    }
}