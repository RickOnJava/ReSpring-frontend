// import MapSidebar from "./MapSidebar";
// import MapView from "./MapView";
// import { useState } from "react";

// export default function MapDashboard() {
//   const [mapCenter, setMapCenter] = useState(null);

//   return (
//     <div className="flex flex-col md:flex-row">
//       <MapSidebar onSelect={(loc) => setMapCenter([loc.lat, loc.lng])} />
//       <div className="flex-1 h-[80vh]">
//         <MapView mapCenter={mapCenter} />
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import MapSidebar from "./MapSidebar";
import MapView from "./MapView";
import HeatmapView from "@/components/HeatMap"; // new component

// export default function MapDashboard() {
//   const [mapCenter, setMapCenter] = useState(null);
//   const [viewMode, setViewMode] = useState("markers"); // 'markers' or 'heatmap'

//   return (
//     <div className="flex flex-col md:flex-row relative">
//       {/* Sidebar */}
//       <MapSidebar onSelect={(loc) => setMapCenter([loc.lat, loc.lng])} />

//       {/* Toggle Controls */}
//       <div className="absolute top-4 right-4 z-[999] flex gap-2">
//         <button
//           onClick={() => setViewMode("markers")}
//           className={`px-3 py-1 rounded text-sm ${
//             viewMode === "markers"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Markers
//         </button>
//         <button
//           onClick={() => setViewMode("heatmap")}
//           className={`px-3 py-1 rounded text-sm ${
//             viewMode === "heatmap"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Heatmap
//         </button>
//       </div>

//       {/* Map container */}
//       <div className="flex-1 h-[80vh]">
//         {viewMode === "markers" ? (
//           <MapView mapCenter={mapCenter} />
//         ) : (
//           <HeatmapView mapCenter={mapCenter} />
//         )}
//       </div>
//     </div>
//   );
// }



export default function MapDashboard() {
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [viewMode, setViewMode] = useState("markers"); // 'markers' or 'heatmap'


  // Fetch user location once on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setUserLocation(location);
        setMapCenter([latitude, longitude]); // Optionally center map initially on user
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  return (
    <div className="flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <MapSidebar
        onSelect={(loc) => {
          setMapCenter([loc.coordinates[1], loc.coordinates[0]])
          // console.log(mapCenter)
        }}
        userLocation={userLocation}
      />

      {/* Toggle Controls */}
      <div className="absolute top-4 right-4 z-[999] flex gap-2">
        <button
          onClick={() => setViewMode("markers")}
          className={`px-3 py-1 rounded text-sm ${
            viewMode === "markers"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Markers
        </button>
        <button
          onClick={() => setViewMode("heatmap")}
          className={`px-3 py-1 rounded text-sm ${
            viewMode === "heatmap"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Heatmap
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 h-[80vh]">
        {viewMode === "markers" ? (
          <MapView mapCenter={mapCenter} />
        ) : (
          <HeatmapView mapCenter={mapCenter} />
        )}
      </div>
    </div>
  );
}
