import { useState, useContext } from "react";
import { add_job_application } from "../api/job_applications";
import { useNavigate } from "react-router";
import { ApplicationsContext, ACTIONS } from "../context/ApplicationsContext";

const AddApplication = () => {
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

  const { dispatch } = useContext(ApplicationsContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(newApplication).forEach(([name, value]) => {
      form_validation(name, value);
    });

    try {
      const newData = await add_job_application(newApplication);
      dispatch({ type: ACTIONS.ADD_APPLICATION, payload: newData });
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
      created_timestamp: prev.created_timestamp || Date.now(),
      updated_timestamp: Date.now(),
    }));

    form_validation(name, value);
  };

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>
          <p className="text-2xl flex-1 text-center">Add application</p>
          <div className="w-6"></div> {/* Spacer for symmetry */}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 p-6"
        >
          {/* Column 1 */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">
                Company
              </label>
              {errors.company && (
                <p className="text-[#dc2626] text-sm mb-2">{errors.company}</p>
              )}
              <input
                name="company"
                type="text"
                onChange={handleChange}
                value={newApplication.company}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Contact person
              </label>
              <input
                name="contact_person"
                type="text"
                onChange={handleChange}
                value={newApplication.contact_person}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Role</label>
              {errors.role && (
                <p className="text-[#dc2626] text-sm mb-2">{errors.role}</p>
              )}
              <input
                name="role"
                type="text"
                onChange={handleChange}
                value={newApplication.role}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Status</label>
              <select
                name="status"
                onChange={handleChange}
                value={newApplication.status}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Location
              </label>
              <select
                name="location"
                onChange={handleChange}
                value={newApplication.location}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              >
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Salary</label>
              <input
                name="salary"
                type="number"
                onChange={handleChange}
                value={newApplication.salary}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Date Applied
                </label>
                <input
                  name="date_applied"
                  type="date"
                  onChange={handleChange}
                  value={newApplication.date_applied}
                  className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Deadline
                </label>
                <input
                  name="deadline"
                  type="date"
                  onChange={handleChange}
                  value={newApplication.deadline}
                  className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Job link
              </label>
              <input
                name="job_link"
                type="url"
                onChange={handleChange}
                value={newApplication.job_link}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Note</label>
              <textarea
                name="note"
                onChange={handleChange}
                value={newApplication.note}
                rows={6}
                className="w-full p-4 border border-[#2d5a5a]/30 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#2d5a5a] focus:border-[#2d5a5a] text-[#1f2a44] resize-vertical"
              />
            </div>
          </div>

          {/* Submit Button - Full Width Bottom */}
          <div className="col-span-full flex justify-center mt-8">
            <button
              type="submit"
              className="w-full max-w-sm bg-gradient-to-r from-[#2d5a5a] to-[#1e4a4a] hover:from-[#1e4a4a] hover:to-[#164e4e] text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddApplication;
