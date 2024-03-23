"use client";
import { useRouter } from "next/navigation";
import { QndA } from "../[deck]/page";
import { useState } from "react";
function FlashCardBox({ cards }: { cards: QndA[] }) {
  const [start, setStart] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();
  const incCardNumber = () => {
    setStart((prev) => (prev + 1) % cards.length);
  };
  const decCardNumber = () => {
    if (start > 0) {
      setStart((prev) => prev - 1);
    }
  };

  return (
    <div className=" h-full w-full flex justify-center items-center flex-col">
      <button
        className=" text-white self-start ml-[200px]"
        onClick={() => {
          router.back();
        }}
      >
        back
      </button>
      <div className=" bg-white w-[48%] h-[50vh] flex ">
        <button className=" w-[10%]" onClick={() => decCardNumber()}>
          {"<"}
        </button>
        <div className=" w-[80%] flex items-center justify-center">
          <div className="perspective">
            <div
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="card-face card-front">
                {cards[start].question}
              </div>
              <div className="card-face card-back">{cards[start].answer}</div>
            </div>
          </div>
        </div>
        <button
          className=" w-[10%]"
          onClick={() => {
            if (isFlipped) {
              setIsFlipped(!isFlipped);
            }
            incCardNumber();
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default FlashCardBox;
