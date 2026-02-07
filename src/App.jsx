import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ApplicationsProvider } from "./context/ApplicationsContext";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import DetailView from "./pages/DetailView";
import UpdateApplication from "./pages/UpdateApplication";

function App() {
  return (
    <ApplicationsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-application" element={<AddApplication />} />
          <Route path="/detailview/:id" element={<DetailView />} />
          <Route
            path="/update-application/:id"
            element={<UpdateApplication />}
          />
        </Routes>
      </Router>
    </ApplicationsProvider>
  );
}

export default App;
