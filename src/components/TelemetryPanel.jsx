import { useEffect, useState } from "react";

export default function TelemetryPanel() {

    const [cases, setCases] = useState(12);

    useEffect(() => {

        const timer = setInterval(() => {
            setCases(prev => prev + Math.floor(Math.random() * 2));
        }, 3000);

        return () => clearInterval(timer);

    }, []);

    return (
        <div className="card">

            <h2>📊 Live Telemetry</h2>

            <div className="metric">
                🚨 Critical Cases: {cases}
            </div>

            <div className="metric">
                🚑 Ambulances Available: 5
            </div>

            <div className="metric">
                🏥 Bed Occupancy: 78%
            </div>

            <div className="metric">
                💊 Medicine Stock: 84%
            </div>

        </div>
    );
}