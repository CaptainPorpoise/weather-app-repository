import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../config/api';

const weatherApi = axios.create({
    baseURL: API_BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric',
        lang: 'pl',
    },
});

export const getCurrentWeather = async(miasto) => {
    const response = await weatherApi.get('/weather', {
        params: {
            q: miasto,
        },
    });
    return response.data;
}

export const getForect = async(miasto) => {
    const response = await weatherApi.get('/forecast', {
        params: { 
            q: miasto, 
        },
    });
    return response.data;
}
export const getWeatherForCities = async(miasta) => {
    const promises = miasta.map(miasto => getCurrentWeather(miasto));
    return Promise.all(promises);
};