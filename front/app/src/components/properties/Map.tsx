import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useState } from "react";
import { Property } from "../../utils/types";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  properties: Property[];
};

const Map = ({ properties }: Props) => {
  const [x, setX] = useState(35.68156);
  const [y, setY] = useState(139.767201);
  const zoom = 10;
  return (
    <MapContainer center={[x, y]} zoom={zoom} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <>
        <Marker position={[x, y]} />;
        <Marker position={[x + 1, y]} />;
        <Marker position={[x + 2, y]} />;
      </>
    </MapContainer>
  );
};

export default Map;
