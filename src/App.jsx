import { useState } from "react";
import "./index.css";
import job_applications from "./api/job_applications";

function App() {
  console.log(job_applications);
  return (
    <>
      <div className="text-4xl font-bold">Job Tracker App initial setup</div>
    </>
  );
}

export default App;
