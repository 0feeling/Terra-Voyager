import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import des styles de Leaflet
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Supprimer les icônes par défaut qui peuvent causer des problèmes de chemin
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const MapComponent = ({ coordinates }) => {
  console.log("MapComponent rendu avec coordonnées :", coordinates);
  return (
    <div
      className="m-8 items-center justify-center"
      style={{ height: "600px", width: "95%" }}
    >
      <MapContainer
        center={[coordinates.lat, coordinates.lng]} // Centre sur les coordonnées passées en prop
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL du carroyage des tuiles de la carte
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <span>📍 Location</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
