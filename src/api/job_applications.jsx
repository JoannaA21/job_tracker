import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

//Read collection
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

//Add to collection
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

//Update a document ***********************Check this later on!!!
export const update_job_application = async (id, job_application) => {
  const applicationDoc = doc(db, "job_application", id);
  await updateDoc(applicationDoc, job_application);
};

//Delete a document
export const delete_job_application = async (id) => {
  const applicationDoc = doc(db, "job_application", id);
  await deleteDoc(applicationDoc);
};
