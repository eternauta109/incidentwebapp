import { db } from "../config/firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  getDoc,
  onSnapshot,
  addDoc,
  doc,
  ref,
  set,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

const reportsCollectionRef = collection(db, "reports");

class ReportsServices {
  addReport = (newReport) => {
    return addDoc(reportsCollectionRef, newReport);
  };

  updateReport = (id, updateReport) => {
    const reportDoc = doc(db, "reports", id);
    return updateDoc(reportDoc, updateReport);
  };

  deleteReport = (id) => {
    const reportDoc = doc(db, "reports", id);
    return deleteDoc(reportDoc);
  };

  getAllReport = () => {
    return getDocs(reportsCollectionRef);
  };

  getReport = (id) => {
    const reportDoc = doc(db, "reports", id);
    return getDoc(reportDoc);
  };

  getCinemaReport = (cinema) => {
    const q = query(reportsCollectionRef, where("cinema", "==", cinema));
    return getDocs(q);
  };
}

export default new ReportsServices();
