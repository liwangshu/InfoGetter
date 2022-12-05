import "./WeatherPage.css";
import Container from "./components/Container";
import { WeatherProvider } from "./context/WeatherContext";
import { ThemeProvider } from "./context/ThemeContext";

function WeatherPage() {
  return (
    <ThemeProvider className="WeatherPage">
      <WeatherProvider>
        <Container />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default WeatherPage;
