// ═══════════════════════════════════════════════════════════════ 
// PLIK: src/components/FavoriteButton.jsx 
// OPIS: Przycisk gwiazdki do dodawania/usuwania z ulubionych 
// ═══════════════════════════════════════════════════════════════ 
 
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleFavorite } from '../store/slices/favoritesSlice'; 
 
function FavoriteButton({ cityId }) { 
  // cityId to props - ID miasta (np. 1 dla Warszawy) 
   
  const dispatch = useDispatch(); 
   
  // Pobieramy tablicę ulubionych z Redux 
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds); 
   
  // Sprawdzamy czy TO miasto jest w ulubionych 
  const isFavorite = favoriteIds.includes(cityId); 
 
  const handleClick = (e) => { 
    // ───────────────────────────────────────────────────────── 
    // WAŻNE: stopPropagation()  
    // Bez tego kliknięcie w gwiazdkę kliknęłoby też w całą kartę 
    // i przeszlibyśmy do szczegółów miasta 
    // ───────────────────────────────────────────────────────── 
    e.stopPropagation(); 
     
    // Wysyłamy akcję toggle - doda lub usunie z ulubionych 
    dispatch(toggleFavorite(cityId)); 
  }; 
 
  return ( 
    <button  
      onClick={handleClick} 
      style={{  
        background: 'none',  
        border: 'none',  
        fontSize: '1.5rem', 
        cursor: 'pointer', 
        padding: '0.25rem' 
      }} 
      title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'} 
    > 
      {/* Pełna gwiazdka gdy ulubione, pusta gdy nie */} 
      {isFavorite ? '⭐' : '☆'} 
    </button> 
  ); 
} 
 
export default FavoriteButton; 