import { useState, useEffect } from "react";

const ListView = ({ job_applications }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const listView = async () => {
      try {
        const data = await job_applications();
        setApplications(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    listView();
  }, []);

  return (
    <div>
      {applications.map((job) => (
        <div key={job.id}>
          <p>{job.id}</p>
          <p>
            {job.company} - {job.role} - {job.status} - {job.location} -{" "}
            {new Date(job.date_applied).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListView;
