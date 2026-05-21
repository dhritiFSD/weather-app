var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 1. Your core function to fetch weather data from the API
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = '5b45d36c02112f4d8dd510b1e513fe24'; // Ensure your real key is here!
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = yield fetch(url);
            // Safety Check 1: Handle key or city name errors gracefully
            if (!response.ok) {
                const errorText = yield response.text();
                console.log("Server responded with an error:", errorText);
                const cityElement = document.getElementById("cityName");
                if (cityElement) {
                    cityElement.innerText = "API Key not active yet or City not found.";
                }
                return;
            }
            const data = yield response.json();
            console.log("Success! Received Data:", data);
            // Safety Check 2: Update City Name
            const nameEl = document.getElementById("cityName");
            if (nameEl && data.name) {
                nameEl.innerText = data.name;
            }
            // Safety Check 3: Update Temperature
            const tempEl = document.getElementById("temperature");
            if (tempEl && data.main && data.main.temp !== undefined) {
                tempEl.innerText = `Temperature: ${data.main.temp} °C`;
            }
            // Safety Check 4: Update Description
            const descEl = document.getElementById("description");
            if (descEl && data.weather && data.weather[0] && data.weather[0].description) {
                descEl.innerText = `Weather: ${data.weather[0].description}`;
            }
            // Safety Check 5: Update Humidity
            const humidEl = document.getElementById("humidity");
            if (humidEl && data.main && data.main.humidity !== undefined) {
                humidEl.innerText = `Humidity: ${data.main.humidity}%`;
            }
        }
        catch (error) {
            console.error("Network or parsing error occurred:", error);
        }
    });
}
// ==========================================
// 2. PUT THE NEW CODE HERE (AT THE VERY BOTTOM)
// ==========================================
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
if (searchBtn && cityInput) {
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city); // This triggers the function above!
        }
        else {
            alert("Please enter a city name first!");
        }
    });
}
