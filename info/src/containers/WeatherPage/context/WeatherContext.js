import { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState({
    name: "Pittsburgh",
    latitude: "40.4406",
    longitude: "-79.9958",
  });
  const [weathers, setWeathers] = useState({});
  const [unit, setUnit] = useState("metric");

  const values = {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
    unit,
    setUnit,
  };

  const apiKey = "d9f0c2291661f6a6df199e95cd8c39bf";

  const citylat = selected?.initialvalues?.[0].latitude
    ? selected?.initialvalues?.[0].latitude
    : selected.latitude;

  const citylon = selected?.initialvalues?.[0].longitude
    ? selected?.initialvalues?.[0].longitude
    : selected.longitude;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${citylat}&lon=${citylon}&exclude=minutely,hourly&units=${unit}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeathers(data));
    return;
  }, [selected, unit, citylat, citylon]);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
