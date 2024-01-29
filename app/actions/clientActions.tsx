"use client";
import { redirect } from "next/navigation";
import signUserUp from "../firebase/firebaseActions";
import { signUserIn } from "../firebase/firebaseActions";
export async function signUp(formData: FormData) {
  const frmData = {
    email: formData.get("email"),
    pass: formData.get("pass"),
    usrname: formData.get("username"),
  };
  let result;
  let error;

  if (
    typeof frmData.email === "string" &&
    typeof frmData.pass === "string" &&
    typeof frmData.usrname === "string"
  ) {
    await signUserUp(frmData.email, frmData.pass, frmData.usrname).then((r) => {
      result = r.result;
      error = r.error;
      if (result !== null) {
        redirect("/content");
      }
    });
  }
  return error;
}

export async function loginUser(formData: FormData) {
  const frmData = {
    email: formData.get("email"),
    pass: formData.get("pass"),
  };
  let result;
  let error;

  await signUserIn(frmData.email as string, frmData.pass as string).then(
    (r) => {
      result = r.result;
      error = r.error;
      if (result !== null) {
        redirect("/content");
      }
    }
  );

  return error;
}
