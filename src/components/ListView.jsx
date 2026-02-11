import { useNavigate, Link } from "react-router";
import { useState, useMemo } from "react";

const ListView = ({ applications }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = [
    { value: "all", label: "Status" },
    { value: "applied", label: "Applied" },
    { value: "interview", label: "Interview" },
    { value: "rejected", label: "Rejected" },
    { value: "offer", label: "Offer" },
  ];
  const locationOptions = [
    { value: "all", label: "Location" },
    { value: "onsite", label: "Onsite" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((job) => {
      const statusMatch = statusFilter === "all" || job.status === statusFilter;
      const locationMatch =
        locationFilter === "all" || job.location === locationFilter;

      const searchMatch =
        !searchTerm ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && locationMatch && searchMatch;
    });
  }, [applications, statusFilter, locationFilter, searchTerm]);

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <input
          type="text"
          placeholder="Search company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
        />

        <label className="text-sm font-medium text-gray-700">Filter by:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32"
        >
          {locationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {statusFilter !== "all" && locationFilter !== "all" && (
          <button
            onClick={() => setStatusFilter("all")}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-auto"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Company</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/detailview/${job.id}`)}
                >
                  <td className="px-4 py-2 border-b">{job.company}</td>
                  <td className="px-4 py-2 border-b">{job.role}</td>
                  <td
                    className={`
                      px-4 py-2 border-b font-medium
                      ${job.status === "applied" && "bg-blue-100 text-blue-800"} ${
                        job.status === "interview" &&
                        "bg-yellow-100 text-yellow-800"
                      } ${job.status === "rejected" && "bg-red-100 text-red-800"} ${
                        job.status === "offer" && "bg-green-100 text-green-800"
                      }
                    `}
                  >
                    {job.status}
                  </td>
                  <td className="px-4 py-2 border-b capitalize">
                    {job.location}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {job.date_applied?.toDate
                      ? job.date_applied.toDate().toLocaleDateString()
                      : job.date_applied}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No applications match your filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
