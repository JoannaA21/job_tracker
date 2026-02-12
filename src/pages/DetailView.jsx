import { useState, useEffect, useContext } from "react";
import { ApplicationsContext, ACTIONS } from "../context/ApplicationsContext";
import { useParams, useNavigate } from "react-router";
import { delete_job_application } from "../api/job_applications";
import OnDeleteModal from "../components/OnDeleteModal";

const DetailView = () => {
  const [onOpenDeleteModal, setOnOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const { applications, dispatch } = useContext(ApplicationsContext);
  const navigate = useNavigate();

  //prevent background scrolling when modal is open
  useEffect(() => {
    if (onOpenDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup (important!)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [onOpenDeleteModal]);

  const application = applications.find((job) => job.id === id);
  if (!application && !isDeleting) return <div>"Job not found"</div>;

  const confirmDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true); // Prevent early return

    try {
      await delete_job_application(id);
      dispatch({ type: ACTIONS.DELETE_APPLICATION, payload: id });
      navigate("/");
    } catch (err) {
      console.error("Error deleting job application:", err);
      setIsDeleting(false);
    }
  };

  const onOpenModal = () => {
    setOnOpenDeleteModal(true);
  };

  const onCloseModal = () => {
    setOnOpenDeleteModal(false);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between px-4 py-4">
          {/* Back SVG - Left */}
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

          {/* Edit & Delete - Right */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/update-application/${id}`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
            >
              Edit
            </button>

            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg font-medium transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#1f2a44] flex-1 text-center">
          {application.company}
        </h1>

        <div className="flex flex-col space-y-2">
          <p>Company: {application?.company || "Loading..."}</p>
          <p>Contact person: {application?.contact_person || "N/A"}</p>
          <p>Status: {application?.status || "N/A"}</p>
          <p>
            Deadline:
            {application?.deadline?.toDate?.()?.toLocaleDateString() || "N/A"}
          </p>
          <p>
            Date Applied:
            {application?.date_applied?.toDate?.()?.toLocaleDateString() ||
              "N/A"}
          </p>
          <p>Job link: {application?.job_link || "N/A"}</p>
          <p>Role: {application?.role || "Loading..."}</p>
          <p>Salary: {application?.salary || "N/A"}</p>
        </div>
      </div>

      {onOpenDeleteModal && (
        <OnDeleteModal
          onCloseDeleteModal={onCloseModal}
          confirmDelete={confirmDelete}
        />
      )}
    </>
  );
};

export default DetailView;
