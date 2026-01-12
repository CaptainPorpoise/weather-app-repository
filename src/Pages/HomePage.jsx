import { useState, useMemo, useCallback } from 'react'
import '../App.css'
import WeatherCard from '../components/weathercard.jsx'
import WeatherDetails from '../components/weatherDetails.jsx' 
import { useNavigate } from 'react-router-dom'
import UnitSwitcher from '../components/UnitSwitcher.jsx'

function HomePage({miasta}) {

  const [wybraneMiasto, setWybraneMiasto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleClick = useCallback((miasto) => {
    navigate(`/miasto/${miasto.id}`);
  }, []);

  const filteredMiasta = useMemo(() => 
    {
      return miasta.filter(miasto =>
        miasto.miasto.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [miasta, searchTerm]);


  return (
    <>
      <h1 className="app-title">Pogoda</h1>
      <button onClick={() => navigate('/ulubione')} style={{ marginBottom: '1rem' }}>
        Przejdź do ulubionych ⭐
      </button>
      <UnitSwitcher />
      <div>
        <input
          type="text"
          placeholder="Wyszukaj miasto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
      <div className="cities-row">
        {filteredMiasta.map((dane) => {
          return (
            <WeatherCard
              key={dane.id}
              cityId={dane.id}    
              miasto={dane.miasto}
              temperatura={dane.temperatura}
              pogoda={dane.pogoda}
              wiatr={dane.wiatr}
              selected={wybraneMiasto && wybraneMiasto.miasto === dane.miasto}
              onClick={() => handleClick(dane)}
            />
          )
        })}
      </div>

      {wybraneMiasto && (
        <WeatherDetails miasto={wybraneMiasto} />
      )}
    </>
  )
}

export default HomePage
