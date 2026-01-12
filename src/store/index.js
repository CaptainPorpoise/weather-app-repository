// ═══════════════════════════════════════════════════════════════ 
// PLIK: src/store/index.js 
// OPIS: Główny store Redux - "magazyn" całego stanu aplikacji 
// ═══════════════════════════════════════════════════════════════ 
 
import { configureStore } from '@reduxjs/toolkit'; 
// ↑ configureStore tworzy store z dobrymi domyślnymi ustawieniami 
import favoritesReducer from './slices/favoritesSlice'; 
import settingsReducer from './slices/settingsSlice'; 
// ↑ Importujemy reducer z naszego slice'a 
 
// ─────────────────────────────────────────────────────────────── 
// KONFIGURACJA STORE 
// ─────────────────────────────────────────────────────────────── 


const loadState = () => {
    try {
        const serializedState = localStorage.getItem('weatherAppState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Błąd podczas ładowania stanu z localStorage:", err);
        return undefined;
    }

};

const saveState = (state) => {
    try {
        const stateToSave = {
            settings: state.settings,
            favorites: state.favorites,

        };
        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem('weatherAppState', serializedState);
    } catch(err) {
        console.error("Błąd zapisu: ", err);
    
    }
};
 
const preloadedState = loadState();

const store = configureStore({ 
  reducer: { 
    // Klucz 'settings' = jak będziemy się odwoływać do tego stanu 
    // Wartość = reducer który obsługuje ten fragment stanu 
    settings: settingsReducer,
    favorites: favoritesReducer, 
  }, 
  preloadedState,
}); 
// Stan w STORE będzie wyglądał tak: 
// { 
//   settings: { 
//     temperatureUnit: 'C' 
//   } 
// } 
store.subscribe(() => {
    saveState(store.getState());
}); 

export default store; 