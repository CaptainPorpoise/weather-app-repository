import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../config/api';
import { transformCurrentWeather, transformForecast } from '../utils/weatherTransform';

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

export const getForecast = async(miasto) => {
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

export const searchAdnAddCity = async(cityName) => {
    try {
        const {transformCurrentWeather, transformForecast} = await import('../utils/weatherTransform.jsx');
        const currentWeatherData = await getCurrentWeather(cityName);
        const cityData = transformCurrentWeather(currentWeatherData);
        const forecastData = await getForecast(cityName);
        const forecast = transformForecast(forecastData);
        return {
            ...cityData,
            prognoza5dni: forecast,
        };
    }
    catch (error) {
        if(error.response && error.response.status === 404) {
            throw new Error('Miasto nie znalezione');
        }
        throw new Error('Błąd podczas dodawania miasta');
    }
}