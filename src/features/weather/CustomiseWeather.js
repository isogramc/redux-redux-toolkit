import { useDispatch, useSelector } from "react-redux";
import WeatherList from "./WeatherList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWeather } from "./WeatherSlice";

const CustomiseWeather = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [timeFrame, setTimeFrame] = useState('now');
    const [city, setCity] = useState('Paris');
    const [newRequestStatus, setNewRequestStatus] = useState('idle')
    const [props, setProps] = useState({})
    let data = {};

    const handleSubmit=(e)=>{
        e.preventDefault();

        try {
            setNewRequestStatus('pending')
            data = {timeFrame:timeFrame, location:city}
            setProps({timeFrame:timeFrame, location:city})
            dispatch(fetchWeather(data));
            setCity('')
            setTimeFrame('')
            navigate('/')
        } catch (err) {
            console.error('Failed to make new request', err)
        } finally {
            setNewRequestStatus('idle')
        }
    }

    return (
        <div>
            <div className='weather-forecast-top'>
                <div className="weather-forecast">
                    <h1>Customise your weather forecast</h1>
                    <form className="weather-forecast-form" onSubmit={handleSubmit}>
                        <label htmlFor="time-frame">Select Time:</label>
                        <select name="time-frame" onChange={(e) => setTimeFrame(e.target.value)}>
                            <option value="now">Select</option>
                            <option value="now">Now</option>
                            <option value="hour">1 hour</option>
                            <option value="daysTwo">2 days</option>
                            <option value="daysSeven">7 days</option>
                        </select>
                        <label htmlFor="city">Forecast City:</label>
                        <input name="city" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                        <input className="forecast-button" type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
            <WeatherList props={props}/>
        </div>
    )
}
export default CustomiseWeather
