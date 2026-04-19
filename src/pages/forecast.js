import useState from 'react';

const weatherCodeMap = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

function getWeatherDescription(code) {
    return weatherCodeMap[code] || 'Unknown weather condition';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
    });
}

function Forecast() {
    return (
        <main>
            <section>
                <h2>Forecast</h2>
                <p>Check your cities weather</p>
                <p>Search location to view current weather.</p>
            </section>

            <section>
                <div>
                    <input type="text" placeholder="Enter city" />
                    <button>Search</button>
                </div>
            </section>


            {/* Values hard coded until search engine works */}
            <section>
                <article>
                    <h3>Current Weather</h3>
                    <p>City:--</p>
                    <p>Temperature: --</p>
                    <p>Condition: --</p>
                </article>

                <article>
                    <h3>Upcoming Forecast</h3>
                    <p>No forecast panel yet until search yabba dabba doo</p>
                </article>
            </section>
        </main>
    );
}

export default Forecast