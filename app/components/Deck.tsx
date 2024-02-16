"use server";
import Image from "next/image";
import naruto from "./naruto.jpg";
import clickOnDeck from "../actions/serverActions";

export default async function Deck({
  deckName,
  username,
}: {
  deckName: string;
  username: string;
}) {
  return (
    <div className=" flex flex-col text-[20px] rounded-lg bg-black w-fit  m-5 text-white">
      <Image
        src={naruto}
        alt="Naruto"
        className=" w-[300px] h[300px] rounded-lg"
        priority={true}
      ></Image>

      <form action={clickOnDeck} className=" w-[300px] text-center">
        <input
          type="text"
          name="deckName"
          hidden={true}
          readOnly
          value={[deckName, username]}
        />
        <button className=" w-full">Naruto Trivia</button>
      </form>
    </div>
  );
}
