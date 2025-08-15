// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { server } from "@/config";

// export default function FeedbackList() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [sortOrder, setSortOrder] = useState("asc");

//   const { token } = useSelector((store) => store.auth);
//   const { data: springs } = useSelector((store) => store.springs);

//   const [districtFilter, setDistrictFilter] = useState("");
  

//   useEffect(() => {
//     fetchFeedbacks();
//   }, [sortOrder]);

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await axios.get(`${server}/api/v1/reports/admin/feedbacks`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const sorted = [...res.data].sort((a, b) => {
//         const nameA = a.spring?.name?.toLowerCase() || "";
//         const nameB = b.spring?.name?.toLowerCase() || "";
//         return sortOrder === "asc"
//           ? nameA.localeCompare(nameB)
//           : nameB.localeCompare(nameA);
//       });

//       setFeedbacks(sorted);
//     } catch (err) {
//       console.error("Error fetching feedbacks", err);
//     }
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">User Feedbacks on Reports</h2>
//         {/* <select
//           className="border px-3 py-1 rounded"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">Sort by Spring Name (A-Z)</option>
//           <option value="desc">Sort by Spring Name (Z-A)</option>
//         </select> */}
//         <select
//           className="border p-2 rounded"
//           onChange={(e) => setDistrictFilter(e.target.value)}
//           value={districtFilter}
//         >
//           <option value="">All Springs</option>
//           {[...new Set(springs.map((s) => s.name))].map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>

//       </div>

//       <div className="space-y-4">
//         {feedbacks.map((report) => (
//           <div
//             key={report._id}
//             className="border p-4 rounded-md shadow-sm bg-white"
//           >
//             <p>
//               <strong>Spring:</strong> {report.spring?.name || "Unknown"}
//             </p>
//             <p>
//               <strong>Reported By:</strong> {report.createdBy?.name || "User"}
//             </p>
//             <p>
//               <strong>Status:</strong> {report.feedback?.status}
//             </p>
//             <p>
//               <strong>Comment:</strong> {report.feedback?.comment}
//             </p>
//             <p className="text-sm text-gray-500">
//               <strong>Submitted:</strong>{" "}
//               {new Date(report.feedback?.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { server } from "@/config";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [springFilter, setSpringFilter] = useState("");

  const { token } = useSelector((store) => store.auth);
  const { data: springs } = useSelector((store) => store.springs);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/reports/admin/feedbacks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks", err);
    }
  };

  const filteredFeedbacks = feedbacks.filter((report) =>
    springFilter ? report.spring?.name === springFilter : true
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">User Feedbacks on Reports</h2>
        <select
          className="border p-2 rounded"
          onChange={(e) => setSpringFilter(e.target.value)}
          value={springFilter}
        >
          <option value="">All Springs</option>
          {[...new Set(springs.map((s) => s.name))].map((springName) => (
            <option key={springName} value={springName}>
              {springName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredFeedbacks.map((report) => (
          <div
            key={report._id}
            className="border p-4 rounded-md shadow-sm bg-white"
          >
            <p>
              <strong>Spring:</strong> {report.spring?.name || "Unknown"}
            </p>
            <p>
              <strong>Reported By:</strong> {report.createdBy?.name || "User"}
            </p>
            <p>
              <strong>Status:</strong> {report.feedback?.status}
            </p>
            <p>
              <strong>Comment:</strong> {report.feedback?.comment}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Submitted:</strong>{" "}
              {new Date(report.feedback?.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}