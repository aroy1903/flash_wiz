"use client";

import Deck from "@/app/components/Deck";
import { searchDecksClient } from "../actions/clientActions";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { transformArray, UserDeck } from "../mydecks/page";
import ClientDeck from "../components/ClientDeck";

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
  const [data, setData] = useState<[] | UserDeck[]>([]);
  useEffect(() => {
    if (user?.uid) {
      getAllDecks(user?.uid as string).then((val) => {
        let ud: UserDeck[] = [];
        let results = val;
        for (const arr of results) {
          ud.push(transformArray(arr));
        }
        setData(ud);
        console.log(val);
      });
    }
  }, []);

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
      <div className=" w-full flex flex-wrap">
        {data &&
          data.map((arr) => (
            <ClientDeck
              deckName={arr.deck}
              source={arr.profileLink}
              username={arr.user}
              key={arr.deck}
            />
          ))}
      </div>
    </div>
  );
}
