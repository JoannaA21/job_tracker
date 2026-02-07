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
        <div className="flex">
          <button
            className="flex border-2 rounded-lg"
            onClick={() => navigate(-1)}
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
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            back
          </button>
          <button onClick={onOpenModal}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white hover:text-red-500"
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <p>Company: {application?.company || "Loading..."}</p>
          <p>Contact person: {application?.contact_person || "N/A"}</p>
          <p>Status: {application?.status || "N/A"}</p>
          <p>
            Deadline:
            {application?.deadline?.toDate?.()?.toLocaleDateString() || "N/A"}
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
