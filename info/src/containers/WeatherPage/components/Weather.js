import { useWeather } from "../context/WeatherContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

function Weather() {
  const {
    // cities,
    // setCities,
    selected,
    setSelected,
    weathers,
    // setWeathers,
    unit,
    setUnit,
  } = useWeather();

  const {theme, setTheme} = useTheme();
  const [selectedDay, setSelectedDay] = useState(0);

  const handleSwitch = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  function createDate(dt) {
    const newDate = new Date(dt * 1000);
    return newDate.toDateString().slice(3);
  }

  function createDay(dt, type) {
    const day = new Date(dt * 1000);
    if (type === "long") {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return day.toLocaleString("en-us", options);
    } else {
      return day.toLocaleString("en-us", { weekday: "long" });
    }
  }

  const apiKey = "d9f0c2291661f6a6df199e95cd8c39bf";

  function getCurrentLocation() {
    fetch("http://ip-api.com/json")
      .then((response) => response.json())
      .then(data => {
        setSelected({
          name: data.city,
          latitude: data.lat,
          longitude: data.lon,
        });
      });
  }

  function search() {
    let city = document.getElementById('search-text').value;
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelected({
          name: city,
          latitude: data[0].lat,
          longitude: data[0].lon,
        });
      });
  }

  function selectDay(i) {
    setSelectedDay(i);
  }

  return (
    <>
      <aside>
        <div className={`aside ${theme}`}>
          <div className="aside-container">
            <div className="aside-header">
              <input
                type="text"
                id="search-text"
                placeholder="Enter a city name"
              />
              <button className="geolocation" type="submit" onClick={getCurrentLocation}></button>
              <button className="search" type="submit" onClick={search}></button>
            </div>
            <div className="aside-main">
              <h1>{selected.name}</h1>
              <h2>
                <span>{createDate(weathers?.daily?.[selectedDay].dt)}</span>
                <span>{createDay(weathers?.daily?.[selectedDay].dt)}</span>
              </h2>
              {selectedDay === 0 ?
              (weathers?.current?.weather?.[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
                  alt='weatherIcon'
                />
              ))
              :
              (weathers?.daily?.[selectedDay].weather?.[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weathers?.daily?.[selectedDay].weather?.[0].icon}@2x.png`}
                  alt='weatherIcon'
                />
              ))}
              <span className="aside-degree">
                {Math.round(selectedDay === 0 ? weathers?.current?.temp : 
                  (weathers?.daily?.[selectedDay].temp.min + 
                   weathers?.daily?.[selectedDay].temp.max) / 2)}
                {unit === "metric" ? (
                  <span>&#8451;</span>
                ) : (
                  <span> &#8457; </span>
                )}
              </span>
              <div className="aside-main-item">
                <div>
                  Feels Like
                  <ion-icon name="thermometer-outline"></ion-icon>
                </div>
                <span>
                  {Math.round(selectedDay === 0 ? weathers?.current?.feels_like : 
                    (weathers?.daily?.[selectedDay].feels_like.day + 
                      weathers?.daily?.[selectedDay].feels_like.night) / 2)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  Day
                  <ion-icon name="sunny-outline"></ion-icon>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[selectedDay]?.temp?.day)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  Night
                  <ion-icon name="moon-outline"></ion-icon>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[selectedDay].temp?.night)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  Humidity
                  <ion-icon name="water"></ion-icon>
                </div>
                <span>{weathers?.daily?.[selectedDay]?.humidity}%</span>
              </div>
              <div className="aside-main-item">
                <div>
                  Wind
                  <ion-icon name="filter-outline"></ion-icon>
                </div>
                <span>{weathers?.daily?.[selectedDay]?.wind_speed}</span>
              </div>
            </div>
            <div className="aside-footer">
              <span
                className="mode"
                onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}
              >
                {theme === "Dark" ? (
                  <ion-icon name="sunny">haha</ion-icon>
                ) : (
                  <ion-icon name="moon">haha</ion-icon>
                )}
              </span>
              <div className="unity">
                <div>C</div>
                <div>
                  <label className="switch">
                    <input type="checkbox" onChange={handleSwitch} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div>F</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <section>
        <div className="section-container">
          {weathers?.daily?.map((dayily, i) => (
            <div key={i} className={`grid-item ${theme}`} onClick={() => selectDay(i)}
            style={{cursor:'pointer'}}>
              <div className="grid-item-header">{createDate(dayily?.dt)}</div>
              <div className="grid-item-container">
                <img
                  src={`http://openweathermap.org/img/wn/${dayily?.weather?.[0].icon}@2x.png`}
                  alt='daily'
                />
                <span>{createDay(dayily?.dt)}</span>
                <span>{dayily?.weather?.[0]?.description}</span>
              </div>
              <div className="grid-item-footer">
                <div>
                  Min: {Math.round(dayily?.temp?.min)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </div>
                <div>
                  Max: {Math.round(dayily?.temp?.max)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Weather;
