function WeatherIcon({condition, size = "medium"})
{
    const weatherIcon = {
        "słonecznie": "☀️",
        "pochmurno": "☁️",
        "deszczowo": "🌧️",
        "burza": "⛈️",
        "śnieg": "❄️",
        "mgła": "🌫️",
        "wiatr": "💨",
        "Częściowo słonecznie": "⛅",
        "Zachmurzenie": "☁️",
        "Grad": "🌨️",
        "Lekki deszcz": "🌦️"
    };

    const sizes = {
        small: "1rem",
        medium: "2rem",
        large: "3rem"
    };

    const icon = weatherIcon[condition] || "❓";

    return(
        <span style = {{fontSize: sizes[size] }}> 
            {icon} 
        </span>
    )
}
export default WeatherIcon;