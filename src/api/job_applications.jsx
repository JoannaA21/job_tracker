import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

//Read collection
export const job_applications = async () => {
  //Check auth + filter by user
  if (!auth.currentUser) {
    console.log("No user - returning empty");
    return [];
  }

  const collectionRef = query(
    collection(db, "job_application"),
    where("userId", "==", auth.currentUser.uid),
  );
  try {
    const data = await getDocs(collectionRef);

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return list;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

//Add to collection
export const add_job_application = async (applicationData) => {
  //Frontend MUST add userId
  const dataWithUser = {
    ...applicationData,
    userId: auth.currentUser.uid,
    created_timestamp: Date.now(),
    updated_timestamp: Date.now(),
  };

  try {
    const data = await addDoc(collection(db, "job_application"), dataWithUser);
    console.log("Document written with ID: ", data.id);
    return { id: data.id, ...dataWithUser };
  } catch (err) {
    console.error("Error in adding new job application", err);
    throw err;
  }
};

//Update a document ***********************Check this later on!!!
export const update_job_application = async (id, job_application) => {
  const applicationDoc = doc(db, "job_application", id);
  await updateDoc(applicationDoc, job_application);
  return { id, ...job_application };
};

//Delete a document
export const delete_job_application = async (id) => {
  const applicationDoc = doc(db, "job_application", id);
  await deleteDoc(applicationDoc);
};
