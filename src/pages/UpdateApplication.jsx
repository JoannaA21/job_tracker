import { useState, useEffect, useContext } from "react";
import { update_job_application } from "../api/job_applications";
import { useNavigate, useParams } from "react-router";
import { ApplicationsContext, ACTIONS } from "../context/ApplicationsContext";

const UpdateApplication = () => {
  const [updatedApplication, setUpdatedApplication] = useState({
    id: "", // needed for update
    company: "",
    contact_person: "",
    role: "",
    salary: "",
    location: "onsite",
    status: "applied",
    date_applied: "",
    deadline: "",
    job_link: "",
    note: "",
    created_timestamp: null,
    updated_timestamp: null,
  });

  const [errors, setErrors] = useState({
    company: "",
    role: "",
  });

  const { applications, dispatch } = useContext(ApplicationsContext);
  const { id } = useParams();

  useEffect(() => {
    if (applications.length === 0) return; // wait until applications are loaded

    const application_to_update = applications.find((job) => job.id === id);
    if (application_to_update) setUpdatedApplication(application_to_update);
  }, [applications, id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(updatedApplication).forEach(([name, value]) => {
      form_validation(name, value);
    });

    try {
      //Update firebase
      await update_job_application(id, updatedApplication);
      // Update local state in Context via reduce
      dispatch({
        type: ACTIONS.UPDATE_APPLICATION,
        payload: updatedApplication,
      });
      navigate("/");
    } catch (err) {
      console.error("Error adding new applicaiton:", err);
    }
  };

  const form_validation = (name, value) => {
    //for required fields
    let error = "";
    if (name === "company") {
      if (!value) error = "Company name is required.";
    }
    if (name === "role") {
      if (!value) error = "Role is required.";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedApplication((prev) => ({
      ...prev,
      [name]: value,
      updated_timestamp: Date.now(),
    }));

    form_validation(name, value);
  };

  if (!updatedApplication.id) return <p>Loading...</p>;

  return (
    <>
      <div>
        <p className="text-4xl">Form to add a job application</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mx-4">
          <label className="text-xl font-semibold">Company</label>
          {errors.company && <p className="text-red-500">{errors.company}</p>}

          <input
            name="company"
            type="text"
            onChange={handleChange}
            value={updatedApplication.company}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />

          <label className="text-xl font-semibold">Contact person</label>
          <input
            name="contact_person"
            type="text"
            onChange={handleChange}
            value={updatedApplication.contact_person}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          {errors.role && <p className="text-red-500">{errors.role}</p>}

          <label className="text-xl font-semibold">Role</label>
          <input
            name="role"
            type="text"
            onChange={handleChange}
            value={updatedApplication.role}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />

          <label className="text-xl font-semibold">Salary</label>
          <input
            name="salary"
            type="number"
            onChange={handleChange}
            value={updatedApplication.salary}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Location</label>
          <select
            name="location"
            onChange={handleChange}
            value={updatedApplication.location}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          >
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <label className="text-xl font-semibold">Status</label>
          <select
            name="status"
            onChange={handleChange}
            value={updatedApplication.status}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
          </select>
          <label className="text-xl font-semibold">Date Applied</label>
          <input
            name="date_applied"
            type="date"
            onChange={handleChange}
            value={updatedApplication.date_applied}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Deadline</label>
          <input
            name="deadline"
            type="date"
            onChange={handleChange}
            value={updatedApplication.deadline}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Job link</label>
          <input
            name="job_link"
            type="text"
            onChange={handleChange}
            value={updatedApplication.job_link}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Note</label>
          <textarea
            name="note"
            onChange={handleChange}
            value={updatedApplication.note}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <button className="max-w-sm bg-blue-500 hover:bg-blue-700 text-white py-4 px-6 rounded text-center hover:-translate-y-2 duration-300 duration-300">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateApplication;
