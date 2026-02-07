const OnDeleteModal = ({ onCloseDeleteModal, confirmDelete }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div
          onClick={(e) =>
            e.stopPropagation()
          } /* prevents modal from closing when clicking inside */
          className="flex flex-col border rounded-lg shadow-lg p-4 md:p-6 bg-white dark:text-black w-full max-w-md"
        >
          {/* Header */}
          <div className="flex items-center mb-4">
            <button onClick={onCloseDeleteModal} className="ml-auto">
              <svg
                className="w-6 h-6 text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <p className="text-xl mb-4">
            Are you sure you want to delete this job application?
          </p>

          {/* Footer */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded self-end"
            >
              Delete
            </button>
            <button
              onClick={onCloseDeleteModal}
              className="bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded self-end"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnDeleteModal;
