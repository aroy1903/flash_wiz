"use client";

import { useEffect, useContext } from "react";
import { signUp } from "../actions/clientActions";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
export default function SignUpForm() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/content");
    }
  }, [user]);

  return (
    <div className=" h-[88vh] flex items-center justify-center text-white">
      <form
        action={signUp}
        className=" h-[45%] w-[25%] shadow-xl rounded-lg flex items-center justify-center bg-black"
      >
        <div className=" flex flex-col">
          <label>email:</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className=" text-black text-[15px]"
          />
          <label>pasword:</label>
          <input
            name="pass"
            type="password"
            className=" text-black text-[15px]"
          />
          <label>username:</label>
          <input
            name="username"
            type="text"
            className=" text-black text-[15px]"
          />
          <button className=" px-2 py-1 mt-4 font-bold text-black bg-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
