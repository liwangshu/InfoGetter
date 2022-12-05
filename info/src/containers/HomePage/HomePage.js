import React from 'react';
// import { Container, Row, Col} from 'reactstrap';
import './HomePage.css';
// import {useLocation} from 'react-router-dom';
import { useState, useEffect } from "react";

function HomePage() {
    // let location = useLocation();
    // if(location.pathname!='/')return <></>;
    
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

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        fetch("http://ip-api.com/json")
        .then((response) => response.json())
        .then(data => {
            setCity(data.city);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lat}&exclude=minutely,hourly&units=metric&appid=4327f11f6458df3e888e99c6b054069c`)
            .then((response2) => response2.json())
            .then((data2) => {
                setWeatherData(data2);
            });  
        })}, []);

    return (
        <div>
        <body>
        <header>
        <h2 className='first-h2'>Reliable & efficient information delivery</h2>
        <h2 className='second-h2'>InfoGetter</h2>
        <h3>
            Made by Xiaoxuan Cui, Wangshu Li, YiHua Zhou and Youchuan Liu
        </h3>
        </header>
        <main>
        <div className="cards">
            <div className="card card-1">
            <h2 className="card-title">Weather</h2>
            <p>weather</p>
            <img src="images/icon-supervisor.svg" alt="" />
            <h1 style={{color: '#f6bd60', marginLeft: '25%', marginTop: '-8%'}}>{city}</h1>
              <h2 style={{marginTop: '5%'}}>
                <span style={{color: 'grey', marginLeft: '10%'}}>
                    {createDate(weatherData?.current.dt)}
                </span>
                <span style={{color: 'grey', marginLeft: '15%'}}>
                    {createDay(weatherData?.current.dt)}
                </span>
              </h2>
              {<img
                src={`http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
                alt='weatherIcon'
                style={{marginRight: '35%', marginTop: '-8%'}}
                />
              }
              <div style={{color: '#eba834', fontSize: '26px', marginLeft: '34%', marginTop: '-9%'}}>
                {weatherData?.current.temp}
                <span>&#8451;</span>
              </div>
            </div>
            <div className="mid-column">
            <div className="card card-2">
                <h2 className="card-title">News</h2>
                <p>
                news
                </p>
                <img src="images/icon-team-builder.svg" alt="" />
            </div>
            {/* <div className="card card-3">
                <h2 className="card-title">Twitter</h2>
                <p>Regularly evaluates our talent to ensure quality</p>
                <img src="images/icon-karma.svg" alt="" />
            </div> */}
            </div>
            <div className="card card-4">
            <h2 className="card-title">Twitter</h2>
            <p>
                twitter
            </p>
            <img src="images/icon-calculator.svg" alt="" />
            </div>
        </div>
        </main>
        </body>
    </div>
    );
};
export default HomePage;