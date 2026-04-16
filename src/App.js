import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Forecast from './pages/forecast';
import Map from './pages/map';
import Settings from './pages/settings';

function App() {
  return (
   
    <div>
      {/* NAVIGATION */}
      <nav>
        <div>
          <h1>Weather App</h1>
        </div>

        <div>
          <Link to="/forecast">Forecast</Link>
          <Link to="/map">Map</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
      
      {/* PAGE CONTENT */}
      <Routes>
        <Route path="/" element={<Navigate to="/forecast" replace />} />

        <Route path="/forecast" element={<Forecast />} />
        <Route path="/map" element={<Map />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
