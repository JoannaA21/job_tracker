import { useContext } from "react";
import { ApplicationsContext } from "../context/ApplicationsContext";
import { useParams } from "react-router";

const DetailView = () => {
  const { id } = useParams();
  const { applications } = useContext(ApplicationsContext);

  const application = applications.find((job) => job.id === id);

  console.log(application);
  if (!application) return <div>"Job not found"</div>;

  return (
    <>
      <div>
        {application.company}
        {application.contact_person}
        {application.status}
        {application.deadline}
        {application.job_link}
        {application.role}
        {application.salary}
        {application.created_timestamp}
      </div>
    </>
  );
};

export default DetailView;
