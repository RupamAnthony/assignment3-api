// Name- Rupam Anthony Roy
// ID- 2120554 

function process() {
    var searchCountry = document.getElementById("searchbox").value;
    document.getElementById("searchbox").value = "";

    var countryUrl = `https://restcountries.com/v3.1/name/${searchCountry}`;

    fetch(countryUrl)
        .then(res => res.json())
        .then(data => {displayCountryDetails(data)
            showWeatherButton(searchCountry)})     
}

function displayCountryDetails(items) {
    var oldContent = document.getElementById("container");
    oldContent.textContent = "";

    for (var r = 0; r < items.length; r++) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = `<img src="${items[0].flags.png}">  <br>
                            Name: <b>${items[0].name.common}</b> <br>
                            Capital City: ${items[0].capital} <br>
                            Region: ${items[0].region} <br>
                            Population: ${items[0].population} <br>
                            Area: ${items[0].area}`;

        newDiv.classList.add("innerStyle");
        oldContent.appendChild(newDiv);
    }
}

function showWeatherButton(searchCountry) {
    var weatherButton = document.createElement("button");
    weatherButton.textContent = "Get Weather";
    weatherButton.onclick = function() {
        getWeatherDetails(searchCountry);
    };
    document.getElementById("container").appendChild(weatherButton);
}

function getWeatherDetails(searchCountry) {
   
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCountry}&appid=03ce3a87393141e5bedac4b525929a88`;

    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {displayWeatherDetails(data)})
}

function displayWeatherDetails(data) {
    var weatherContainer = document.createElement("div");

        var cityName = data.city.name;
        var countryName = data.city.country;
        var description = data.list[0].weather[0].description;
        var temperature = (data.list[0].main.temp - 273.15).toFixed(2);
        var humidity = data.list[0].main.humidity;
        var windSpeed = data.list[0].wind.speed;

        weatherContainer.innerHTML = `<h3>Weather in ${cityName}, ${countryName}</h3>
                                      <p>Description: ${description}</p>
                                      <p>Temperature: ${temperature}°C</p>
                                      <p>Humidity: ${humidity}%</p>
                                      <p>Wind Speed: ${windSpeed} m/s</p>`;

    document.getElementById("container").appendChild(weatherContainer);
}
