import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Map = () => {
  const x = 5;
  const y = 5;
  const zoom = 12;
  return (
    <MapContainer center={[x, y]} zoom={zoom} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[x, y]} />
    </MapContainer>
  );
};

export default Map;
