import { useState, useMemo, useCallback } from 'react'
import '../App.css'
import WeatherCard from '../components/weathercard.jsx'
import WeatherDetails from '../components/weatherDetails.jsx' 
import { useNavigate } from 'react-router-dom'
import UnitSwitcher from '../components/UnitSwitcher.jsx'
import { searchAdnAddCity } from '../services/weatherService.jsx'

function HomePage({miasta, onAddCity, onRemoveCity}) {

  const [wybraneMiasto, setWybraneMiasto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [newCitySearch, setNewCitySearch] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const handleClick = useCallback((miasto) => {
    navigate(`/miasto/${miasto.id}`);
  }, []);

  const handleSearchNewCity = async() => {
    const cityExists = miasta.some(m => m.miasto?.toLowerCase() === newCitySearch.toLowerCase());
    if(cityExists){
      setSearchMessage('Miasto już istnieje na liście.');
      setNewCitySearch('');
      return;
    }
    try{
      setIsSearching(true);
      setSearchMessage('Wyszukiwanie...');
      const newCity = await searchAdnAddCity(newCitySearch);
      
      // Ponowne sprawdzenie po pobraniu z API
      const stillExists = miasta.some(m => m.miasto?.toLowerCase() === newCity.miasto?.toLowerCase());
      if(stillExists){
        setSearchMessage('Miasto już istnieje na liście.');
        setNewCitySearch('');
        return;
      }
      
      onAddCity(newCity);
      setSearchMessage(`Dodano miasto: ${newCity.miasto}`);
      setNewCitySearch('');
    }
    catch(error){
      setSearchMessage('Błąd: ' +  error.message);
    }
    finally{
      setIsSearching(false);
    }
  }

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
        <h3>Dodaj nowe miasto</h3>
        <input 
          type="text" 
          placeholder = 'Wpisz nazwę miasta'
          value={newCitySearch}
          onChange={(e) => setNewCitySearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearchNewCity();
          }}></input>
          <button
            onClick={handleSearchNewCity}
            disabled={isSearching}
          >
            {isSearching ? 'Szukam...' : 'Szukaj i dodaj'}
          </button>
      </div>
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
            <div key={dane.id}>
              <WeatherCard
                cityId={dane.id}    
                miasto={dane.miasto}
                temperatura={dane.temperatura}
                pogoda={dane.pogoda}
                wiatr={dane.wiatr}
                selected={wybraneMiasto && wybraneMiasto.miasto === dane.miasto}
                onClick={() => handleClick(dane)}
              />
              <button 
                onClick={() => onRemoveCity(dane.id)}
                style={{ marginTop: '0.5rem' }}
              >Usuń</button>
            </div>
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

