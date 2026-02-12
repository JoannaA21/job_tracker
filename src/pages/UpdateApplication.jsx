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
          <p className="text-2xl flex-1 text-center">Edit application</p>
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
                <p className="text-red-500 text-sm mb-2">{errors.company}</p>
              )}

              <input
                name="company"
                type="text"
                onChange={handleChange}
                value={updatedApplication.company}
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
                value={updatedApplication.contact_person}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Role</label>
              {errors.role && <p className="text-red-500">{errors.role}</p>}

              <input
                name="role"
                type="text"
                onChange={handleChange}
                value={updatedApplication.role}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Status</label>
              <select
                name="status"
                onChange={handleChange}
                value={updatedApplication.status}
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
                value={updatedApplication.location}
                className="w-full p-4 border border-[#2d5a5a]/30 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#2d5a5a] focus:border-[#2d5a5a] text-[#1f2a44]"
              >
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Salary</label>
              <input
                name="salary"
                type="number"
                onChange={handleChange}
                value={updatedApplication.salary}
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
                  value={updatedApplication.date_applied}
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
                  value={updatedApplication.deadline}
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
                type="text"
                onChange={handleChange}
                value={updatedApplication.job_link}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Note</label>
              <textarea
                name="note"
                onChange={handleChange}
                value={updatedApplication.note}
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:border-gray-400"
              />
            </div>

            <div className="col-span-full flex justify-center mt-8">
              <button
                type="submit"
                className="w-full max-w-sm bg-gradient-to-r from-[#2d5a5a] to-[#1e4a4a] hover:from-[#1e4a4a] hover:to-[#164e4e] text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateApplication;
