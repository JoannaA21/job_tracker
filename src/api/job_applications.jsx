import { db } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

export const job_applications = async () => {
  const collectionRef = collection(db, "job_application");
  try {
    const data = await getDocs(collectionRef);

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return list;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const add_job_application = async (applicationData) => {
  const collectionRef = collection(db, "job_application");

  try {
    const data = await addDoc(collectionRef, applicationData);
    console.log("Document written with ID: ", data.id);
    return data.id;
  } catch (err) {
    console.error("Error in adding new job application", err);
  }
};
