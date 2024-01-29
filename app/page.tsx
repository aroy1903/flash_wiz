"use client";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { activeUser } from "./context/AuthContext";
import FlashWizBG from "../assets/BlackandWhiteThemeFW.png";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const ob = useContext<activeUser>(AuthContext);

  return (
    <div className=" flex h-[88vh] ">
      <div className=" w-full bg-white">
        <Image
          src={FlashWizBG}
          alt="Picture of the author"
          className=" w-full h-[100%]"
        ></Image>
      </div>
    </div>
  );
}
