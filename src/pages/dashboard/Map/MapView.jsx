// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSprings } from "../../../redux/springSlice";
// import { greenIcon, redIcon, yellowIcon, blueIcon } from "../../../../utils/icon";
// import { useNavigate } from "react-router-dom";

// export default function MapView({ mapCenter }) {
//   const dispatch = useDispatch();

//   const { data: springs } = useSelector((store) => store.springs);

//   const [districtFilter, setDistrictFilter] = useState("");
//   const [usageFilter, setUsageFilter] = useState("");
//   const [userLocation, setUserLocation] = useState(null);

//   console.log(mapCenter)

//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchSprings());
//   }, [dispatch]);

//   // Geolocation for “Nearby” feature
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setUserLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     });
//   }, []);

//   const filteredSprings = springs.filter((spring) => {
//     return (
//       (!districtFilter || spring.district === districtFilter) &&
//       (!usageFilter || spring.usage === usageFilter)
//     );
//   });

//   const getIconByStatus = (status) => {
//     if (status === "Active") return greenIcon;
//     if (status === "Dry") return redIcon;
//     return yellowIcon;
//   };

//   return (
//     <div className="h-[80vh]">
//       <h2 className="text-2xl font-semibold mb-2">🗺️ Spring Locations</h2>

//       {/* Filter Controls */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <select
//           className="border p-2 rounded"
//           onChange={(e) => setDistrictFilter(e.target.value)}
//           value={districtFilter}
//         >
//           <option value="">All Districts</option>
//           {[...new Set(springs.map((s) => s.district))].map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>

//         <select
//           className="border p-2 rounded"
//           onChange={(e) => setUsageFilter(e.target.value)}
//           value={usageFilter}
//         >
//           <option value="">All Usage Types</option>
//           {[...new Set(springs.map((s) => s.usage))].map((u) => (
//             <option key={u} value={u}>
//               {u}
//             </option>
//           ))}
//         </select>
//       </div>

//       <MapContainer
//         // center={mapCenter || [27.336, 88.606]}
//         center={mapCenter ? [mapCenter.a, mapCenter.b] : [27.336, 88.606]}
//         zoom={userLocation ? 11 : 8}
//         scrollWheelZoom={true}
//         className="h-full w-full rounded-lg shadow"
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Marker for user location */}
//         {userLocation && (
//           <Marker
//             position={[userLocation.lat, userLocation.lng]}
//             icon={blueIcon}
//           >
//             <Popup>You are here</Popup>
//           </Marker>
//         )}

//         {/* Spring markers */}
//         {filteredSprings.map((spring) => (
//           <Marker
//             key={spring._id}
//             position={[spring.location?.coordinates[1], spring.location?.coordinates[0]]}
//             icon={getIconByStatus(spring.status)}
//           >
//             <Popup>
//               <strong>{spring.name}</strong>
//               <br />
//               District: {spring.district}
//               <br />
//               Usage: {spring.usage}
//               <br />
//               Flow Rate: {spring.flowRate} L/min
//               <br />
//               <button
//                 onClick={() => navigate(`/report/${spring._id}`)}
//                 className="mt-2 text-sm text-blue-600 hover:underline"
//               >
//                 Report Issue
//               </button>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchSprings } from "../../../redux/springSlice";
import { greenIcon, redIcon, yellowIcon, blueIcon } from "../../../../utils/icon";
import { useNavigate } from "react-router-dom";

// Custom component to update map center
const SetMapCenter = ({ center }) => {
  
  const map = useMap();
  
  useEffect(() => {
    const defaultCenter = [27.336, 88.606];
    const newCenter = center || defaultCenter;
    
      console.log("Updating map center to:", center);
      map.setView(newCenter, map.getZoom());
    
  }, [center, map]);
  return null;
};

const MapView = ({mapCenter}) => {
  const dispatch = useDispatch();

  const {data : springs} = useSelector((state) => state.springs);

  const [districtFilter, setDistrictFilter] = useState("");
  const [usageFilter, setUsageFilter] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  // const [mapCenter, setMapCenter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSprings());
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // console.log(userLocation)

  const filteredSprings = springs.filter((spring) => {
    return (
      (!districtFilter || spring.district === districtFilter) &&
      (!usageFilter || spring.usage === usageFilter)
    );
  });

  const getIconByStatus = (status) => {
    if (status === "Active") return greenIcon;
    if (status === "Dry") return redIcon;
    return yellowIcon;
  };

  return (
    <div className="h-[80vh]">
      <h2 className="text-2xl font-semibold mb-2">🗺️ Spring Locations</h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setDistrictFilter(e.target.value)}
          value={districtFilter}
        >
          <option value="">All Districts</option>
          {[...new Set(springs.map((s) => s.district))].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setUsageFilter(e.target.value)}
          value={usageFilter}
        >
          <option value="">All Usage Types</option>
          {[...new Set(springs.map((s) => s.usage))].map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <MapContainer
        center={ mapCenter ? mapCenter : [27.336, 88.606]}
        zoom={userLocation ? 11 : 8}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg shadow"
      >
        <SetMapCenter center={mapCenter ? mapCenter : null} />

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker for user location */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={blueIcon}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Spring markers */}
        {filteredSprings.map((spring) => (
          <Marker
            key={spring._id}
            position={[spring.location?.coordinates[1], spring.location?.coordinates[0]]}
            icon={getIconByStatus(spring.status)}
          >
            <Popup>
              <strong>{spring.name}</strong>
              <br />
              District: {spring.district}
              <br />
              Usage: {spring.usage}
              <br />
              Flow Rate: {spring.flowRate} L/min
              <br />
              <button
                onClick={() => {
                  navigate(`/report/${spring._id}`);
                }}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Report Issue
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
