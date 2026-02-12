import { useState, useContext } from "react";
import ListView from "../components/ListView";
import { ApplicationsContext } from "../context/ApplicationsContext";
import { Link } from "react-router";

const Dashboard = () => {
  const { applications } = useContext(ApplicationsContext);

  return (
    <div className="min-h-dvh w-full p-4 sm:p-6 lg:p-8 ">
      {" "}
      {/* Light bg, proper padding */}
      <div className="max-w-7xl mx-auto">
        {/* Add button - fixed styling */}
        <div className="mb-6 flex justify-end">
          <Link
            to="/add-application"
            className="px-6 py-3  bg-light-tangerine hover:bg-tangerine border-2 border-tangerine rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            Add Application
          </Link>
        </div>
        <ListView applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
