import { useState, useReducer } from "react";
import ListView from "../components/ListView";
import { Link } from "react-router";
import { job_applications, add_job_application } from "../api/job_applications";

const Dashboard = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div>
        <Link to="/add-job-application" className="border-2 bg-blue-500">
          Add an Application
        </Link>

        <ListView job_applications={job_applications} />
      </div>
    </>
  );
};

export default Dashboard;
