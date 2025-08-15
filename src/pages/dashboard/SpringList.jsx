import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSprings, updateSpringFromSocket } from "../../redux/springSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// export default function SpringList() {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((store) => store.springs);

//   const socket = useSocket();

//   useEffect(() => {
//     dispatch(fetchSprings());

//     if (socket) {
//       socket.on('springUpdated', (updatedSpring) => {
//         dispatch(updateSpringFromSocket(updatedSpring));
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off('springUpdated');
//       }
//     };
//   }, [dispatch, socket]);

//   const navigate = useNavigate();

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Active':
//         return 'text-green-500 font-semibold';
//       case 'Low':
//         return 'text-yellow-500 font-semibold'; // Choose a suitable color for 'low'
//       case 'Dry':
//         return 'text-red-500 font-semibold';
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">🌿 Available Springs</h2>

//       {loading && <p>Loading springs...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.map((spring) => (
//           <div key={spring._id} className="bg-white rounded-lg shadow-md p-4 space-y-2 border">
//             <h3 className="text-xl font-bold text-blue-700">{spring.name}</h3>

//             <p><strong>District: </strong> {spring.district}</p>
//             <p><strong>Usage: </strong> {spring.usage}</p>
//             <p><strong>Flow Rate: </strong> {spring.flowRate} L/min</p>
//             <p><strong>Status: </strong>
//             <span  className={getStatusStyle(spring.status)}>
//                 {spring.status}
//             </span>
//             </p>
//             {/* <p><strong>Water Available:</strong> {spring.waterAvailability ? '✅ Yes' : '❌ No'}</p> */}

//             <p><strong>Coordinates: </strong> {spring.location.lat}, {spring.location.lng}</p>

//             <p className="text-sm text-gray-500">
//               <strong>Created: </strong> {moment(spring.createdAt).fromNow()}
//             </p>

//             <button
//             onClick={() => navigate(`/report/${spring._id}`)}
//             className="mt-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
//               Report Issue
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


export default function SpringList() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.springs);
  const navigate = useNavigate();
  const [updatedIds, setUpdatedIds] = useState([]);

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_API_BASE_URL, {
        withCredentials: true, // Do this otherwise cookie will not be accessed
      }),
    []
  ); // used to connect to backend socket (useMemo used to render this one time due to change of useState)

  useEffect(() => {
    dispatch(fetchSprings());
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on('springUpdated', (spring) => {
      dispatch(updateSpringFromSocket(spring));
      setUpdatedIds((prev) => [...prev, spring._id]);
      
      setTimeout(() => {
        setUpdatedIds((prev) => prev.filter(id => id !== spring._id));
      }, 2000); // Show animation for 2 seconds
    });
  }, [socket, dispatch]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'text-green-500 font-semibold';
      case 'Low': return 'text-yellow-500 font-semibold';
      case 'Dry': return 'text-red-500 font-semibold';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">🌿 Available Springs</h2>

      {loading && <p>Loading springs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((spring) => (
          <div
            key={spring._id}
            className={`bg-white rounded-lg shadow-md p-4 border space-y-2 transition-all duration-300 ${
              updatedIds.includes(spring._id) ? 'ring-2 ring-blue-400 scale-105' : ''
            }`}
          >
            <h3 className="text-xl font-bold text-blue-700">{spring.name}</h3>
            <p><strong>District:</strong> {spring.district}</p>
            <p><strong>Usage:</strong> {spring.usage}</p>
            <p><strong>Flow Rate:</strong> {spring.flowRate} L/min</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={getStatusStyle(spring.status)}>{spring.status}</span>
            </p>
            <p><strong>Coordinates:</strong> {spring.location.coordinates[1]}, {spring.location.coordinates[0]}</p>
            <p className="text-sm text-gray-500">
              <strong>Created:</strong> {moment(spring.createdAt).fromNow()}
            </p>
            <button
              onClick={() => navigate(`/report/${spring._id}`)}
              className="mt-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Report Issue
            </button>
            {updatedIds.includes(spring._id) && (
              <p className="text-sm text-blue-500 font-semibold animate-bounce">💧 Updated!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
