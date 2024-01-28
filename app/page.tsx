"use client";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { activeUser } from "./context/AuthContext";
export default function Home() {
  const router = useRouter();
  const ob = useContext<activeUser>(AuthContext);
  useEffect(() => {
    if ("user" in ob) {
      console.log(ob.user);
    }
  }, [ob]);
  return (
    <div className=" flex grow ">
      <div className="  bg-blue-700">
        <h1>Hello world</h1>
      </div>
    </div>
  );
}
