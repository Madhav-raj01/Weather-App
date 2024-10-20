const apiKey = '8a535857b1ed7362579affa3d64fa60a'; // Replace with your OpenWeatherMap API key
const weatherResult = document.getElementById('weatherResult');
const container = document.querySelector('.container');

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                weatherResult.innerHTML = `<p>${error.message}</p>`;
                resetBackground();
            });
    } else {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        resetBackground();
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    
    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Condition: ${description}</p>
        <p>Humidity: ${humidity}%</p>
    `;

    updateBackground(description);
}

function updateBackground(condition) {
    if (condition.includes("clear")) {
        document.body.style.background = "linear-gradient(to bottom, #87CEEB, #B0E0E6)";
    } else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(to bottom, #B0C4DE, #4682B4)";
    } else if (condition.includes("rain")) {
        document.body.style.background = "linear-gradient(to bottom, #A9A9A9, #696969)";
    } else {
        document.body.style.background = "linear-gradient(to bottom, #4a90e2, #d9e3f0)";
    }
}

function resetBackground() {
    document.body.style.background = "linear-gradient(to bottom, #4a90e2, #d9e3f0)";
}
