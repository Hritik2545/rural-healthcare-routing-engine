import { useState } from "react";
import "./App.css";

import EmergencyForm from "./components/EmergencyForm";
import TelemetryPanel from "./components/TelemetryPanel";
import MapPanel from "./components/MapPanel";
import DecisionLog from "./components/DecisionLog";

import { dispatchEmergency } from "./algorithms/dispatchEngine";

function App() {
  const [result, setResult] = useState(null);

  const [selectedType, setSelectedType] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  function handleEmergency(type, village) {
    if (!type || !village) {
      alert("Please select Emergency Type and Village");
      return;
    }

    const response = dispatchEmergency(type, village);
    setResult(response);
  }

  return (
    <div className="app">

      <div className="header">
        <h1>🚑 Rural Healthcare Routing Engine</h1>

        <p>
          Intelligent Ambulance Dispatch, Hospital Routing
          & Medicine Allocation System
        </p>
      </div>

      <div className="top-bar">
        <div className="card">
          🚨 Active Requests: 12
        </div>

        <div className="card">
          🚑 Fleet Ready: 5
        </div>

        <div className="card">
          🏥 Hospitals Online: 2
        </div>
      </div>

      <EmergencyForm
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedVillage={selectedVillage}
        setSelectedVillage={setSelectedVillage}
        onDispatch={handleEmergency}
      />

      <div className="container">

        <TelemetryPanel />

        <MapPanel result={result} />

        <DecisionLog result={result} />

      </div>

    </div>
  );
}

export default App;