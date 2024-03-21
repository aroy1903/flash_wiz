"use client";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebase_app from "./config";

export const auth = getAuth(firebase_app);

export default async function signUserUp(
  email: string,
  password: string,
  username: string
) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result) {
      updateProfile(auth.currentUser!, { displayName: username });
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

const signUserIn = async (email: string, password: string) => {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

const signUserOut = async () => {
  let result = null;
  let error = null;

  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export { signUserIn, signUserOut };
