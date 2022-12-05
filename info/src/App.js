import './App.css';
import {
  BrowserRouter,
  useRoutes,
  useNavigate,
} from 'react-router-dom';
import React, { useEffect, useState, useContext, useMemo} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './containers/HomePage/HomePage';
import WeatherPage from './containers/WeatherPage/WeatherPage';

function AppRoutes(){
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/weather", element: <WeatherPage />}
  ]);
  return routes;
}

function App(){
  
  return (
  <BrowserRouter>
      <div className='App'>
        <AppRoutes/>
      </div>
  </BrowserRouter>

  );
}

export default App;