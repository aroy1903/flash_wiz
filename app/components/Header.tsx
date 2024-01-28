"use client";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const ob = useContext(AuthContext);

  return (
    <div className=" h-[12vh] w-full bg-red-900 flex flex-row justify-around">
      <h2 className="p-10 flex items-center">Flash Wiz</h2>
      <div className="p-10 flex flex-row w-[30%] items-center justify-center">
        {ob.user !== null ? (
          <h3>Logout</h3>
        ) : (
          <div className=" w-[25%] flex justify-between">
            <button onClick={() => router.push("/login")}>login</button>
            <button onClick={() => router.push("/signup")}>sign up</button>
          </div>
        )}
      </div>
    </div>
  );
}
