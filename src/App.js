

import React, { useState, useEffect } from "react";
import DisasterRiskPlatform from "./DisasterRiskPlatform";
import LoginPage from "./LoginPage";


function App() {
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (user && user.state && user.district) {
        const apiKey = "4309082fd2594c6d8e2145454250911";
        const q = encodeURIComponent(`${user.district},${user.state},India`);
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}&aqi=yes`;
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            setWeather(data);
          } else {
            setWeather(null);
          }
        } catch {
          setWeather(null);
        }
      }
    };
    fetchWeather();
  }, [user]);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return <DisasterRiskPlatform user={user} weather={weather} />;
}

export default App;
