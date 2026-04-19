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