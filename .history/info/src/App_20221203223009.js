import './App.css';
import {
  BrowserRouter,
  useRoutes,
  useNavigate,
} from 'react-router-dom';
import React, { useEffect, useState, useContext, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './containers/HomePage/HomePage';
function AppRoutes(){
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    
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