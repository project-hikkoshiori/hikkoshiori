import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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
  const defaultLat = 35.68156;
  const defaultLng = 139.767201;
  const defaultZoom = 10;
  return (
    <MapContainer
      center={[defaultLat, defaultLng]}
      zoom={defaultZoom}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <>
        <Marker position={[defaultLat, defaultLng]} />;
        <Marker position={[defaultLat + 1, defaultLng]} />;
        <Marker position={[defaultLat + 2, defaultLng]} />;
      </>
    </MapContainer>
  );
};

export default Map;
