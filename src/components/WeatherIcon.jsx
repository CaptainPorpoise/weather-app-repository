function WeatherIcon({ condition, size = 'medium' }) {
    const normalize = (s) =>
        s
            ? String(s)
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim()
            : '';

    const getConditionString = (c) => {
        if (c == null) return '';
        if (typeof c === 'object') {
            if (typeof c.main === 'string') return c.main;
            if (typeof c.description === 'string') return c.description;
            if (c.weather && Array.isArray(c.weather) && c.weather[0]) {
                return c.weather[0].main || c.weather[0].description || '';
            }
            try {
                return JSON.stringify(c);
            } catch (e) {
                return String(c);
            }
        }
        return String(c);
    };

    const weatherIcon = {
        slonecznie: '☀️',
        pochmurno: '☁️',
        deszczowo: '🌧️',
        deszcz: '🌧️',
        burza: '⛈️',
        snieg: '❄️',
        mgla: '🌫️',
        wiatr: '💨',
        'czesciowo slonecznie': '⛅',
        zachmurzenie: '☁️',
        grad: '🌨️',
        'lekki deszcz': '🌦️',
    };

    const sizes = {
        small: '1rem',
        medium: '2rem',
        large: '3rem',
    };

    const raw = getConditionString(condition);
    const normalized = normalize(raw);
    const icon = weatherIcon[normalized] || '❓';

    if (icon === '❓') {
        // eslint-disable-next-line no-console
        console.warn('WeatherIcon: unknown condition', { raw, normalized, type: typeof condition });
    }

    return <span style={{ fontSize: sizes[size] }}>{icon}</span>;
}

export default WeatherIcon;