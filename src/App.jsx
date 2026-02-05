import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Add_job_application from "./pages/Add_job_application";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add-job-application"
            element={<Add_job_application />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
