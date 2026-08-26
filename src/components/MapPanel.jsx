import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";

import { villages } from "../data/villages";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapPanel({ result }) {
    // Default coordinates
    const defaultVillage = [19.076, 72.8777];

    // Village coordinates from selected village
    const villagePosition =
        result?.village
            ? villages[result.village]
            : defaultVillage;

    // Demo hospital locations
    const hospitalB = [19.086, 72.8877];
    const hospitalC = [19.096, 72.9177];

    // Demo ambulance location
    const ambulancePosition = [19.071, 72.87];

    // Default map before dispatch
    if (!result) {
        return (
            <div className="card">
                <h2>🗺️ Live Emergency Map</h2>

                <MapContainer
                    center={defaultVillage}
                    zoom={12}
                    className="leaflet-container"
                >
                    <TileLayer
                        attribution="© OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={defaultVillage}>
                        <Popup>Village A</Popup>
                    </Marker>
                </MapContainer>

                <p style={{ marginTop: "15px" }}>
                    Select an emergency type to start routing.
                </p>
            </div>
        );
    }

    const hospitalPosition =
        result.hospital?.name === "Hospital C"
            ? hospitalC
            : hospitalB;

    const routeColor =
        result.type === "cardiology"
            ? "red"
            : result.type === "trauma"
                ? "orange"
                : "blue";

    return (
        <div className="card">
            <h2>🗺️ Live Emergency Map</h2>

            <MapContainer
                center={villagePosition}
                zoom={12}
                className="leaflet-container"
            >
                <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Village Marker */}
                <Marker position={villagePosition}>
                    <Popup>
                        📍 {result.village}
                    </Popup>
                </Marker>

                {/* Ambulance Marker */}
                <Marker position={ambulancePosition}>
                    <Popup>
                        🚑 {result.ambulance?.id}
                    </Popup>
                </Marker>

                {/* Hospital Marker */}
                <Marker position={hospitalPosition}>
                    <Popup>
                        🏥 {result.hospital?.name}
                    </Popup>
                </Marker>

                {/* Route */}
                <Polyline
                    positions={[
                        villagePosition,
                        hospitalPosition,
                    ]}
                    pathOptions={{
                        color: routeColor,
                        weight: 5,
                    }}
                />
            </MapContainer>

            {/* Tracking Section */}
            <div className="tracking-box">
                <h3>📡 Live Tracking</h3>

                <p>
                    <strong>Tracking ID:</strong>{" "}
                    {result.trackingId}
                </p>

                <p>
                    <strong>Emergency:</strong>{" "}
                    {result.type}
                </p>

                <p>
                    <strong>Hospital:</strong>{" "}
                    {result.hospital?.name}
                </p>

                <p>
                    <strong>Ambulance:</strong>{" "}
                    {result.ambulance?.id}
                </p>

                <p>
                    <strong>ETA:</strong>{" "}
                    {result.eta}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    Ambulance En Route 🚑
                </p>

                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{
                            width: `${result.progress}%`,
                        }}
                    />
                </div>

                <p style={{ marginTop: "10px" }}>
                    {result.progress}% Route Completed
                </p>
            </div>
        </div>
    );
}