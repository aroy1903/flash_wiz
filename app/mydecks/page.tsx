"use client";

import Image from "next/image";

import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import ClientDeck from "../components/ClientDeck";
import { ThreeDots } from "react-loader-spinner";

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
    const res = await fetch("http://54.219.227.201/userdecks", {
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
  const [data, setData] = useState<null | UserDeck[]>(null);

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
    <div className="w-full min-h-[88vh] flex">
      <div className="w-full flex flex-wrap grow">
        {data &&
          data.map((arr) => (
            <ClientDeck
              deckName={arr.deck}
              source={arr.profileLink}
              username={arr.user}
              key={arr.deck}
            />
          ))}
        {!data && (
          <div className=" w-full h-full flex justify-center items-center">
            <ThreeDots
              visible={true}
              height="100"
              width="100"
              color="#111111"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
