import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../features/weather/WeatherSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer
    }
})
