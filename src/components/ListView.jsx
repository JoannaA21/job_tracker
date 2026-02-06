import { useNavigate, Link } from "react-router";

const ListView = ({ applications }) => {
  const navigate = useNavigate();

  return (
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
          {applications.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-gray-100"
              onClick={() => navigate(`/detailview/${job.id}`)}
            >
              <td className="px-4 py-2 border-b">{job.company}</td>
              <td className="px-4 py-2 border-b">{job.role}</td>
              <td
                className={`
    px-4 py-2 border-b font-medium
    ${job.status === "applied" && "bg-blue-100 text-blue-800"} ${
      job.status === "interview" && "bg-yellow-100 text-yellow-800"
    } ${job.status === "rejected" && "bg-red-100 text-red-800"} ${
      job.status === "offer" && "bg-green-100 text-green-800"
    }
  `}
              >
                {job.status}
              </td>
              <td className="px-4 py-2 border-b capitalize">{job.location}</td>
              <td className="px-4 py-2 border-b">
                {job.date_applied?.toDate
                  ? job.date_applied.toDate().toLocaleDateString()
                  : job.date_applied}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
