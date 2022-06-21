import { useSelector } from "react-redux";
import {getWeatherMap, getWeatherStatus, getWeatherError, getChosenTimeFrame} from "./WeatherSlice";
import WeatherDetail from "./WeatherDetail";
import WeatherDetailHour from "./WeatherDetailHour";
import WeatherDetailDay from "./WeatherDetailDay";

const WeatherList = ({ props }) => {
    console.log(props);
    let content = <p>...Loading</p>;
    let item = 0;

    const weatherState = useSelector(state => {
        console.log('state', state);
    })

    const weather = useSelector(getWeatherMap);
    const weatherStatus = useSelector(getWeatherStatus);
    const error = useSelector(getWeatherError);
    const chosenTimeframe = useSelector(getChosenTimeFrame);
    let timing = "";

    if (weatherStatus && weatherStatus === 'loading') {
        content = <p>...Loading</p>;
    } else if ( weatherStatus && weatherStatus === 'failed') {
        content = <p>{error}</p>;
    } else if(weatherStatus && weatherStatus === 'succeeded'){
        if(weather?.weather?.length>0){
            item = weather?.weather?.length-1;
        }
        if(weather?.weather[item]?.name){
            content = <WeatherDetail weather={weather?.weather[item]}/>;
            console.log(content);
        } else if (weather?.weather[item]?.hourly && weather?.weather[item]?.hourly.length>0){
            content = <WeatherDetailHour weather={weather?.weather[item]}/>;
            console.log(content);
        } else if (weather?.weather[item]?.daily && weather?.weather[item]?.daily.length>0){
            content = <WeatherDetailDay weather={weather?.weather[item]} days={props.timeFrame}/>;
            console.log(content);
        }
    }


    return (
        <div>
            {content}
        </div>
    )
}
export default WeatherList
