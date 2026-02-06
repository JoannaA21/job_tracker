import { createContext, useReducer, useEffect } from "react";
import { job_applications } from "../api/job_applications";

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [applications, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await job_applications();
        dispatch({ type: ACTIONS.VIEW_APPLICATIONS, payload: data });
      } catch (err) {
        console.error("Error fetching job applications from firebase:", err);
        throw err;
      }
    };
    fetchData();
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
  DELETE_APPLICATION: "delete_applicaion",
};

export const reducer = (applications, action) => {
  switch (action.type) {
    case ACTIONS.VIEW_APPLICATIONS:
      return action.payload;
    default:
      return applications;
  }
};
