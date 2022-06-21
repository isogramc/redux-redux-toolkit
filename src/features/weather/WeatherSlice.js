import {createSlice, createAsyncThunk, nanoid} from "@reduxjs/toolkit";
import axios from "axios";
import config from "./../../wmconfig.json";

const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const WEATHER_URL_HOUR_DAYS = 'https://api.openweathermap.org/data/2.5/onecall';
const LOCATION_DATA = 'http://api.positionstack.com/v1/forward';

const initialState = {
    weather: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    chosenTimeFrame: '', //'hour' | daysTwo | daysSeven
    error: null
}


export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (data) => {

    console.log('data', data, data?.timeFrame, data?.location);
    let datax;
    let locationQ = "";
    let timeFrameQ = "";
    let WEATHERURL = "";
    let newParams = {};
    data?.location?(locationQ=data?.location):(locationQ="Paris");
    data?.timeFrame?(timeFrameQ=data?.timeFrame):(timeFrameQ="now");
    console.log(locationQ, timeFrameQ);

    try{
        const first = await axios.get(LOCATION_DATA, {
            params: {
                query: locationQ,
                access_key: config["api-key_positionstack"]
            }
        });
        const res = first.data;

        switch(data?.timeFrame){
            case "now":
                WEATHERURL = WEATHER_URL;
                newParams = {
                    lat: res?.data[0]?.latitude,
                    lon: res?.data[0]?.longitude,
                    units: 'metric',
                    lang: 'en',
                    APPID: config["api-key_openweathermap"]
                }
                break;
            case "hour":
                WEATHERURL = WEATHER_URL_HOUR_DAYS;
                newParams = {
                    lat: res?.data[0]?.latitude,
                    lon: res?.data[0]?.longitude,
                    units: 'metric',
                    lang: 'en',
                    exclude: 'daily,minutely',
                    APPID: config["api-key_openweathermap"]
                }
                break;
            case "daysTwo":
                WEATHERURL = WEATHER_URL_HOUR_DAYS;
                newParams = {
                    lat: res?.data[0]?.latitude,
                    lon: res?.data[0]?.longitude,
                    units: 'metric',
                    lang: 'en',
                    exclude: 'hourly,minutely',
                    APPID: config["api-key_openweathermap"]
                }
                break;
            case "daysSeven":
                WEATHERURL = WEATHER_URL_HOUR_DAYS;
                newParams = {
                    lat: res?.data[0]?.latitude,
                    lon: res?.data[0]?.longitude,
                    units: 'metric',
                    lang: 'en',
                    exclude: 'hourly,minutely',
                    APPID: config["api-key_openweathermap"]
                }
                break;
            default:
                WEATHERURL = WEATHER_URL;
                newParams = {
                    lat: res?.data[0]?.latitude,
                    lon: res?.data[0]?.longitude,
                    units: 'metric',
                    lang: 'en',
                    APPID: config["api-key_openweathermap"]
                }
                break;
        }
            console.log('lat', res?.data[0]?.latitude,
                'lon', res?.data[0]?.longitude);

            const second = await axios.get(WEATHERURL, {
                params: newParams
            });
            datax = (await second.data);
            console.log('data-------------->', datax);
            return datax;
    }
    catch(err){
        console.log(err);
    }

})

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateTimeFrameSelectedHour: {
            reducer(state, action) {
                state.chosenTimeFrame = 'hour'
                state.weather.push(action.payload)
            }
        },
        updateTimeFrameSelectedDayTwo: {
            reducer(state, action) {
                state.chosenTimeFrame = 'dayTwo'
                state.weather.push(action.payload)
            }
        },
        updateTimeFrameSelectedDaySeven: {
            reducer(state, action) {
                state.chosenTimeFrame = 'daySeven'
                state.weather.push(action.payload)
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeather.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log('action payload', action.payload)
                state.weather.push(action.payload);
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getWeatherMap = (state) => state.weather;
export const getWeatherStatus = (state) => state.weather.status;
export const getWeatherError = (state) => state.weather.error;
export const getChosenTimeFrame = (state) => state.weather.chosenTimeFrame;

export const {updateTimeFrameSelectedHour, updateTimeFrameSelectedDayTwo, updateTimeFrameSelectedDaySeven} = weatherSlice.actions

export default weatherSlice.reducer
