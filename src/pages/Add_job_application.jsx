import { useState, useReducer } from "react";
import { add_job_application } from "../api/job_applications";
import { useNavigate } from "react-router";

const Add_job_application = () => {
  const [newApplication, setNewApplication] = useState({
    company: "",
    contact_person: "",
    date_applied: "",
    salary: "",
    role: "",
    status: "applied",
    deadline: "",
    job_link: "",
    location: "onsite",
    note: "",
    created_timestamp: null,
    updated_timestamp: null,
  });

  const [errors, setErrors] = useState({
    company: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(newApplication).forEach(([name, value]) => {
      form_validation(name, value);
    });

    try {
      await add_job_application(newApplication);
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

    setNewApplication((prev) => ({
      ...prev,
      [name]: value,
      created_timestamp: Date.now(),
      updated_timestamp: Date.now(),
    }));

    form_validation(name, value);
  };

  return (
    <>
      <div>
        <p className="text-4xl">Form to add a job application</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mx-4">
          <label className="text-xl font-semibold">Company</label>

          <input
            name="company"
            type="text"
            onChange={handleChange}
            value={newApplication.company}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          {errors.name && <p className="text-red-500">{errors.company}</p>}

          <label className="text-xl font-semibold">Contact person</label>
          <input
            name="contact_person"
            type="text"
            onChange={handleChange}
            value={newApplication.contact_person}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />

          <label className="text-xl font-semibold">Role</label>
          <input
            name="role"
            type="text"
            onChange={handleChange}
            value={newApplication.role}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          {errors.name && <p className="text-red-500">{errors.role}</p>}

          <label className="text-xl font-semibold">Salary</label>
          <input
            name="salary"
            type="number"
            onChange={handleChange}
            value={newApplication.salary}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Location</label>
          <select
            name="location"
            onChange={handleChange}
            value={newApplication.location}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          >
            <option value="">Select location</option>
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <label className="text-xl font-semibold">Status</label>
          <select
            name="status"
            onChange={handleChange}
            value={newApplication.status}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          >
            <option value="">Select status</option>
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
            value={newApplication.date_applied}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Deadline</label>
          <input
            name="deadline"
            type="date"
            onChange={handleChange}
            value={newApplication.deadline}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Job link</label>
          <input
            name="job_link"
            type="text"
            onChange={handleChange}
            value={newApplication.job_link}
            className="border mb-1 p-2 rounded-lg dark:text-black max-w-md"
          />
          <label className="text-xl font-semibold">Note</label>
          <textarea
            name="note"
            onChange={handleChange}
            value={newApplication.note}
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

export default Add_job_application;
