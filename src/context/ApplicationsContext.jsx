import { createContext, useReducer, useEffect } from "react";
import { job_applications } from "../api/job_applications";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [applications, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchData = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("🔐 User logged in:", user.uid);
        try {
          const data = await job_applications();
          dispatch({ type: ACTIONS.VIEW_APPLICATIONS, payload: data });
        } catch (err) {
          console.error("Error fetching job applications from firebase:", err);
        }
      } else {
        console.log("🚪 No user - clearing apps");
        dispatch({ type: ACTIONS.VIEW_APPLICATIONS, payload: [] });
      }
    });
    return () => fetchData();
  }, []);
  return (
    <ApplicationsContext.Provider value={{ applications, dispatch }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const ACTIONS = {
  VIEW_APPLICATIONS: "view_applications",
  ADD_APPLICATION: "add_application",
  UPDATE_APPLICATION: "update_application",
  DELETE_APPLICATION: "delete_application",
};

export const reducer = (applications, action) => {
  switch (action.type) {
    case ACTIONS.VIEW_APPLICATIONS:
      return action.payload;
    case ACTIONS.ADD_APPLICATION:
      return [...applications, action.payload];
    case ACTIONS.UPDATE_APPLICATION:
      return applications.map((job) =>
        job.id === action.payload.id ? action.payload : job,
      );
    case ACTIONS.DELETE_APPLICATION:
      return applications.filter((job) => job.id !== action.payload);
    default:
      return applications;
  }
};

//WORK ON THE LOGIC FOR UPDATE
