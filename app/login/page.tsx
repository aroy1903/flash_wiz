"use client";
import { useRouter } from "next/navigation";
import { loginUser } from "../actions/clientActions";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useContext, useState } from "react";

export default function LoginForm() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [buttonDisable, setButtonDisable] = useState(false);
  useEffect(() => {
    if (user) {
      router.push("/search");
    }
  }, [user]);

  return (
    <div className=" h-[88vh] flex items-center justify-center text-white">
      <form
        action={loginUser}
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
          <button
            className=" px-2 py-1 mt-4 font-bold text-black bg-white rounded"
            disabled={buttonDisable}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
