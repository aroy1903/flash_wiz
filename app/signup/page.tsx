"use client";
import { useState } from "react";
import { signUserUp } from "../firebase/usersignup";
import { useRouter } from "next/navigation";
export default function signUpScreen() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [usrName, setUsrName] = useState("");
  const router = useRouter();
  const signUpFunction = (p: string, e: string, usr: string) => {
    let result = signUserUp(e, p, usr);
    console.log(result);
    let user = null;
    let error = null;
    result.then((val) => {
      user = val.result;
      error = val.error;
      if (user !== null) {
        router.push("/content");
      }
    });
  };

  return (
    <div className=" grow bg-sky-700 flex items-center justify-center">
      <div className=" flex flex-col">
        <h4>email</h4>
        <input
          type="text"
          className=" mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h4>password</h4>
        <input
          type="text"
          className=" mb-4"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <h4>username</h4>
        <input
          type="text"
          className=" mb-4"
          value={usrName}
          onChange={(e) => setUsrName(e.target.value)}
        />
        <button
          className=" bg-green-700 text-white"
          onClick={() => signUpFunction(pass, email, usrName)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
