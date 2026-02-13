import { useState, useEffect, useContext } from "react";
import ListView from "../components/ListView";
import { ApplicationsContext } from "../context/ApplicationsContext";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { applications } = useContext(ApplicationsContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ✅ User is logged in - show dashboard
        setUser(currentUser);
      } else {
        // ✅ No user - redirect to login
        navigate("/login");
      }
      setLoading(false);
    });

    // Cleanup listener
    return () => unsubscribe();
  }, [navigate]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) return null; // Won't reach here due to redirect

  return (
    <div className="min-h-dvh m-6">
      {/* Header with logout */}
      <div className="p-6 border-b mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-[#64748b]">Hi, {user.email}</span>

            <button
              onClick={logout}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Add button - fixed styling */}
        <div className="mb-6 flex justify-end">
          <Link
            to="/add-application"
            className="px-6 py-3 bg-light-tangerine hover:bg-tangerine border-2 border-tangerine rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
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
