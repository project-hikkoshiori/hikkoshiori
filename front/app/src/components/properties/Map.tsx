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
  const defaultLat = 36.68156;
  const defaultLng = 139.767201;
  const defaultZoom = 8;
  // markerつくるやつ、なぜかmapとかで処理すると反映されない
  const markers = [];
  for (var i = 0; i < properties.length; i++) {
    const pos = L.latLng([properties[i].lat, properties[i].lng]);
    markers.push(<Marker position={pos} />);
  }
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
      <>{markers}</>
    </MapContainer>
  );
};

export default Map;
