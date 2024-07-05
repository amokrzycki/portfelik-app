import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export const addBudgetEntry = async (
  userId: string,
  entry: { date: string; amount: number; description: string },
) => {
  return await addDoc(
    collection(firestore, "budget", userId, "entries"),
    entry,
  );
};

export const getBudgetEntries = async (userId: string) => {
  return await getDocs(collection(firestore, "budget", userId, "entries"));
};
