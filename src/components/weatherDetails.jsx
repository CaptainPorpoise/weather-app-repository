import WeatherIcon from './WeatherIcon' 
// ↓↓↓ NOWE IMPORTY ↓↓↓ 
import { useSelector } from 'react-redux'; 
import { convertTemperature, getUnitSymbol } from '../utils/temperature'; 
// ↑↑↑ KONIEC NOWYCH IMPORTÓW ↑↑↑ 
 
function WeatherDetails({ miasto }){ 
    // ↓↓↓ NOWE: Odczytujemy jednostkę z Redux ↓↓↓ 
    // UWAGA: To musi być PRZED if(!miasto) return null; 
    const unit = useSelector((state) => state.settings.temperatureUnit); 
    const unitSymbol = getUnitSymbol(unit); 
    // ↑↑↑ KONIEC NOWEGO ↑↑↑ 
 
    if(!miasto) return null; 

    return(
        <div className="card details-panel">
          <h2>Szczegóły pogody dla {miasto.miasto}</h2>
          <div className="details-row">
            <div className="details-item"> 
              <strong>Temperatura:</strong> 
              {/* ↓↓↓ ZMIENIONE ↓↓↓ */} 
              <div>{convertTemperature(miasto.temperatura, unit)}{unitSymbol}</div> 
              {/* BYŁO: <div>{miasto.aktualnaTemperatura} °C</div> */} 
            </div> 
            <div>
              <WeatherIcon condition={miasto.pogoda} size="large"></WeatherIcon>
            </div>
            <div className="details-item">
              <strong>Warunki:</strong>
              <div>{miasto.pogoda}</div>
            </div>
            <div className="details-item">
              <strong>Wiatr:</strong>
              <div>{miasto.wiatr}</div>
            </div>
            <div className="details-item">
              <strong>Kierunek Wiatru:</strong>
              <div>{miasto.kierunekWiatru}</div>
            </div>
            <div className="details-item">
              <strong>Zachmurzenie:</strong>
              <div>{miasto.zachmurzenie}</div>
            </div>
          </div>
          {Array.isArray(miasto.prognoza5dni) && (
            <div className="forecast-section">
              <h3>5-dniowa prognoza</h3>
              <div className="forecast-row">
                {miasto.prognoza5dni.map((dzień, idx) => (
                  <div className="forecast-day" key={idx}>
                     <div>
                      <WeatherIcon condition={dzień.pogoda} size="medium"></WeatherIcon>
                    </div>
                    <div className="details-item"><strong>{dzień.dzień}</strong></div>
                    <div className="details-item"> 
                      Temperatura: {convertTemperature(dzień.temperatura, unit)}{unitSymbol} 
                    </div>
                    {dzień.kierunekWiatru && <div className="details-item">Kierunek wiatru: {dzień.kierunekWiatru}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    )
}

export default WeatherDetails;
