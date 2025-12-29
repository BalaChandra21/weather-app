const API_KEY = "6218bc03419e7610b8ee12754c6e1ad8";

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    const weatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const main = data.weather[0].main;
            const icon = data.weather[0].icon;
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            document.getElementById("city").innerText = city.toUpperCase();
            document.getElementById("temp").innerText = `🌡 Temperature: ${temp}°C`;
            document.getElementById("desc").innerText = desc;
            document.getElementById("emoji").innerText = getEmoji(main);
            document.getElementById("dayNight").innerText =
                icon.endsWith("d") ? "🌞 Day" : "🌙 Night";

            getAQI(lat, lon);
        });
}

function getAQI(lat, lon) {
    const aqiURL =
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(aqiURL)
        .then(response => response.json())
        .then(data => {
            const aqi = data.list[0].main.aqi;
            document.getElementById("aqi").innerText = `🌫 AQI: ${aqi}`;
        });
}

function getEmoji(condition) {
    switch (condition) {
        case "Clear": return "☀️";
        case "Clouds": return "☁️";
        case "Rain": return "🌧";
        case "Drizzle": return "🌦";
        case "Thunderstorm": return "⛈";
        case "Snow": return "❄️";
        case "Mist":
        case "Haze": return "🌫";
        default: return "🌍";
    }
}
