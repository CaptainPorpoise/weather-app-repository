// ═══════════════════════════════════════════════════════════════ 
// PLIK: src/components/UnitSwitcher.jsx 
// OPIS: Komponent z selectem do wyboru jednostki temperatury 
// ═══════════════════════════════════════════════════════════════ 
 
import { useSelector, useDispatch } from 'react-redux'; 
// ↑ useSelector - odczytuje dane ze store 
// ↑ useDispatch - zwraca funkcję do wysyłania akcji 
 
import { setTemperatureUnit } from '../store/slices/settingsSlice'; 
// ↑ Importujemy akcję którą będziemy wysyłać 
 
function UnitSwitcher() { 
  // ───────────────────────────────────────────────────────────── 
  // ODCZYT ZE STORE 
  // useSelector przyjmuje funkcję która wybiera kawałek stanu 
  // state.settings.temperatureUnit = 'C' (lub 'F' lub 'K') 
  // ───────────────────────────────────────────────────────────── 
  const currentUnit = useSelector((state) => state.settings.temperatureUnit); 
   
  // ───────────────────────────────────────────────────────────── 
  // DISPATCH - funkcja do wysyłania akcji 
  // ───────────────────────────────────────────────────────────── 
  const dispatch = useDispatch(); 
 
  // ───────────────────────────────────────────────────────────── 
  // HANDLER - wywoływany gdy użytkownik zmieni select 
  // ───────────────────────────────────────────────────────────── 
  const handleChange = (e) => { 
    // e.target.value = nowa wartość wybrana w select (np. 'F') 
    // dispatch() wysyła akcję do store 
    // setTemperatureUnit('F') tworzy akcję: { type: 'settings/setTemperatureUnit', payload: 'F' } 
    dispatch(setTemperatureUnit(e.target.value)); 
  }; 
 
  // ───────────────────────────────────────────────────────────── 
  // RENDER 
  // ───────────────────────────────────────────────────────────── 
  return ( 
    <div className="unit-switcher"> 
      <label>Jednostka temperatury: </label> 
      <select value={currentUnit} onChange={handleChange}> 
        <option value="C">Celsjusz (°C)</option> 
        <option value="F">Fahrenheit (°F)</option> 
        <option value="K">Kelvin (K)</option> 
      </select> 
    </div> 
  ); 
} 
 
export default UnitSwitcher; 