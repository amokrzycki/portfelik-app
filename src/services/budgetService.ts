import {
  addDoc,
  collection,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { Expense, NewExpense } from "../types/Expense.ts";
import { firestore } from "../firebase.ts";

export const addExpense = async (userId: string, expense: NewExpense) => {
  try {
    const docRef = await addDoc(
      collection(firestore, `users/${userId}/expenses`),
      {
        ...expense,
        date: expense.date ? expense.date : new Date(),
      },
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const fetchExpenses = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, `users/${userId}/expenses`),
    );
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Expense;
      return { ...data, id: doc.id };
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

export async function deleteExpenses(
  userId: string,
  expenseIds: Expense[],
): Promise<void> {
  const batch = writeBatch(firestore);

  expenseIds.forEach((expense) => {
    const expenseRef = doc(firestore, `users/${userId}/expenses`, expense.id);
    batch.delete(expenseRef);
  });

  await batch.commit();
}
