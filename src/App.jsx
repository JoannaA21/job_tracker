import { useState } from "react";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import job_applications from "./api/job_applications";

function App() {
  return (
    <>
      <div className="text-4xl font-bold">Job Tracker App initial setup</div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
