// import { useSelector } from "react-redux";

// export default function MapSidebar({ onSelect }) {
//   const { data: springs } = useSelector((store) => store.springs);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Active":
//         return "text-green-500 font-semibold";
//       case "Low":
//         return "text-yellow-500 font-semibold"; // Choose a suitable color for 'low'
//       case "Dry":
//         return "text-red-500 font-semibold";
//     }
//   };

//   return (
//     <div className="w-full sm:w-1/3 lg:w-1/4 p-4 bg-white overflow-y-auto h-[80vh] border-r">
//       <h2 className="text-xl font-semibold mb-4">Spring List</h2>
//       {springs.map((spring) => (
//         <div
//           key={spring._id}
//           onClick={() => onSelect(spring.location)}
//           className="cursor-pointer mb-3 p-2 rounded hover:bg-gray-100"
//         >
//           <strong>{spring.name}</strong>
//           <br />
//           <span className="text-sm text-gray-600">
//             {spring.district} ·{" "}
//             <span className={getStatusStyle(spring.status)}>
//               {spring.status}
//             </span>{" "}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useSelector } from "react-redux";

export default function MapSidebar({ onSelect, userLocation }) {
  const { data: springs } = useSelector((store) => store.springs);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "text-green-500 font-semibold";
      case "Low":
        return "text-yellow-500 font-semibold";
      case "Dry":
        return "text-red-500 font-semibold";
      default:
        return "";
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };


  return (
    <div className="w-full sm:w-1/3 lg:w-1/4 p-4 bg-white overflow-y-auto h-[80vh] border-r">
      <h2 className="text-xl font-semibold mb-4">Spring List</h2>
      {springs.map((spring) => {
        const lat = spring.location.coordinates[1];
        const lng = spring.location.coordinates[0];
        const distance = userLocation
          ? calculateDistance(userLocation.lat, userLocation.lng, lat, lng)
          : null;

        return (
          <div
            key={spring._id}
            onClick={() => {
              onSelect(spring.location);
              //  console.log(spring.location);
            }}
            className="cursor-pointer mb-3 p-2 rounded hover:bg-gray-100"
          >
            <strong>{spring.name}</strong>
            <br />
            <span className="text-sm text-gray-600">
              {spring.district} ·{" "}
              <span className={getStatusStyle(spring.status)}>
                {spring.status}
              </span>
            </span>
            <br />
            {distance && (
              <span className="text-xs text-gray-500">
                📍 {distance} km from you
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
