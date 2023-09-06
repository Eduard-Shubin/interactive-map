import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "./img/home.svg";
import vzvodMap from "./img/vzvod-map.jpeg";
import "leaflet/dist/leaflet.css";

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 32],
});

function Map() {
  const bounds = [
    [0, 0],
    [4320, 7680],
  ];

  return (
    <div id="map">
      <MapContainer center={[2150, 3800]} zoom={10} scrollWheelZoom={true}>
        <ImageOverlay url={vzvodMap} bounds={bounds} />
        <Marker position={[0, 0]} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
export default Map;
