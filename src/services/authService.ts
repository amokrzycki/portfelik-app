import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

export const signOut = () => {
  auth.signOut();
};
