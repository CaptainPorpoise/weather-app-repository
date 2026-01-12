import { useState, useEffect, useMemo, useCallback } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { getWeatherForCities, getForect } from './services/weatherService.jsx'
import {transformCurrentWeather, transformForecast} from './utils/weatherTransform.jsx'
import './App.css'
import miasta from './data/weatherdata.jsx'
import HomePage from './Pages/HomePage.jsx'
import CityDetailPage from './Pages/CityDetailPage.jsx'
import FavoritesPage from './Pages/FavoritesPage.jsx'

const CITIES = ['Warszawa', 'Kraków', 'Wrocław', 'Łódź', 'Gdańsk'];
 

function App() {

  const [wszystkieMiasta, setWszystkieMiasta] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Pobieraniedanych...");

        const currentWeatherData = await getWeatherForCities(CITIES);
        console.log("Dane pobrane:", currentWeatherData);
        const transformCities = currentWeatherData.map(transformCurrentWeather);
        console.log(transformCities);
        const citiesWithForecast = await Promise.all(
          transformCities.map(async (city, index) => {
            const forecastData = await getForect(CITIES[index]);
            const forecast = transformForecast(forecastData);
            return {
              ...city,
              prognoza5dni: forecast,
            };
          })
        );
        console.log(citiesWithForecast);
        setWszystkieMiasta(citiesWithForecast);

      }
      catch(err){
        console.error("Błąd podczas pobierania danych:", err);
      }
      finally{
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if(loading){
    return( <div className = "app-title">
              Ładowanie danych pogodowych...
            </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<HomePage miasta={miasta}/>}></Route>
          <Route path = "/miasto/:cityId" element = {<CityDetailPage miasta={miasta}/>}></Route>
          <Route path = "/ulubione" element = {<FavoritesPage miasta={miasta}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
