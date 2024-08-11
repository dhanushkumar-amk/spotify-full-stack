import React from 'react';import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PlayerContextProvider from './context/PlayerContext.jsx';
import LandingPage from './components/LandingPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerContextProvider>
        <App />
        {/* <LandingPage/> */}
      </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
