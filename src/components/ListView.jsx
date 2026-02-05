import { useState, useEffect } from "react";
import job_applications from "../api/job_applications";

const ListView = () => {
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
            {String(job.date_applied)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListView;
