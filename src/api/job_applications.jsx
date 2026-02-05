import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const job_applications = async () => {
  const collectionRef = collection(db, "job_application");
  try {
    const data = await getDocs(collectionRef);

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return list;
  } catch (err) {
    console.error(err);
  }
};

export default job_applications;
