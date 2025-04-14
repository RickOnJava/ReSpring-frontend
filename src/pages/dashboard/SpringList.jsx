import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSprings } from '../../redux/springSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function SpringList() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.springs);

  useEffect(() => {
    dispatch(fetchSprings());
  }, [dispatch]);

  const navigate = useNavigate();


  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-500 font-semibold';
      case 'Low':
        return 'text-yellow-500 font-semibold'; // Choose a suitable color for 'low'
      case 'Dry':
        return 'text-red-500 font-semibold';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">🌿 Available Springs</h2>

      {loading && <p>Loading springs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((spring) => (
          <div key={spring._id} className="bg-white rounded-lg shadow-md p-4 space-y-2 border">
            <h3 className="text-xl font-bold text-blue-700">{spring.name}</h3>

            <p><strong>District: </strong> {spring.district}</p>
            <p><strong>Usage: </strong> {spring.usage}</p>
            <p><strong>Flow Rate: </strong> {spring.flowRate} L/min</p> 
            <p><strong>Status: </strong> 
            <span  className={getStatusStyle(spring.status)}>
                {spring.status}
            </span> 
            </p>
            {/* <p><strong>Water Available:</strong> {spring.waterAvailability ? '✅ Yes' : '❌ No'}</p> */}

            <p><strong>Coordinates: </strong> {spring.location.lat}, {spring.location.lng}</p>

            <p className="text-sm text-gray-500">
              <strong>Created: </strong> {moment(spring.createdAt).fromNow()}
            </p>

            <button 
            onClick={() => navigate(`/report/${spring._id}`)}
            className="mt-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              Report Issue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
