const lightTheme = {
    link: '#00000066',
    label: '#00000066'
}

const WeatherDetailHour = ({ weather }) => {
    console.log(weather);
    const forecastEnum = 'now';
    const temperaturemeasure = 'Celcius';
    const pressuremeasure = 'mbar';
    const dateT = new Date(Number(weather?.hourly[2]?.dt)*1000);
    let linkColour = lightTheme.link;
    let labelColour = lightTheme.label;
    return (
        <div className="custom-weather-forecast">
            <h1>
                <a href="/weather" style={{color: linkColour}}>Weather in an hour...</a>
            </h1>
            <div className="sub-head">
                <div id="dateTime">{dateT.toLocaleString()}</div>
                <div id="country">{weather?.timezone}</div>
            </div>
            <div className="info-bar">
                <div id="description">{weather?.hourly[2]?.weather[0]?.description}</div>
                <div id="icon">
                    <img src={'http://openweathermap.org/img/w/' + weather?.hourly[2]?.weather[0]?.icon + '.png'} alt="Weather icon" />
                </div>
            </div>
            <div className="content">
                <label className="min" style={{color: labelColour}}>Min:</label>
                <div className="content-div" id="min">{weather?.hourly[2]?.temp}&deg;{temperaturemeasure}</div>
                <label className="min" style={{color: labelColour}}>Visibility:</label>
                <div className="content-div" id="min">{weather?.hourly[2]?.visibility}&deg;m</div>
                <label className="pressure" style={{color: labelColour}}>Pressure:</label>
                <div className="content-div" id="pressure"> {weather?.hourly[2]?.pressure} {pressuremeasure} </div>
                <label className="humidity" style={{color: labelColour}}>Humidity:</label>
                <div className="content-div" id="humidity">{weather?.hourly[2]?.humidity}%</div>
                <label className="wind-speed" style={{color: labelColour}}>Wind Speed:</label>
                <div className="content-div" id="wind-speed">{weather?.hourly[2]?.wind_speed}knots</div>
            </div>
        </div>
    )
}
export default WeatherDetailHour
