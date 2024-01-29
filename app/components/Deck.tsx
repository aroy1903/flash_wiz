"use server";
import Image from "next/image";
import naruto from "./naruto.jpg";
import clickOnDeck from "../actions/serverActions";

export default async function Deck() {
  return (
    <div className=" flex flex-col text-[20px] rounded-lg bg-black w-fit  m-5 text-white">
      <Image
        src={naruto}
        alt="Naruto"
        className=" w-[300px] h[300px] rounded-lg"
        priority
      ></Image>

      <form action={clickOnDeck} className=" w-[300px] text-center">
        <button className=" w-full">Naruto Trivia</button>
      </form>
    </div>
  );
}
