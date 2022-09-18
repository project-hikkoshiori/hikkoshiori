import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Property, PropertyWithBookMark } from "../../utils/types";
import { BookmarkWindow } from "./BookmarkWindow";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  properties: (Property &
    Partial<Pick<PropertyWithBookMark, "is_bookmarked">>)[];
};

const Map = ({ properties }: Props) => {
  const defaultLat = 36.68156;
  const defaultLng = 139.767201;
  const defaultZoom = 8;
  // markerつくるやつ、なぜかmapとかで処理すると反映されない
  // TODO: 常にPopupを出す
  const markers = [];
  for (var i = 0; i < properties.length; i++) {
    const pos = L.latLng([
      properties[i].additional_info.coordinates[1],
      properties[i].additional_info.coordinates[0],
    ]);
    markers.push(
      <Marker position={pos}>
        <Popup>
          <BookmarkWindow property={properties[i]} />
        </Popup>
      </Marker>
    );
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
