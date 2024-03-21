"use client";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUserOut } from "../firebase/firebaseActions";

export default function Header() {
  const router = useRouter();

  const ob = useContext(AuthContext);

  return (
    <div className=" h-[12vh] w-full  bg-black flex flex-row justify-around text-white">
      <h2
        className="p-10 flex items-center  text-[30px] hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        FlashWiz
      </h2>
      <div className="p-10 flex flex-row w-[30%] items-center justify-between">
        {ob.user !== null ? (
          <div className=" flex  justify-between w-[70%]">
            <h3
              onClick={() => {
                signUserOut();
                router.push("/");
              }}
              className=" hover:cursor-pointer hover:underline"
            >
              logout
            </h3>
            <h3
              onClick={() => {
                router.push("/mydecks");
              }}
              className=" hover:cursor-pointer hover:underline"
            >
              my decks
            </h3>
            <h3
              onClick={() => {
                router.push("/create");
              }}
              className=" hover:cursor-pointer hover:underline"
            >
              create deck
            </h3>
            <h3
              onClick={() => {
                router.push("/search");
              }}
              className=" hover:cursor-pointer hover:underline"
            >
              all decks
            </h3>
          </div>
        ) : (
          <div className=" w-[50%] flex justify-around text-[17px]">
            <button
              onClick={() => router.push("/login")}
              className=" hover:underline"
            >
              login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className=" hover:underline"
            >
              sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
