import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";
import axios from "axios";
import { server } from "@/config"; // Ensure this path is correct

// Component to add heat layer to map
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heatLayer = L.heatLayer(points, {
      radius: 35, // Increased radius
      blur: 20,   // Adjusted blur
      maxZoom: 17,
      gradient: {
        0.2: "blue",
        0.4: "lime",
        0.6: "yellow",
        0.8: "red",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
}

export default function HeatmapView({ mapCenter }) {
  const [heatPoints, setHeatPoints] = useState([]);

  useEffect(() => {
    const fetchSprings = async () => {
      try {
        const res = await axios.get(`${server}/api/v1/springs`);
        console.log("API Response:", res.data);
        const points = res.data
          .filter((s) => s.location)
          .map((s) => [
            s.location.coordinates[1], // lat
            s.location.coordinates[0], // lng
            1.5, // Increased intensity
          ]);
        console.log("Mapped Points:", points);
        setHeatPoints(points);
      } catch (err) {
        console.error("Failed to load spring data for heatmap", err);
      }
    };

    fetchSprings();
  }, []);

  return (
    <MapContainer
      center={mapCenter || [27.3361, 88.6065]} // Default center: Sikkim
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer points={heatPoints} />
    </MapContainer>
  );
}