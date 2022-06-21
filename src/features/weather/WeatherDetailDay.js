const lightTheme = {
    link: '#00000066',
    label: '#00000066'
}

const WeatherDetailDay = ({ weather, days }) => {
    console.log('weather days', weather, days);
    if(days === 'daysTwo'){
        days = 2;
    }else{
        days = 7;
    }
    const forecastEnum = 'now';
    const temperaturemeasure = 'Celcius';
    const pressuremeasure = 'mbar';
    const dateT = new Date(Number(weather?.daily[days]?.dt)*1000);
    let linkColour = lightTheme.link;
    let labelColour = lightTheme.label;
    return (
        <div className="custom-weather-forecast">
            <h1>
                <a href="/weather" style={{color: linkColour}}>{days} day Forecast</a>
            </h1>
            <div className="sub-head">
                <div id="dateTime">{dateT.toLocaleString()}</div>
                <div id="country">{weather?.timezone}</div>
            </div>
            <div className="info-bar">
                <div id="description">{weather?.daily[days]?.weather[0]?.description}</div>
                <div id="icon">
                    <img src={'http://openweathermap.org/img/w/' + weather?.daily[days]?.weather[0]?.icon + '.png'} alt="Weather icon" />
                </div>
            </div>
            <div className="content">
                <label className="min" style={{color: labelColour}}>Min:</label>
                <div className="content-div" id="min">{weather?.daily[days]?.temp.min}&deg;{temperaturemeasure}</div>
                <label className="min" style={{color: labelColour}}>Max:</label>
                <div className="content-div" id="min">{weather?.daily[days]?.temp.max}&deg;{temperaturemeasure}</div>
                <label className="pressure" style={{color: labelColour}}>Pressure:</label>
                <div className="content-div" id="pressure"> {weather?.daily[days]?.pressure} {pressuremeasure} </div>
                <label className="humidity" style={{color: labelColour}}>Humidity:</label>
                <div className="content-div" id="humidity">{weather?.daily[days]?.humidity}%</div>
                <label className="wind-speed" style={{color: labelColour}}>Wind Speed:</label>
                <div className="content-div" id="wind-speed">{weather?.daily[days]?.wind_speed}knots</div>
            </div>
        </div>
    )
}
export default WeatherDetailDay
