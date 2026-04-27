import * as React from "react";
import { getWeatherDescription } from "../utils/WeatherCodes";
import '../styles.css'

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
    });
}

function Forecast() {

    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [weather, setWeather] = React.useState(null);
    const [dailyForecast, setDailyForecast] = React.useState([]);


    async function handleSearch() {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setError("Please enter a city name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                trimmedQuery
             )}&count=1&language=en&format=json`
            );

            if (!geoResponse.ok) {
                throw new Error("Failed to fetch geocoding data.");
            }

            const geoData = await geoResponse.json();
            const location = geoData?.results?.[0];

            if (!location) {
                throw new Error("City not found. Please try another search.");
            }

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
            );

            if (!weatherResponse.ok) {
                throw new Error("Failed to fetch weather data.");
            }

            const weatherData = await weatherResponse.json();
            const current = weatherData.current;

            setWeather({
                city: location.name,
                region: location.admin1 || "",
                country: location.country || "",
                temperature: current.temperature_2m,
                unit: weatherData.current_units?.temperature_2m || "°C",
                condition: getWeatherDescription(current.weather_code),
            });

            const days = weatherData.daily?.time || [];
            const maxTemps = weatherData.daily?.temperature_2m_max || [];
            const minTemps = weatherData.daily?.temperature_2m_min || [];
            const codes = weatherData.daily?.weather_code || [];

            const forecast = days.slice(0, 3).map((date, i) => ({
                date,
                max: maxTemps[i],
                min: minTemps[i],
                condition: getWeatherDescription(codes[i]),
            }));

            setDailyForecast(forecast);
        } catch (err) {
            setWeather(null);
            setDailyForecast([]);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    function onKeyDwon(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <main>
            <section>
                <h2>Forecast</h2>
                <p>Check your cities weather</p>
            </section>
            
            <section>
                <input 
                type="text"
                placeholder='Enter city'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDwon}
                />
                <button type="button" onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </section>

            <section>
                <article>
                    <h3>Current Weather</h3>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!error && !weather && <p>Enter a city to see the weather.</p> }
                    {weather && (
                        <>
                            <p>
                                City: {weather.city}
                                {weather.region ? ', {weather.region}' : '' }
                                {weather.country ? ', {weather.country}' : ''}
                            </p>
                            <p>
                                Temperature: {weather.temperature}
                                {weather.unit} 
                            </p>
                            <p>Condition: {weather.condition}</p>
                        </>
                    )}
                </article>
                <article>
                    <h3>Upcoming Forecast</h3>
                    {dailyForecast.length === 0 ? (
                        <p>No forecast available yet.</p>
                    ) : (
                        dailyForecast.map((day) => (
                            <p key={day.date}>
                                {formatDate(day.date)} : {day.min}° / {day.max}° - {day.condition}
                            </p>
                        ))
                    )}
                </article>
                
            </section>
        </main>
    );
}

export default Forecast