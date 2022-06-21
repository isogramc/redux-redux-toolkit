const lightTheme = {
    link: '#00000066',
    label: '#00000066'
}

const WeatherDetail = ({ weather }) => {
    console.log(weather);
    const forecastEnum = 'now';
    const temperaturemeasure = 'Celcius';
    const pressuremeasure = 'mbar';
    const dateT = new Date(Number(weather?.dt)*1000);
    let linkColour = lightTheme.link;
    let labelColour = lightTheme.label;
    return (
        <div className="custom-weather-forecast">
            <h1>
                <a href="/weather" style={{color: linkColour}}>Today's Weather</a>
            </h1>
            <div className="sub-head">
                <div id="dateTime">{dateT.toLocaleString()}</div>
                <div id="country">{weather?.name}, {weather?.sys?.country}</div>
            </div>
            <div className="info-bar">
                <div id="description">{weather?.weather[0]?.description}</div>
                <div id="icon">
                    <img src={'http://openweathermap.org/img/w/' + weather?.weather[0]?.icon + '.png'} alt="Weather icon" />
                </div>
            </div>
            <div className="content">
                <label className="min" style={{color: labelColour}}>Min:</label>
                <div className="content-div" id="min">{weather?.main?.temp_min}&deg;{temperaturemeasure}</div>
                <label className="max" style={{color: labelColour}}>Max:</label>
                <div className="content-div" id="max">{weather?.main?.temp_max}&deg;{temperaturemeasure}</div>
                <label className="pressure" style={{color: labelColour}}>Pressure:</label>
                <div className="content-div" id="pressure"> {weather?.main?.pressure} {pressuremeasure} </div>
                <label className="humidity" style={{color: labelColour}}>Humidity:</label>
                <div className="content-div" id="humidity">{weather?.main?.humidity}%</div>
                <label className="wind-speed" style={{color: labelColour}}>Wind Speed:</label>
                <div className="content-div" id="wind-speed">{weather?.wind?.speed}knots</div>
            </div>
        </div>
    )
}
export default WeatherDetail
