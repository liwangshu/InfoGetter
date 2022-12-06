import "./App.css";
import { BrowserRouter, useRoutes, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useMemo } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./containers/HomePage/HomePage";
import WeatherPage from "./containers/WeatherPage/WeatherPage";
import TwitterPage from "./containers/TwitterPage/TwitterPage";
import NewsPage from "./containers/NewsPage/NewsPage";
import ChatPage from "./containers/ChatPage/ChatPage";
import NavBar from "./containers/NavBar/NavBar";

function AppRoutes() {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/weather", element: <WeatherPage /> },
    { path: "/news", element: <NewsPage /> },
    { path: "/twitter", element: <TwitterPage /> },
    { path: "/chat", element: <ChatPage /> },
  ]);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
