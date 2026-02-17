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
        // User is logged in - show dashboard
        setUser(currentUser);
      } else {
        // No user - redirect to login
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
    <div className="min-h-dvh p-3 sm:p-4 md:p-6 md:m-6 w-full overflow-x-hidden">
      {/* Header - PERFECT BOTH VIEWS */}
      <div className="p-3 sm:p-4 border-b mb-4 sm:mb-6 w-full">
        <div className="w-full">
          {/* MOBILE: Dashboard + Logout same line, email below */}
          <div className="flex items-center justify-between mb-2 lg:mb-0">
            <h1 className="text-2xl lg:text-3xl font-bold flex-1">Dashboard</h1>
            <button
              onClick={logout}
              className="px-3 py-1.5 lg:px-4 lg:py-2 text-lg lg:text-base text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
            >
              Logout
            </button>
          </div>

          {/* Email - below on mobile, inline on desktop */}
          <div className="flex lg:hidden items-center lg:items-center">
            <span className="text-gray-500 text-sm">Hi, {user.email}</span>
          </div>

          {/* Desktop: Email inline with title + logout */}
          <div className="hidden lg:flex items-center gap-4 mt-2 lg:mt-0">
            <span className="text-gray-500 text-lg">Hi, {user.email}</span>
          </div>
        </div>
      </div>

      <div className="w-full">
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
