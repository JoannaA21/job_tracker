import { useNavigate, Link } from "react-router";
import { useState, useMemo, useEffect } from "react";
import Pagination from "../components/Pagination";

const useItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // default mobile

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setItemsPerPage(10); // desktop
      } else {
        setItemsPerPage(5); // mobile/tablet
      }
    };

    update(); // on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerPage;
};

const ListView = ({ applications = [] }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // 0-based for react-paginate
  const itemsPerPage = useItemsPerPage(); //dynamic per breakpoint

  //STATUS: For select attribute
  const statusOptions = [
    { value: "all", label: "Status" },
    { value: "applied", label: "Applied" },
    { value: "interview", label: "Interview" },
    { value: "rejected", label: "Rejected" },
    { value: "offer", label: "Offer" },
  ];

  //LOCATION: For select attribute
  const locationOptions = [
    { value: "all", label: "Location" },
    { value: "onsite", label: "Onsite" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ];

  //For select filter and search filter
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

  // reset page when filters/search change
  const pageCount = Math.ceil(filteredApplications.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const currentItems = filteredApplications.slice(start, start + itemsPerPage);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  // optional: if current page goes out of range after filtering
  if (currentPage > 0 && start >= filteredApplications.length) {
    setCurrentPage(0);
  }

  return (
    <div className="mb-6 bg-darkgray p-3 sm:p-4 rounded-lg border border-gray-200">
      {/* Filter Bar */}
      <div className="space-y-4">
        {/* Search - Full Width */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-tangerine"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Filter Label + Clear Button */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Filter by:
            </label>

            {(statusFilter !== "all" || locationFilter !== "all") && (
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setLocationFilter("all");
                }}
                className="text-sm bg-light-tangerine hover:bg-tangerine border-2 border-tangerine rounded-lg font-medium ml-4"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Dropdowns */}
          <div className="flex gap-4 mb-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine w-32"
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
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine w-32"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto lg:overflow-visible">
        <table className="hidden min-w-full border border-gray-200 text-left text-lg lg:table">
          <thead className="bg-gray-200">
            <tr className="text-xl">
              <th className="px-4 py-2 border-b">Company</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Date Applied</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-light-tangerine cursor-pointer"
                  onClick={() => navigate(`/detailview/${job.id}`)}
                >
                  <td className="px-4 py-2 border-b capitalize border-gray-300">
                    {job.company}
                  </td>
                  <td className="px-4 py-2 border-b capitalize border-gray-300">
                    {job.role}
                  </td>

                  <td className="px-4 py-2 border-b capitalize border-gray-300">
                    {job.location}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {job.date_applied?.toDate
                      ? job.date_applied.toDate().toLocaleDateString()
                      : job.date_applied}
                  </td>
                  <td
                    className={`
                      px-4 py-2 border-b font-medium capitalize border-gray-300
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
                </tr>
              ))
            ) : (
              /* ✅ NEW EMPTY STATE */
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  {statusFilter === "all" &&
                  locationFilter === "all" &&
                  searchTerm === ""
                    ? "Add application to get started"
                    : "No applications match your filter"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {currentItems.length > 0 ? (
          currentItems.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-md hover:bg-gray-50 cursor-pointer border-b border-gray-100 bg-white"
              onClick={() => navigate(`/detailview/${job.id}`)}
            >
              {/* Company & Role - Prominent */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {job.company}
                  </h3>
                  <p className="text-gray-600 text-sm">{job.role}</p>
                </div>
                <div className="status-badge px-2 py-1 rounded-full text-xs font-medium">
                  {/* Your existing status color classes */}
                  <span
                    className={`
                ${job.status === "applied" && "bg-blue-100 text-blue-800"} 
                ${job.status === "interview" && "bg-yellow-100 text-yellow-800"}
                ${job.status === "rejected" && "bg-red-100 text-red-800"}
                ${job.status === "offer" && "bg-green-100 text-green-800"}
              `}
                  >
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Secondary Info Stack */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {job.location}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Applied:</span>{" "}
                  {job.date_applied?.toDate
                    ? job.date_applied.toDate().toLocaleDateString()
                    : job.date_applied}
                </div>
              </div>

              {/* Action chevron */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-400">Tap for details</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
            {statusFilter === "all" &&
            locationFilter === "all" &&
            searchTerm === ""
              ? "Add application to get started"
              : "No applications match your filter"}
          </div>
        )}
      </div>
      {/* Pagination */}
      {pageCount > 1 && (
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      )}{" "}
    </div>
  );
};

export default ListView;
