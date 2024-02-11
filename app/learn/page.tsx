"use client";

import { useContext, useEffect } from "react";
import FlashCardBox from "./components/FlashCardBox";
import { AuthContext } from "../context/AuthContext";

export type QndA = {
  question: string;
  answer: string;
};

export default function LearnBox() {
  const { user } = useContext(AuthContext);

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
