import { useSelector } from "react-redux";

export default function MapSidebar({ onSelect }) {
  const { data: springs } = useSelector((store) => store.springs);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "text-green-500 font-semibold";
      case "Low":
        return "text-yellow-500 font-semibold"; // Choose a suitable color for 'low'
      case "Dry":
        return "text-red-500 font-semibold";
    }
  };

  return (
    <div className="w-full sm:w-1/3 lg:w-1/4 p-4 bg-white overflow-y-auto h-[80vh] border-r">
      <h2 className="text-xl font-semibold mb-4">Spring List</h2>
      {springs.map((spring) => (
        <div
          key={spring._id}
          onClick={() => onSelect(spring.location)}
          className="cursor-pointer mb-3 p-2 rounded hover:bg-gray-100"
        >
          <strong>{spring.name}</strong>
          <br />
          <span className="text-sm text-gray-600">
            {spring.district} ·{" "}
            <span className={getStatusStyle(spring.status)}>
              {spring.status}
            </span>{" "}
          </span>
        </div>
      ))}
    </div>
  );
}
