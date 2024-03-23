"use client";

import { useContext, useEffect, useState } from "react";
import FlashCardBox from "../components/FlashCardBox";
import { useParams } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { ThreeDots } from "react-loader-spinner";
export type QndA = {
  question: string;
  answer: string;
};

async function getDeck(uid: string, deck: string) {
  let ue = { uid, deck };
  const res = await fetch(`http://54.219.227.201/getdeck`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ue),
  });

  return res.json();
}

function transformArray(array: string[]) {
  let ud: QndA = { question: array[1], answer: array[2] };

  return ud;
}

export default function LearnBox() {
  const { deck } = useParams<{ deck: string }>();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<null | QndA[]>(null);
  useEffect(() => {
    if (deck !== "" && user) {
      let arr: QndA[] = [];
      getDeck(user?.uid as string, deck.replace("%20", " ")).then((val) => {
        for (const qa of val) {
          arr.push(transformArray(qa));
        }
        setData(arr);
      });
    }
  }, []);

  return (
    <div className=" min-h-[88vh] bg-black flex  items-center justify-center">
      {data && <FlashCardBox cards={data} />}
      {!data && (
        <div className=" w-full h-full flex justify-center items-center">
          <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#FFFFFF"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
}
