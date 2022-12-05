import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatPage from "../ChatPage/ChatPage";
import chaticon from "../HomePage/chat.png";
function HomePage() {
  let navigate = useNavigate();
  const [chatBot, setChatBot] = useState(false);
  function chatonclick(){
    setChatBot(true);
  }
  // var chatBot=false;
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

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  // useEffect(() => {
  //   fetch("http://ip-api.com/json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("xxx");
  //       setCity(data.city);
  //       fetch(
  //         `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lat}&exclude=minutely,hourly&units=metric&appid=4327f11f6458df3e888e99c6b054069c`
  //       )
  //         .then((response2) => response2.json())
  //         .then((data2) => {
  //           setWeatherData(data2);
  //         });
  //     });
  // }, [city, weatherData]);

  return (
      <body>
        <header>
          <h2 className="first-h2">
            Reliable & efficient information delivery
          </h2>
          <h2 className="second-h2">InfoGetter</h2>
          <h3>Made by Xiaoxuan Cui, Wangshu Li, YiHua Zhou and Youchuan Liu</h3>
        </header>
        <main>
          <div className="cards">
            <div className="card2 card-1" onClick={() => {
                            navigate('../weather');
                        }}>
              <h2 className="card-title">Weather</h2>
              {/* <p>weather</p> */}
              {/* <img src="images/icon-supervisor.svg" alt="" /> */}
              <h1
                style={{
                  color: "#f6bd60",
                  marginLeft: "25%",
                  marginTop: "-8%",
                }}
              >
                {city}
              </h1>
              <h2 style={{ marginTop: "5%" }}>
                <span style={{ color: "grey", marginLeft: "10%" }}>
                  {createDate(weatherData?.current.dt)}
                </span>
                <span style={{ color: "grey", marginLeft: "15%" }}>
                  {createDay(weatherData?.current.dt)}
                </span>
              </h2>
              {
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
                  alt="weatherIcon"
                  style={{ marginRight: "35%", marginTop: "-8%" }}
                />
              }
              <div
                style={{
                  color: "#eba834",
                  fontSize: "26px",
                  marginLeft: "34%",
                  marginTop: "-9%",
                }}
              >
                {weatherData?.current.temp}
                <span>&#8451;</span>
              </div>
            </div>
            <div className="mid-column">
              <div className="card2 card-2" onClick={() => {
                            navigate('../news');
                        }}>
                <h2 className="card-title">News</h2>
                <p>news</p>
                <img src="images/icon-team-builder.svg" alt="" />
              </div>
            </div>
            <div className="card2 card-4" onClick={() => {
                            navigate('../twitter');
                        }}>
              <h2 className="card-title">Twitter</h2>
              <p>twitter</p>
              <img src="images/icon-calculator.svg" alt="" />
            </div>
          </div>
          <div onClick={chatonclick}>
          <img src={chaticon} className="chatIcon"></img></div>
          { chatBot?
            <ChatPage/>: 
            <></>}
        </main>
      </body>
  );
}
export default HomePage;
