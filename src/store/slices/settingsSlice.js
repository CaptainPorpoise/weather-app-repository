// ═══════════════════════════════════════════════════════════════ 
// PLIK: src/store/slices/settingsSlice.js 
// OPIS: Slice odpowiedzialny za ustawienia aplikacji (jednostki temperatury) 
// ═══════════════════════════════════════════════════════════════ 
 
import { createSlice } from '@reduxjs/toolkit'; 
// ↑ createSlice to funkcja z Redux Toolkit, która tworzy slice 
 
// ─────────────────────────────────────────────────────────────── 
// STAN POCZĄTKOWY 
// To jest stan który będzie na starcie aplikacji 
// ─────────────────────────────────────────────────────────────── 
const initialState = { 
  temperatureUnit: 'C',  // Możliwe wartości: 'C', 'F', 'K' 
}; 
 
// ─────────────────────────────────────────────────────────────── 
// TWORZENIE SLICE'A 
// ─────────────────────────────────────────────────────────────── 
const settingsSlice = createSlice({ 
  name: 'settings',      // Nazwa slice'a (widoczna w Redux DevTools) 
  initialState,          // Stan początkowy (zdefiniowany wyżej) 
  reducers: { 
    // ───────────────────────────────────────────────────────── 
    // REDUCER: setTemperatureUnit 
    // Co robi: Zmienia jednostkę temperatury 
    // Kiedy wywoływany: Gdy użytkownik wybierze inną jednostkę w select 
    // ───────────────────────────────────────────────────────── 
    setTemperatureUnit: (state, action) => { 
      // state = aktualny stan (np. { temperatureUnit: 'C' }) 
      // action.payload = nowa wartość przekazana przy wywołaniu (np. 'F') 
      state.temperatureUnit = action.payload; 
    }, 
  }, 
}); 
 
// ─────────────────────────────────────────────────────────────── 
// EKSPORTY 
// ─────────────────────────────────────────────────────────────── 
 
// Eksportujemy AKCJĘ - użyjemy jej z dispatch() w komponentach 
// Przykład użycia: dispatch(setTemperatureUnit('F')) 
export const { setTemperatureUnit } = settingsSlice.actions; 
 
// Eksportujemy REDUCER - potrzebny do konfiguracji store 
export default settingsSlice.reducer; 