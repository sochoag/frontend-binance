import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./navbar";
import Table from "./table";
import HistogramChart from "./histogram";

function App() {
  const [histograms, setHistograms] = useState({});

  useEffect(() => {
    const socket = new WebSocket(
      "wss://binace-websocket-production.up.railway.app/"
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const coin = message.coin;

      setHistograms((prevHistograms) => ({
        ...prevHistograms,
        [coin]: message,
      }));
    };

    return () => {
      socket.close();
    };
  }, []);

  const removeHistogram = (coin) => {
    setHistograms((prevHistograms) => {
      const updatedHistograms = { ...prevHistograms };
      delete updatedHistograms[coin];
      return updatedHistograms;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <div className="table-container">
          <Table messages={Object.values(histograms)} />
          {Object.entries(histograms).map(([coin, data]) => (
            <div key={coin}>
              <h2>{coin}</h2>
              <HistogramChart
                key={coin}
                data={data}
                onRemove={() => removeHistogram(coin)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
