
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "@/config";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

const NearbySprings = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [springs, setSprings] = useState([]);
  const [radius, setRadius] = useState(5);

  const mapRef = useRef(null);
  const { token } = useSelector((store) => store.auth);

  const fetchNearbySprings = async (lat, lng, radiusKm) => {
    try {
      const res = await axios.get(`${server}/api/v1/springs/nearby`, {
        params: { lat, lng, radius: radiusKm },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSprings(res.data);
    } catch (err) {
      console.error("Failed to fetch nearby springs", err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords;
        const location = { lat: coords.latitude, lng: coords.longitude };
        setUserLocation(location);
        fetchNearbySprings(location.lat, location.lng, radius);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, [radius]);

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Zoom fit component inside the map
  const FitBounds = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation && springs.length > 0) {
        const bounds = L.latLngBounds([
          [userLocation.lat, userLocation.lng],
          ...springs.map((s) => [s.location.coordinates[1], s.location.coordinates[0]]),
        ]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [userLocation, springs, map]);
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Nearby Springs</h2>

      <div className="mb-4">
        <label htmlFor="radius">Search Radius (km): </label>
        <input
          type="number"
          id="radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="border px-2 py-1 rounded w-20 ml-2"
        />
      </div>

      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "70vh", width: "100%" }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker position={userLocation} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>

          {springs.map((spring) => (
            <Marker
              key={spring._id}
              position={[
                spring.location.coordinates[1],
                spring.location.coordinates[0],
              ]}
              icon={customIcon}
            >
              <Popup>
                <strong>{spring.name}</strong>
                <br />
                Status: {spring.status}
                <br />
                District: {spring.district}
              </Popup>
            </Marker>
          ))}

          <FitBounds />
        </MapContainer>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default NearbySprings;
