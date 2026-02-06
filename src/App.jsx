import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ApplicationsProvider } from "./context/ApplicationsContext";
import Dashboard from "./pages/Dashboard";
import Add_job_application from "./pages/Add_job_application";
import DetailView from "./pages/DetailView";

function App() {
  return (
    <ApplicationsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add-job-application"
            element={<Add_job_application />}
          />
          <Route path="/detailview/:id" element={<DetailView />} />
        </Routes>
      </Router>
    </ApplicationsProvider>
  );
}

export default App;
