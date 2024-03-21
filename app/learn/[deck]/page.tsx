"use client";

import { useContext, useEffect } from "react";
import FlashCardBox from "../components/FlashCardBox";
import { useParams } from "next/navigation";
export type QndA = {
  question: string;
  answer: string;
};

export default function LearnBox() {
  const { deck } = useParams<{ deck: string }>();
  console.log(deck);
  const questions: QndA[] = [
    { question: "Who became hokage after Tsunade0", answer: "Naruto" },
    { question: "Who became hokage after Tsunade1", answer: "Naruto" },
    { question: "Who became hokage after Tsunade2", answer: "Naruto" },
    { question: "Who became hokage after Tsunade3", answer: "Naruto" },
  ];

  return (
    <div className=" h-[88vh] bg-black flex  items-center justify-center">
      <FlashCardBox cards={questions} />
    </div>
  );
}