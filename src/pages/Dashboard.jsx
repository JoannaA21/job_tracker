import { useState, useContext } from "react";
import ListView from "../components/ListView";
import { ApplicationsContext } from "../context/ApplicationsContext";
import { Link } from "react-router";

const Dashboard = () => {
  const { applications } = useContext(ApplicationsContext);
  return (
    <>
      <div>
        <Link to="/add-job-application" className="border-2 bg-blue-500">
          Add an Application
        </Link>
        <ListView applications={applications} />
      </div>
    </>
  );
};

export default Dashboard;
