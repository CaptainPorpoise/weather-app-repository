// ═══════════════════════════════════════════════════════════════ 
// PLIK: src/store/slices/favoritesSlice.js 
// OPIS: Slice odpowiedzialny za ulubione miasta 
// ═══════════════════════════════════════════════════════════════ 
 
import { createSlice } from '@reduxjs/toolkit'; 
 
// ─────────────────────────────────────────────────────────────── 
// STAN POCZĄTKOWY 
// favoriteIds to tablica z ID ulubionych miast 
// Przykład: [1, 3, 5] = Warszawa, Wrocław i Gdańsk są ulubione 
// ─────────────────────────────────────────────────────────────── 
const initialState = { 
  favoriteIds: [], 
}; 
 
const favoritesSlice = createSlice({ 
  name: 'favorites', 
  initialState, 
  reducers: { 
    // ───────────────────────────────────────────────────────── 
    // REDUCER: toggleFavorite 
    // Co robi: Dodaje miasto do ulubionych LUB usuwa je 
    //          (jeśli już było ulubione) 
    // Parametr: action.payload = ID miasta (liczba) 
    // ───────────────────────────────────────────────────────── 
    toggleFavorite: (state, action) => { 
      const cityId = action.payload;  // np. 1 (Warszawa) 
       
      // Szukamy czy to miasto już jest w ulubionych 
      const index = state.favoriteIds.indexOf(cityId); 
       
      if (index === -1) { 
        // indexOf zwraca -1 gdy nie znaleziono 
        // Czyli miasto NIE jest w ulubionych - dodajemy je 
        state.favoriteIds.push(cityId); 
      } else { 
        // Miasto JEST w ulubionych - usuwamy je 
        state.favoriteIds.splice(index, 1); 
      } 
    }, 
  }, 
}); 
 
export const { toggleFavorite } = favoritesSlice.actions; 
export default favoritesSlice.reducer; 