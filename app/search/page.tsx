"use client";

import Deck from "@/app/components/Deck";
import { searchDecksClient } from "../actions/clientActions";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
async function getAllDecks(uid: string) {
  let ue = { uid };
  const res = await fetch("http://127.0.0.1:5000/alldecks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
    body: JSON.stringify(ue),
  });
  return res.json();
}

export default function MainPage() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   if (user) {
  //     getAllDecks(user.uid).then((val) => {
  //       setData(val);
  //       console.log(val);
  //     });
  //   }
  // }, []);

  return (
    <div className=" min-h-[88vh] flex flex-col">
      <form
        className=" h-[5vh]  w-full flex items-center justify-center mt-8"
        action={searchDecksClient}
      >
        <input
          type="text"
          className="w-[50%] border border-black border-solid h-[3.5vh] pl-2 mt"
          placeholder="search..."
          name="searchKey"
        />
        <input type="hidden" name="uid" value={user?.uid} />
        <button className="text-2xl">🔍</button>
      </form>
      <div className=" w-full"></div>
    </div>
  );
}
