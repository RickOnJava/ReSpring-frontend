import MapSidebar from "./MapSidebar";
import MapView from "./MapView";
import { useState } from "react";

export default function MapDashboard() {
  const [mapCenter, setMapCenter] = useState(null);

  return (
    <div className="flex flex-col md:flex-row">
      <MapSidebar onSelect={(loc) => setMapCenter([loc.lat, loc.lng])} />
      <div className="flex-1 h-[80vh]">
        <MapView mapCenter={mapCenter} />
      </div>
    </div>
  );
}
