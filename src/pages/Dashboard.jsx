import ListView from "../components/ListView";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button
          className="border-2 bg-blue-500"
          onClick={() => navigate("/add-job-application")}
          to="/add-job-application"
        >
          Add an Application
        </button>
        <ListView />
      </div>
    </>
  );
};

export default Dashboard;
