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
      <div className="m-6">
        <div className="flex items-center justify-between">
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

        <h1 className="text-3xl font-bold flex-1 text-center my-6">
          {application.company}
        </h1>

        {/* Content Cards - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Details Card */}
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#2d5a5a]/10 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-[#2d5a5a]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              Role Details
            </h3>
            <dl className="space-y-4 text-[#64748b]">
              <div>
                <dt className="font-semibold">Role</dt>
                <dd className="mt-1">{application?.role || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Salary</dt>
                <dd className="mt-1">${application?.salary || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Contact person</dt>
                <dd className="mt-1">{application?.contact_person || "N/A"}</dd>
              </div>
            </dl>
          </div>

          {/* Timeline Card */}
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#2d5a5a]/10 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-[#d97706]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                />
              </svg>
              Timeline
            </h3>
            <dl className="space-y-4 text-[#64748b]">
              <div>
                <dt className="font-semibold">Applied</dt>
                <dd className="mt-1">
                  {application?.date_applied
                    ?.toDate?.()
                    ?.toLocaleDateString() || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Deadline</dt>
                <dd className="mt-1">
                  {application?.deadline?.toDate?.()?.toLocaleDateString() ||
                    "N/A"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Location</dt>
                <dd className="mt-1">{application?.location || "N/A"}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Links & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {application?.job_link && (
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#2d5a5a]/10 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#2d5a5a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 17H3a1 1 0 01-1-1V5a1 1 0 011-1h8v2a2 2 0 002 2h6v4h-6a2 2 0 00-2 2v2z" />
                </svg>
                Job Link
              </h4>
              <a
                href={application.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d5a5a] hover:text-[#1e4a4a] underline font-medium break-all"
              >
                {application.job_link}
              </a>
            </div>
          )}

          {application?.note && (
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#2d5a5a]/10 shadow-sm lg:col-span-2">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#d97706]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 4a1 1 0 00-2 0v7a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5zm7 4a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                Notes
              </h4>
              <p className="text-[#64748b] whitespace-pre-wrap">
                {application.note}
              </p>
            </div>
          )}
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
