"use client";

import { useState } from "react";
import AddedCard from "./components/flashCard";

export interface FlashCard {
  question: string;
  answer: string;
}

export default function CreatePage() {
  const [notCreating, setCreating] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [createdCards, setCreatedCards] = useState<FlashCard[] | []>([]);

  return (
    <div className=" min-h-[88vh]  bg-black  flex justify-center items-center">
      {!notCreating ? (
        <div className="flex flex-col min-h-[40vh] w-[40%] text-white  justify-between items-center py-2 rounded-lg">
          <label className="self-center px-4 mb-2 mt-1 text-2xl underline">
            Deck Name
          </label>
          <div className="flex flex-col justify-center items-center flex-grow w-full">
            <input
              type="text"
              className="w-[50%] mb-2 text-black"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
            />
            <button
              onClick={() => {
                if (deckName !== "") {
                  setCreating(true);
                }
              }}
            >
              create
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col text-white  min-h-[50vh] w-[40%] justify-around items-center ">
          <button
            className=" text-left w-full ml-3"
            onClick={() => {
              setCreating(false);
              setDeckName("");
              setCreatedCards([]);
              setQuestion("");
              setAnswer("");
            }}
          >
            back
          </button>
          <label className="text-2xl underline">{deckName}</label>

          <div className=" flex flex-col w-full">
            <div className=" flex w-full">
              <div className=" w-[50%] flex flex-col ml-4">
                <label className=" text-center">Question</label>
                <textarea
                  className=" h-32 w-[95%] p-2 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
                  placeholder="Type your question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className=" w-[50%] flex flex-col">
                <label className=" text-center">Answer</label>
                <textarea
                  className=" h-32 w-[95%] p-2 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
                  placeholder="Type your answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            </div>

            <button
              className="  my-4"
              onClick={() => {
                let card = { question, answer };
                setCreatedCards((prev) => [...prev, card]);
                setQuestion("");
                setAnswer("");
              }}
            >
              add
            </button>
          </div>
          {createdCards.map((val) => {
            return <AddedCard card={val} />;
          })}
        </div>
      )}
    </div>
  );
}
