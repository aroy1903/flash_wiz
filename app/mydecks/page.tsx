"use client";

import Image from "next/image";

import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import ClientDeck from "../components/ClientDeck";

export type UserDeck = {
  deck: string;
  profileLink: string;
  user: string;
};

export function transformArray(array: string[]) {
  let ud: UserDeck = { deck: array[0], profileLink: array[1], user: array[2] };

  return ud;
}

async function getMyDeck(uid: string, email: string) {
  const ue = { uid, email };
  if (uid !== "") {
    const res = await fetch("http://127.0.0.1:5000/userdecks", {
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
}

export default function MyDecks() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<[] | UserDeck[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getMyDeck(user?.uid as string, user?.email as string).then((val) => {
        let ud: UserDeck[] = [];
        let results = val.result;
        for (const arr of results) {
          ud.push(transformArray(arr));
        }
        setData(ud);
      });
    }
  }, []);

  return (
    <div className="w-full h-[88vh]">
      <div className="w-full flex flex-wrap">
        {data ? (
          data.map((arr) => (
            <ClientDeck
              deckName={arr.deck}
              source={arr.profileLink}
              username={arr.user}
              key={arr.deck}
            />
          ))
        ) : (
          <h1 className=" w-full text-center text-black text-[50px]">
            Loading...
          </h1>
        )}
      </div>
    </div>
  );
}
