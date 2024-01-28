"use client";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { activeUser } from "./context/AuthContext";
export default function Home() {
  const router = useRouter();
  const ob = useContext<activeUser | {}>(AuthContext);
  const g: activeUser = { user: "hell0" };
  useEffect(() => {
    if ("user" in ob) {
      console.log(ob.user);
    }
  }, [ob]);
  return (
    <div className="min-h-screen flex flex-col ">
      <div className=" h-[20vh] w-full bg-red-900 flex flex-row justify-around">
        <h2 className="p-10 flex items-center">Flash Wiz</h2>
        <div className="p-10 flex flex-row">
          {ob.user !== null ? (
            <h3>Logout</h3>
          ) : (
            <>
              <h3 className=" flex items-center p-5">login</h3>
              <button onClick={() => router.push("/signup")}>
                sign up
              </button>{" "}
            </>
          )}
        </div>
      </div>
      <div className=" grow bg-blue-700">
        <h1>Hello world</h1>
      </div>
    </div>
  );
}
