// ═══════════════════════════════════════════════════════════════ 
// PLIK: src/utils/temperature.js 
// OPIS: Funkcje pomocnicze do przeliczania temperatury 
// ═══════════════════════════════════════════════════════════════ 
 
// ─────────────────────────────────────────────────────────────── 
// FUNKCJA: convertTemperature 
// Co robi: Przelicza temperaturę z Celsjusza na wybraną jednostkę 
// Parametry: 
//   - celsius: liczba (temperatura w °C) 
//   - unit: string ('C', 'F' lub 'K') 
// Zwraca: liczbę (przeliczona temperatura) 
// ─────────────────────────────────────────────────────────────── 
export function convertTemperature(celsius, unit) { 
  switch (unit) { 
    case 'F': 
      // Wzór: °F = °C × 9/5 + 32 
      return Math.round((celsius * 9/5) + 32); 
    case 'K': 
      // Wzór: K = °C + 273.15 
      return Math.round(celsius + 273.15); 
    case 'C': 
    default: 
      // Celsjusz - zwracamy bez zmian 
      return celsius; 
  } 
} 
 
// ─────────────────────────────────────────────────────────────── 
// FUNKCJA: getUnitSymbol 
// Co robi: Zwraca symbol jednostki do wyświetlenia 
// Parametry: 
//   - unit: string ('C', 'F' lub 'K') 
// Zwraca: string (np. '°C', '°F', 'K') 
// ─────────────────────────────────────────────────────────────── 
export function getUnitSymbol(unit) { 
  switch (unit) { 
    case 'F': return '°F'; 
    case 'K': return 'K'; 
    case 'C': 
    default: return '°C'; 
  } 
} 