import React from "react";
import { FlashCard } from "../page";

export default function AddedCard({ card }: { card: FlashCard }) {
  return (
    <div className=" w-[80%] bg-white h-40 text-black flex mb-2">
      <div className=" w-[50%] flex items-center justify-center  border-x-2 border-black border-solid">
        <h3>{card.question}</h3>
      </div>
      <div className=" w-[50%] flex items-center justify-center  border-black border-solid">
        <h3>{card.answer}</h3>
      </div>
    </div>
  );
}
