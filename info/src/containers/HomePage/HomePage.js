import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatPage from "../ChatPage/ChatPage";
import chaticon from "../HomePage/chat.png";
import axios from "axios";
import finalTrends from "../TwitterPage/components/finalTrends";

function HomePage() {
  let navigate = useNavigate();
  const [chatBot, setChatBot] = useState(false);
  function chatonclick() {
    if (chatBot) {
      setChatBot(false);
    } else {
      setChatBot(true);
    }
  }

  const [hotNews, setHotNews] = useState([]);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const getHotNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?sources=CNN&sortBy=popularity&apiKey=${apiKey}`
      )
      .then((response) => {
        setHotNews(response.data.articles);
      });
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

  function getUSTrendName(index) {
    const USTrendsSet = finalTrends["23424977"];
    return USTrendsSet[index].name;
  }
  function getUSTrendLink(index) {
    const USTrendsSet = finalTrends["23424977"];
    return USTrendsSet[index].url;
  }

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    getHotNews();
    fetch("http://ip-api.com/json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch weather!");
        setCity(data.city);
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly&units=metric&appid=d9f0c2291661f6a6df199e95cd8c39bf`
        )
          .then((response2) => response2.json())
          .then((data2) => {
            setWeatherData(data2);
          });
      });
  }, []);

  return (
    <body>
      <header>
        <h2 className="first-h2">Reliable & efficient information delivery</h2>
        <h2 className="second-h2">InfoGetter</h2>
        <h3>Made by Xiaoxuan Cui, Wangshu Li, YiHua Zhou and Youchuan Liu</h3>
      </header>
      <main>
        <div className="cards">
          <div
            className="card2 card-1"
            onClick={() => {
              navigate("../weather");
            }}
          >
            <h2 className="card-title">Weather</h2>
            <p>weather</p>
            <img src="images/icon-supervisor.svg" alt="" />
            <h1
              style={{
                color: "#f6bd60",
                textAlign: "center",
                marginTop: "-15%",
              }}
            >
              {city}
            </h1>
            <h2 style={{ marginTop: "5%", textAlign: "center" }}>
              <span style={{ color: "grey" }}>
                {createDate(weatherData?.current.dt)}
              </span>
              <span style={{ color: "grey", marginLeft: "15%" }}>
                {createDay(weatherData?.current.dt)}
              </span>
            </h2>
            <div style={{ textAlign: "center" }}>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
                alt="weatherIcon"
                style={{ marginTop: "-8%" }}
              />
            </div>
            <div
              style={{
                color: "#eba834",
                fontSize: "26px",
                textAlign: "center",
                marginTop: "-9%",
              }}
            >
              {weatherData?.current.temp}
              <span>&#8451;</span>
            </div>
          </div>
          <div className="mid-column">
            <div
              className="card2 card-2"
              onClick={() => {
                navigate("../news");
              }}
            >
              <h2 className="card-title">News</h2>
              <p>news</p>
              <h3
                style={{
                  color: "#f6bd60",
                  textAlign: "center",
                  marginTop: "5px",
                }}
              >
                {hotNews[0]?.title}
              </h3>
              <div style={{ textAlign: "center" }}>
                <img
                  src={hotNews[0]?.urlToImage}
                  alt="hotNewsImage"
                  style={{
                    width: "300px",
                    height: "200px",
                    marginTop: "-20px",
                  }}
                />
              </div>
              <img src="images/icon-team-builder.svg" alt="" />
            </div>
          </div>
          <div
            className="card2 card-4"
            onClick={() => {
              navigate("../twitter");
            }}
          >
            <h2 className="card-title">Twitter</h2>
            <p>twitter</p>
            <img src="images/icon-calculator.svg" alt="" />

            <h1
              style={{
                color: "#1da1f2",
                textAlign: "center",
                marginTop: "-10%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#1da1f2"
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
              <span> </span>
              Twitter Trends
            </h1>
            <h4
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Current trends in the U.S.
            </h4>
            <div
              style={{
                textAlign: "center",
                border: "3px solid #1da1f2",
                borderRadius: "20px",
                width: "50%",
                marginLeft: "25%",
                marginBottom: "10px",
                height: "40px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "#1da1f2",
                }}
                href={getUSTrendLink(0)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getUSTrendName(0)}
              </a>
            </div>
            <div
              style={{
                textAlign: "center",
                border: "3px solid #1da1f2",
                borderRadius: "20px",
                width: "50%",
                marginLeft: "25%",
                marginBottom: "10px",

                height: "40px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "#1da1f2",
                }}
                href={getUSTrendLink(1)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getUSTrendName(1)}
              </a>
            </div>
            <div
              style={{
                textAlign: "center",
                border: "3px solid #1da1f2",
                borderRadius: "20px",
                width: "50%",
                marginLeft: "25%",
                marginBottom: "10px",

                height: "40px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "#1da1f2",
                }}
                href={getUSTrendLink(2)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getUSTrendName(2)}
              </a>
            </div>
          </div>
        </div>
        <div onClick={chatonclick}>
          <img src={chaticon} className="chatIcon"></img>
        </div>
        {chatBot ? <ChatPage /> : <></>}
      </main>
    </body>
  );
}
export default HomePage;
